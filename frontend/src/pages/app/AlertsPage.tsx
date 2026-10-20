import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, Plus, Check, Clock } from 'lucide-react';
import { api } from '../../services/api';
import { Alert, AlertRule, Field } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const AlertsPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ACTIVE');
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [ruleForm, setRuleForm] = useState({
    fieldId: '',
    ruleName: '',
    metric: 'VWC',
    operator: '<',
    threshold: '18.0',
    severity: 'WARNING',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [aRes, rRes, flRes] = await Promise.all([
        api.getAlerts(statusFilter === 'ALL' ? undefined : { status: statusFilter }),
        api.getAlertRules(),
        api.getFields(selectedFarmId || undefined),
      ]);
      setAlerts(aRes.alerts);
      setRules(rRes.rules);
      setFields(flRes.fields);
      if (flRes.fields.length > 0 && !ruleForm.fieldId) {
        setRuleForm((prev) => ({ ...prev, fieldId: flRes.fields[0].id }));
      }
    } catch (err) {
      console.error('Failed to load alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedFarmId, statusFilter]);

  const handleAcknowledge = async (id: string) => {
    try {
      await api.acknowledgeAlert(id);
      loadData();
    } catch (err: any) {
      alert(`Failed to acknowledge alert: ${err.message}`);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await api.resolveAlert(id);
      loadData();
    } catch (err: any) {
      alert(`Failed to resolve alert: ${err.message}`);
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAlertRule(ruleForm);
      setShowRuleModal(false);
      loadData();
    } catch (err: any) {
      alert(`Failed to create alert rule: ${err.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('alerts.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('alerts.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
            {(['ACTIVE', 'ALL', 'RESOLVED'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: statusFilter === s ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: statusFilter === s ? '#FFFFFF' : 'var(--color-text-muted)',
                }}
              >
                {s === 'ACTIVE' ? t('alerts.active') : s === 'RESOLVED' ? t('alerts.resolved') : t('alerts.all')}
              </button>
            ))}
          </div>

          <button onClick={() => setShowRuleModal(true)} className="ts-btn ts-btn-primary ts-btn-sm">
            <Plus size={16} /> {t('alerts.newRule')}
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts.length === 0 ? (
          <div className="ts-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <CheckCircle2 size={40} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{t('alerts.noAlerts')}</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              {t('alerts.noAlertsDesc')}
            </p>
          </div>
        ) : (
          alerts.map((a) => (
            <div
              key={a.id}
              className="ts-card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                borderLeft: `4px solid ${
                  a.severity === 'CRITICAL'
                    ? 'var(--color-error)'
                    : a.severity === 'WARNING'
                    ? 'var(--color-warning)'
                    : 'var(--color-info)'
                }`,
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span
                    className={`ts-badge ${
                      a.severity === 'CRITICAL'
                        ? 'ts-badge-error'
                        : a.severity === 'WARNING'
                        ? 'ts-badge-warning'
                        : 'ts-badge-info'
                    }`}
                  >
                    {a.severity === 'CRITICAL' ? t('alerts.severityCritical') : a.severity === 'WARNING' ? t('alerts.severityWarning') : t('alerts.severityInfo')}
                  </span>
                  <span className="ts-badge ts-badge-neutral">{a.status}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    {new Date(a.triggered_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>{a.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  {a.message}
                </p>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                  Field: <strong>{a.field_name || 'General Plot'}</strong> | Device: <strong>{a.device_uid || 'Sensor'}</strong>
                </div>
              </div>

              {a.status === 'ACTIVE' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleAcknowledge(a.id)}
                    className="ts-btn ts-btn-secondary ts-btn-sm"
                  >
                    {t('alerts.acknowledge')}
                  </button>
                  <button
                    onClick={() => handleResolve(a.id)}
                    className="ts-btn ts-btn-primary ts-btn-sm"
                  >
                    <Check size={14} /> {t('alerts.resolve')}
                  </button>
                </div>
              )}

              {a.status === 'ACKNOWLEDGED' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleResolve(a.id)}
                    className="ts-btn ts-btn-primary ts-btn-sm"
                  >
                    <Check size={14} /> {t('alerts.resolve')}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Alert Rules Table */}
      <div className="ts-card">
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
          {t('alerts.rulesTitle')}
        </h3>
        <div className="ts-table-container">
          <table className="ts-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Target Field</th>
                <th>Metric Evaluated</th>
                <th>Operator</th>
                <th>Threshold Value</th>
                <th>Alert Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.rule_name}</strong></td>
                  <td>{r.field_name || 'All Fields'}</td>
                  <td>{r.metric}</td>
                  <td><code>{r.operator}</code></td>
                  <td><strong>{r.threshold}% VWC</strong></td>
                  <td>
                    <span
                      className={`ts-badge ${
                        r.severity === 'CRITICAL'
                          ? 'ts-badge-error'
                          : r.severity === 'WARNING'
                          ? 'ts-badge-warning'
                          : 'ts-badge-info'
                      }`}
                    >
                      {r.severity}
                    </span>
                  </td>
                  <td><span className="ts-badge ts-badge-success">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Rule Modal */}
      {showRuleModal && (
        <div className="ts-modal-backdrop" onClick={() => setShowRuleModal(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Add Contamination & Safety Threshold Rule</h3>
              <button onClick={() => setShowRuleModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateRule}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Target Water Point / Site *</label>
                  <select
                    value={ruleForm.fieldId}
                    onChange={(e) => setRuleForm({ ...ruleForm, fieldId: e.target.value })}
                    className="ts-select"
                  >
                    {fields.map((f) => (
                      <option key={f.id} value={f.id}>{f.name} ({f.crop_type})</option>
                    ))}
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Rule Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Critical Wilting Stress"
                    value={ruleForm.ruleName}
                    onChange={(e) => setRuleForm({ ...ruleForm, ruleName: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Condition</label>
                    <select
                      value={ruleForm.operator}
                      onChange={(e) => setRuleForm({ ...ruleForm, operator: e.target.value })}
                      className="ts-select"
                    >
                      <option value="<">Moisture Drops Below (&lt;)</option>
                      <option value=">">Moisture Exceeds (&gt;)</option>
                    </select>
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Threshold Value (% VWC)</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={ruleForm.threshold}
                      onChange={(e) => setRuleForm({ ...ruleForm, threshold: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Severity Level</label>
                  <select
                    value={ruleForm.severity}
                    onChange={(e) => setRuleForm({ ...ruleForm, severity: e.target.value })}
                    className="ts-select"
                  >
                    <option value="WARNING">Warning (Standard)</option>
                    <option value="CRITICAL">Critical (Urgent)</option>
                    <option value="INFO">Informational</option>
                  </select>
                </div>
              </div>

              <div className="ts-modal-footer">
                <button type="button" onClick={() => setShowRuleModal(false)} className="ts-btn ts-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn-primary">
                  Save Threshold Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
