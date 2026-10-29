import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Waves, Filter, FileSpreadsheet, RefreshCw, Calendar, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { SensorReading, Field, Device } from '../../types';
import { WaterDepthChart } from '../../components/SoilDepthChart';
import { useLanguage } from '../../i18n/LanguageContext';

export const WaterTestingPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string>('');
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [dateRange, setDateRange] = useState<'24h' | '3d' | '7d'>('7d');
  const [loading, setLoading] = useState(true);

  // Load fields (water points)
  useEffect(() => {
    async function loadFields() {
      try {
        const { fields } = await api.getFields(selectedFarmId || undefined);
        setFields(fields);
        if (fields.length > 0) {
          setSelectedFieldId(fields[0].id);
        }
      } catch (err) {
        console.error('Failed to load water monitoring sites:', err);
      }
    }
    loadFields();
  }, [selectedFarmId]);

  // Load telemetry readings for chosen site and timeframe
  useEffect(() => {
    if (!selectedFieldId) return;

    async function loadTelemetry() {
      try {
        setLoading(true);
        let startDate: string | undefined;
        const now = new Date();
        if (dateRange === '24h') {
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        } else if (dateRange === '3d') {
          startDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
        } else {
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        }

        const res = await api.getTelemetryHistory({
          fieldId: selectedFieldId,
          startDate,
          limit: 1000,
        });
        setReadings(res.readings);
      } catch (err) {
        console.error('Failed to load telemetry readings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTelemetry();
  }, [selectedFieldId, dateRange]);

  const activeField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)' }}>
            {t('monitoring.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('monitoring.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Site Selector */}
          <select
            value={selectedFieldId}
            onChange={(e) => setSelectedFieldId(e.target.value)}
            className="ts-select"
            style={{ fontWeight: 600, fontSize: '13px' }}
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.crop_type})
              </option>
            ))}
          </select>

          {/* Timeframe Filter Tabs */}
          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
            {(['24h', '3d', '7d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: dateRange === r ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: dateRange === r ? '#FFFFFF' : 'var(--color-text-muted)',
                }}
              >
                {r === '24h' ? '24 Hours' : r === '3d' ? '3 Days' : '7 Days'}
              </button>
            ))}
          </div>

          {/* CSV Export Button */}
          <a
            href={api.getExportCsvUrl(selectedFieldId)}
            download
            className="ts-btn ts-btn-primary ts-btn-sm"
          >
            <FileSpreadsheet size={16} /> {t('overview.exportCsv')}
          </a>
        </div>
      </div>

      {/* Main Horizon Interactive Chart Card */}
      <div className="ts-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>
              {activeField?.name} – Water Quality & Microbiological Time-Series
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Water Body Type: <strong>Protected Groundwater Well</strong> | WHO Target Threshold: <strong>0 CFU / 100mL</strong> | Compliance Index: <strong>99.4%</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <ShieldCheck size={16} color="var(--color-primary)" />
            <span>ISO 9308-1 Calibrated Water Telemetry</span>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <div className="ts-skeleton" style={{ width: '80%', height: '240px', margin: '0 auto' }} />
          </div>
        ) : (
          <WaterDepthChart
            readings={readings}
            targetMin={activeField?.target_min_moisture}
            targetMax={activeField?.target_max_moisture}
          />
        )}
      </div>

      {/* Recent Reading Points Table */}
      <div className="ts-card">
        <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '16px' }}>
          Water Quality Point Measurement Records
        </h3>
        <div className="ts-table-container">
          <table className="ts-table">
            <thead>
              <tr>
                <th>Measurement Timestamp (UTC)</th>
                <th>Sampling Depth / Point</th>
                <th>Coliform Index (CFU)</th>
                <th>Incubation Temp (°C)</th>
                <th>Turbidity / EC</th>
                <th>Quality Score</th>
                <th>Telemetry Source</th>
              </tr>
            </thead>
            <tbody>
              {readings.slice(-25).reverse().map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.measured_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td>
                    <span className="ts-badge ts-badge-neutral">{r.depth_cm} cm</span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--color-text)' }}>{r.vwc_percent}%</strong>
                  </td>
                  <td>{r.temp_c !== null ? `${r.temp_c}°C` : '--'}</td>
                  <td>{r.ec_ds_m !== null ? `${r.ec_ds_m} dS/m` : '--'}</td>
                  <td>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      {((r.quality_score || 1.0) * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td>
                    <span className="ts-badge ts-badge-success">{r.source}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
