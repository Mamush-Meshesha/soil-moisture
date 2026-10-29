import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Wrench, Plus, CheckCircle2, Calendar, ShieldCheck, Cpu } from 'lucide-react';
import { api } from '../../services/api';
import { Device, MaintenanceRecord } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const MaintenancePage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [devices, setDevices] = useState<Device[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    deviceId: '',
    type: 'CALIBRATION',
    description: '',
    performedBy: 'Lead Field Tech',
    notes: 'Zero air-void slurry verification performed.',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const { devices } = await api.getDevices();
      setDevices(devices);
      if (devices.length > 0) {
        setFormData((prev) => ({ ...prev, deviceId: devices[0].id }));
        // Load maintenance for all devices
        const allRecords: any[] = [];
        for (const d of devices) {
          const detail = await api.getDevice(d.id);
          if (detail.maintenance) {
            for (const m of detail.maintenance) {
              allRecords.push({ ...m, deviceName: d.name, deviceUid: d.device_uid });
            }
          }
        }
        setRecords(allRecords);
      }
    } catch (err) {
      console.error('Failed to load maintenance records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedFarmId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addMaintenanceRecord(formData.deviceId, formData);
      setShowModal(false);
      setFormData({
        deviceId: devices[0]?.id || '',
        type: 'CALIBRATION',
        description: '',
        performedBy: 'Lead Field Tech',
        notes: '',
      });
      loadData();
    } catch (err: any) {
      alert(`Failed to log maintenance record: ${err.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)' }}>
            {t('maintenance.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('maintenance.subtitle')}
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="ts-btn ts-btn-primary">
          <Plus size={16} /> {t('maintenance.recordMaintenance')}
        </button>
      </div>

      {/* Maintenance Table */}
      <div className="ts-card">
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
          Hardware Maintenance &amp; Diagnostic Log
        </h3>
        <div className="ts-table-container">
          <table className="ts-table">
            <thead>
              <tr>
                <th>Service Date</th>
                <th>Device Node</th>
                <th>Maintenance Type</th>
                <th>Description</th>
                <th>Technician</th>
                <th>Service Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.performed_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <strong>{r.deviceName}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{r.deviceUid}</div>
                  </td>
                  <td>
                    <span className="ts-badge ts-badge-neutral">{r.type}</span>
                  </td>
                  <td>{r.description}</td>
                  <td>{r.performed_by}</td>
                  <td style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{r.notes || '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Service Modal */}
      {showModal && (
        <div className="ts-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Record Hardware Service</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                &times;
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Hardware Device *</label>
                  <select
                    value={formData.deviceId}
                    onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                    className="ts-select"
                  >
                    {devices.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.device_uid})</option>
                    ))}
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Service Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="ts-select"
                  >
                    <option value="CALIBRATION">Factory / Field Dielectric Calibration</option>
                    <option value="BATTERY_REPLACEMENT">Battery Replacement</option>
                    <option value="ANNUAL_INSPECTION">Annual Visual &amp; Cable Inspection</option>
                    <option value="FIRMWARE_FLASH">Firmware Flashing / BLE Update</option>
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Description of Work *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cleaned copper rings and re-slurried hole."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Performed By (Technician)</label>
                  <input
                    type="text"
                    value={formData.performedBy}
                    onChange={(e) => setFormData({ ...formData, performedBy: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Service Notes</label>
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
                  Commit Service Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
