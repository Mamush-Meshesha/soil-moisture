import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LineChart, TrendingDown, TrendingUp, Sun, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { Field } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const AnalyticsPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string>('');
  const [analyticsData, setAnalyticsData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFields() {
      try {
        const { fields } = await api.getFields(selectedFarmId || undefined);
        setFields(fields);
        if (fields.length > 0) setSelectedFieldId(fields[0].id);
      } catch (err) {
        console.error('Failed to load fields:', err);
      }
    }
    loadFields();
  }, [selectedFarmId]);

  useEffect(() => {
    if (!selectedFieldId) return;
    async function loadAnalytics() {
      try {
        setLoading(true);
        const res = await api.getTelemetryAnalytics(selectedFieldId);
        setAnalyticsData(res);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, [selectedFieldId]);

  const activeField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)' }}>
            {t('analytics.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('analytics.subtitle')}
          </p>
        </div>

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
      </div>

      {/* Analytical Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div className="ts-metric-card">
          <div className="ts-metric-title">
            <span>Chlorine Residual Decay Rate</span>
            <TrendingDown size={18} color="var(--color-warning)" />
          </div>
          <div className="ts-metric-val">
            -0.12
            <span className="ts-metric-unit">mg/L / hr</span>
          </div>
          <div className="ts-metric-sub">
            <span>Safe disinfectant barrier maintained</span>
          </div>
        </div>

        <div className="ts-metric-card">
          <div className="ts-metric-title">
            <span>Incubation Velocity</span>
            <TrendingUp size={18} color="var(--color-primary)" />
          </div>
          <div className="ts-metric-val">
            18.2
            <span className="ts-metric-unit">hrs</span>
          </div>
          <div className="ts-metric-sub">
            <span>Rapid colony optical detection vs 24h ISO baseline</span>
          </div>
        </div>

        <div className="ts-metric-card">
          <div className="ts-metric-title">
            <span>Data Completeness</span>
            <CheckCircle2 size={18} color="var(--color-primary)" />
          </div>
          <div className="ts-metric-val">
            99.4
            <span className="ts-metric-unit">%</span>
          </div>
          <div className="ts-metric-sub">
            <span>Zero missing telemetry intervals</span>
          </div>
        </div>
      </div>

      {/* Diurnal Transpiration Hourly Pattern */}
      <div className="ts-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>
              Diurnal Water Drawing & Quality Cycle (24-Hour Profile)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Peak community water collection occurs during daylight hours (07:00 – 18:00 UTC), showing diurnal turbidity and residual dynamics.
            </p>
          </div>
          <span className="ts-badge ts-badge-neutral">Hourly Aggregation</span>
        </div>

        {analyticsData?.diurnalCycle && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', padding: '16px 0', borderBottom: '1px solid var(--color-border)' }}>
            {analyticsData.diurnalCycle.map((d: any, idx: number) => {
              const heightPct = Math.min(100, Math.max(20, (d.avg_vwc / 40) * 100));
              const isDaytime = parseInt(d.hour_of_day, 10) >= 11 && parseInt(d.hour_of_day, 10) <= 18;
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      backgroundColor: isDaytime ? 'var(--color-primary)' : 'var(--color-border)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease',
                    }}
                    title={`Hour ${d.hour_of_day}:00 | VWC: ${d.avg_vwc}% | Temp: ${d.avg_temp}°C`}
                  />
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                    {d.hour_of_day}h
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 7-Day Horizon Summary Table */}
      <div className="ts-card">
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
          7-Day Statistical Summary per Sampling Depth
        </h3>
        <div className="ts-table-container">
          <table className="ts-table">
            <thead>
              <tr>
                <th>Sampling Horizon</th>
                <th>Average Quality Index</th>
                <th>Minimum Index</th>
                <th>Maximum Index</th>
                <th>Incubation / Water Temp</th>
                <th>Turbidity / Conductivity</th>
                <th>Total Sample Points</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData?.summaryStats?.map((s: any) => (
                <tr key={s.depth_cm}>
                  <td><strong>{s.depth_cm} cm</strong></td>
                  <td><span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{s.avg_vwc}%</span></td>
                  <td>{s.min_vwc}%</td>
                  <td>{s.max_vwc}%</td>
                  <td>{s.avg_temp}°C</td>
                  <td>{s.avg_ec} dS/m</td>
                  <td>{s.total_samples} samples</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
