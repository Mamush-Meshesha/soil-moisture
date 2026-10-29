import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Cpu, Bluetooth, Wifi, Battery, BatteryCharging, Signal, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { Device, Farm, Field } from '../../types';
import { BleSimulatorModal } from '../../components/BleSimulatorModal';
import { useLanguage } from '../../i18n/LanguageContext';

export const DevicesPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [devices, setDevices] = useState<Device[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [bleModalOpen, setBleModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    deviceUid: '',
    name: '',
    model: 'Probe-X5',
    hardwareType: 'SDI-12 Multi-Depth 5-Horizon',
    farmId: selectedFarmId || '',
    fieldId: '',
    firmwareVersion: 'v2.4.1',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [dRes, fRes, flRes] = await Promise.all([
        api.getDevices(),
        api.getFarms(),
        api.getFields(selectedFarmId || undefined),
      ]);
      setDevices(dRes.devices);
      setFarms(fRes.farms);
      setFields(flRes.fields);
    } catch (err) {
      console.error('Failed to load devices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedFarmId]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.registerDevice(formData);
      setShowModal(false);
      setFormData({
        deviceUid: '',
        name: '',
        model: 'Probe-X5',
        hardwareType: 'SDI-12 Multi-Depth 5-Horizon',
        farmId: selectedFarmId || '',
        fieldId: '',
        firmwareVersion: 'v2.4.1',
      });
      loadData();
    } catch (err: any) {
      alert(`Registration error: ${err.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)' }}>
            {t('devices.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('devices.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setBleModalOpen(true)} className="ts-btn ts-btn-secondary">
            <Bluetooth size={16} color="var(--color-primary)" /> {t('app.bleSync')}
          </button>
          <button onClick={() => setShowModal(true)} className="ts-btn ts-btn-primary">
            <Plus size={16} /> {t('devices.registerDevice')}
          </button>
        </div>
      </div>

      {/* Devices Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {devices.map((d) => (
          <div key={d.id} className="ts-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-primary-subtle)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Cpu size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text)' }}>{d.name}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                      UID: {d.device_uid}
                    </div>
                  </div>
                </div>

                <span className={`ts-badge ${d.status === 'ONLINE' ? 'ts-badge-success' : 'ts-badge-error'}`}>
                  {d.status}
                </span>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px', lineHeight: '1.6' }}>
                <div><strong>Model:</strong> {d.model}</div>
                <div><strong>Bus:</strong> {d.hardware_type} ({d.firmware_version})</div>
                <div><strong>Assigned:</strong> {d.field_name ? `${d.field_name} (${d.farm_name})` : 'Unassigned Mast'}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: 'var(--color-surface-sunken)', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Battery size={16} color="var(--color-primary)" />
                  <span>Battery: {d.battery_level}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Signal size={16} color="var(--color-info)" />
                  <span>Signal: {d.signal_quality} dBm</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              <span>Last Seen: {new Date(d.last_seen_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <button
                onClick={() => setBleModalOpen(true)}
                className="ts-btn ts-btn-outline ts-btn-sm"
              >
                Sync BLE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Device Registration Modal */}
      {showModal && (
        <div className="ts-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Register Telemetry Hardware</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                &times;
              </button>
            </div>
            <form onSubmit={handleRegister}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Device UID (Hardware ID) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TS-PROBE-99410"
                    value={formData.deviceUid}
                    onChange={(e) => setFormData({ ...formData, deviceUid: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Friendly Device Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. South Corn Pivot Sensor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Hardware Model</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="ts-select"
                    >
                      <option>Probe-X5</option>
                      <option>Probe-X3</option>
                      <option>Hub-Cellular</option>
                    </select>
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Sensor Interface Bus</label>
                    <select
                      value={formData.hardwareType}
                      onChange={(e) => setFormData({ ...formData, hardwareType: e.target.value })}
                      className="ts-select"
                    >
                      <option>SDI-12 Multi-Depth 5-Horizon</option>
                      <option>RS-485 Modbus RTU</option>
                      <option>Analog Capacitive ADC</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Farm Assignment</label>
                    <select
                      value={formData.farmId}
                      onChange={(e) => setFormData({ ...formData, farmId: e.target.value })}
                      className="ts-select"
                    >
                      <option value="">Select Farm...</option>
                      {farms.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Field Plot Assignment</label>
                    <select
                      value={formData.fieldId}
                      onChange={(e) => setFormData({ ...formData, fieldId: e.target.value })}
                      className="ts-select"
                    >
                      <option value="">Select Field...</option>
                      {fields.map((fl) => (
                        <option key={fl.id} value={fl.id}>{fl.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="ts-modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="ts-btn ts-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn-primary">
                  Register Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bluetooth BLE Sync Modal */}
      <BleSimulatorModal
        isOpen={bleModalOpen}
        onClose={() => setBleModalOpen(false)}
        onSyncComplete={loadData}
      />
    </div>
  );
};
