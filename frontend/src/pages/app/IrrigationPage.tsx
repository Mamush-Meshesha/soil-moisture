import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Droplets, CheckCircle2, AlertTriangle, ShieldAlert, Clock, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { IrrigationEvent, IrrigationGuidance, Field } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

const formatNum = (val: any, fallback = '0'): string => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object' && val !== null) {
    if (typeof val.toNumber === 'function') return String(val.toNumber());
    if (val.d && Array.isArray(val.d)) {
      const parsed = parseFloat(val.toString?.() || String(val));
      return isNaN(parsed) ? fallback : String(parsed);
    }
  }
  return String(val);
};

export const IrrigationPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [events, setEvents] = useState<IrrigationEvent[]>([]);
  const [guidanceList, setGuidanceList] = useState<IrrigationGuidance[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fieldId: '',
    scheduledAt: new Date().toISOString().slice(0, 16),
    durationMinutes: '120',
    waterAppliedMm: '18.0',
    method: 'Center Pivot Low-Drift',
    notes: 'Scheduled morning hydration cycle.',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [eRes, gRes, fRes] = await Promise.all([
        api.getIrrigationEvents(),
        api.getIrrigationGuidance(),
        api.getFields(selectedFarmId || undefined),
      ]);
      setEvents(eRes.events);
      setGuidanceList(gRes.guidance);
      setFields(fRes.fields);
      if (fRes.fields.length > 0 && !formData.fieldId) {
        setFormData((prev) => ({ ...prev, fieldId: fRes.fields[0].id }));
      }
    } catch (err) {
      console.error('Failed to load irrigation data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedFarmId]);

  const handleLogEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.logIrrigationEvent(formData);
      setShowModal(false);
      loadData();
    } catch (err: any) {
      alert(`Failed to log irrigation: ${err.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('irrigation.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('irrigation.subtitle')}
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="ts-btn ts-btn-primary">
          <Plus size={16} /> {t('irrigation.logEvent')}
        </button>
      </div>

      {/* Advisory Guidance Cards */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>
          Current Root-Zone Water Deficits &amp; Guidance
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {guidanceList.map((g) => {
            const isDeficit = g.status === 'CRITICAL_DEFICIT' || g.status === 'LOW';
            return (
              <div
                key={g.fieldId}
                className="ts-card"
                style={{
                  borderLeft: `4px solid ${
                    g.status === 'CRITICAL_DEFICIT'
                      ? 'var(--color-error)'
                      : g.status === 'LOW'
                      ? 'var(--color-warning)'
                      : g.status === 'SATURATED'
                      ? 'var(--color-info)'
                      : 'var(--color-primary)'
                  }`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="ts-badge ts-badge-neutral">{g.cropType}</span>
                  <span
                    className={`ts-badge ${
                      g.status === 'CRITICAL_DEFICIT'
                        ? 'ts-badge-error'
                        : g.status === 'LOW'
                        ? 'ts-badge-warning'
                        : g.status === 'SATURATED'
                        ? 'ts-badge-info'
                        : 'ts-badge-success'
                    }`}
                  >
                    {g.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{g.fieldName}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                  Current Moisture: <strong>{formatNum(g.currentVwc, '28.0')}% VWC</strong> (Target: {formatNum(g.targetMin, '20')}% – {formatNum(g.targetMax, '38')}%)
                </p>

                <div style={{ backgroundColor: 'var(--color-bg)', padding: '12px', borderRadius: '8px', marginBottom: '12px', fontSize: '13px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
                    Recommended Water: {Number(formatNum(g.recommendedWaterMm, '0')) > 0 ? `~${formatNum(g.recommendedWaterMm, '0')} mm` : '0 mm (Optimal/Saturated)'}
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    {g.guidanceText}
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  * {g.disclaimer}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Irrigation Log Table */}
      <div className="ts-card">
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
          Historical Irrigation Event Log
        </h3>
        <div className="ts-table-container">
          <table className="ts-table">
            <thead>
              <tr>
                <th>Scheduled Date &amp; Time</th>
                <th>Field Plot</th>
                <th>Crop Variety</th>
                <th>Method</th>
                <th>Duration (Min)</th>
                <th>Water Applied (mm)</th>
                <th>Field Notes</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td>{new Date(e.scheduled_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td><strong>{e.field_name}</strong></td>
                  <td>{e.crop_type}</td>
                  <td><span className="ts-badge ts-badge-neutral">{e.method}</span></td>
                  <td>{e.duration_minutes} min</td>
                  <td><strong style={{ color: 'var(--color-primary-dark)' }}>{formatNum(e.water_applied_mm)} mm</strong></td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>{e.notes || '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Irrigation Modal */}
      {showModal && (
        <div className="ts-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Record Field Irrigation Pass</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                &times;
              </button>
            </div>
            <form onSubmit={handleLogEvent}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Target Field Plot *</label>
                  <select
                    value={formData.fieldId}
                    onChange={(e) => setFormData({ ...formData, fieldId: e.target.value })}
                    className="ts-select"
                  >
                    {fields.map((f) => (
                      <option key={f.id} value={f.id}>{f.name} ({f.crop_type})</option>
                    ))}
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Date &amp; Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Water Applied (mm) *</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formData.waterAppliedMm}
                      onChange={(e) => setFormData({ ...formData, waterAppliedMm: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Duration (Minutes)</label>
                    <input
                      type="number"
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Application Method</label>
                  <select
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    className="ts-select"
                  >
                    <option>Center Pivot Low-Drift</option>
                    <option>Subsurface Drip Irrigation</option>
                    <option>Solid Set Micro-Sprinklers</option>
                    <option>Flood Furrow</option>
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Operator Notes</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="ts-textarea"
                  />
                </div>
              </div>

              <div className="ts-modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="ts-btn ts-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn-primary">
                  Commit Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
