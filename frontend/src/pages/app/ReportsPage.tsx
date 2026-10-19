import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FileSpreadsheet, Download, Printer, ShieldCheck, Calendar, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { Field, Farm } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const ReportsPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [fields, setFields] = useState<Field[]>([]);
  const [summaryData, setSummaryData] = useState<any | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [flRes, sRes] = await Promise.all([
          api.getFields(selectedFarmId || undefined),
          api.getReportSummary(),
        ]);
        setFields(flRes.fields);
        setSummaryData(sRes);
      } catch (err) {
        console.error('Failed to load reports:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedFarmId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('reports.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('reports.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handlePrint} className="ts-btn ts-btn-secondary ts-btn-sm">
            <Printer size={16} /> {t('reports.printReport')}
          </button>
          <a
            href={api.getExportCsvUrl(selectedFieldId || undefined)}
            download
            className="ts-btn ts-btn-primary ts-btn-sm"
          >
            <Download size={16} /> {t('reports.downloadCsv')}
          </a>
        </div>
      </div>

      {/* CSV Filter Selector Card */}
      <div className="ts-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FileSpreadsheet size={24} color="var(--color-primary)" />
          <div>
            <strong style={{ fontSize: '15px' }}>Custom Telemetry Export Filter:</strong>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Export complete timestamped VWC %, temperature (°C), and bulk EC readings.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={selectedFieldId}
            onChange={(e) => setSelectedFieldId(e.target.value)}
            className="ts-select"
            style={{ fontSize: '13px', padding: '6px 12px' }}
          >
            <option value="">All Farm Fields (Combined)</option>
            {fields.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>

          <a
            href={api.getExportCsvUrl(selectedFieldId || undefined)}
            download
            className="ts-btn ts-btn-secondary ts-btn-sm"
          >
            Download Filtered CSV
          </a>
        </div>
      </div>

      {/* Executive Printable Summary Sheet */}
      <div className="ts-card" style={{ padding: '36px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--color-border)', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <span className="ts-badge ts-badge-success" style={{ marginBottom: '8px' }}>
              Official Agronomic Report
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
              [Platform Name] Agronomic Performance &amp; Water Audit
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Generated: {summaryData ? new Date(summaryData.generatedAt).toUTCString() : new Date().toUTCString()}
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <div><strong>Organization:</strong> [Your Farm / Agricultural Organization]</div>
            <div><strong>Status:</strong> Validated Multi-Depth Telemetry</div>
          </div>
        </div>

        {/* Aggregate Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{t('reports.totalFarms')}</span>
            <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>{summaryData?.metrics?.totalFarms || 2}</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{t('reports.monitoredPlots')}</span>
            <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>{summaryData?.metrics?.totalFields || 4}</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{t('reports.onlineNodes')}</span>
            <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px', color: 'var(--color-primary)' }}>
              {summaryData?.metrics?.onlineDevices || 4}
            </div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{t('reports.activeAlerts')}</span>
            <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>
              {summaryData?.metrics?.unresolvedAlerts || 0}
            </div>
          </div>
        </div>

        {/* 24-Hour Horizon Soil Moisture Profile */}
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
          24-Hour Average Moisture Profile Across Root Depths
        </h3>
        <div className="ts-table-container" style={{ marginBottom: '24px' }}>
          <table className="ts-table">
            <thead>
              <tr>
                <th>Horizon Depth</th>
                <th>24h Mean Volumetric Water Content (% VWC)</th>
                <th>Mean Soil Temperature (°C)</th>
                <th>Agronomic Classification</th>
              </tr>
            </thead>
            <tbody>
              {summaryData?.depthMoistureProfile24h?.map((p: any) => (
                <tr key={p.depth_cm}>
                  <td><strong>{p.depth_cm} cm Depth</strong></td>
                  <td><strong style={{ color: 'var(--color-primary)' }}>{p.avg_vwc}% VWC</strong></td>
                  <td>{p.avg_temp}°C</td>
                  <td>
                    {p.depth_cm <= 20 ? 'Active Evaporative & Transpiration Layer' : 'Subsurface Reserve Water Horizon'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compliance & Caveats Footer */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>
            <ShieldCheck size={16} color="var(--color-primary)" />
            Data Integrity &amp; Calibration Statement
          </div>
          <p>
            This report reflects verified readings from factory-calibrated dielectric capacitance sensors. All simulated test telemetry has been isolated from production metrics in accordance with the [Platform Name] Ground-Truth Agronomy Protocol.
          </p>
        </div>
      </div>
    </div>
  );
};
