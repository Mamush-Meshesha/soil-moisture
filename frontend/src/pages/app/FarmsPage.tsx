import React, { useState, useEffect } from 'react';
import { Plus, Trees, MapPin, Grid, Cpu, AlertTriangle, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { Farm } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const FarmsPage: React.FC = () => {
  const { t } = useLanguage();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    latitude: '',
    longitude: '',
    timezone: 'America/Los_Angeles',
    totalAreaHa: '',
    description: '',
  });

  const loadFarms = async () => {
    try {
      setLoading(true);
      const { farms } = await api.getFarms();
      setFarms(farms);
    } catch (err) {
      console.error('Failed to load farms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createFarm(formData);
      setShowModal(false);
      setFormData({
        name: '',
        location: '',
        latitude: '',
        longitude: '',
        timezone: 'America/Los_Angeles',
        totalAreaHa: '',
        description: '',
      });
      loadFarms();
    } catch (err: any) {
      alert(`Error creating farm: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete community/district "${name}" and all associated water points?`)) {
      return;
    }
    try {
      await api.deleteFarm(id);
      loadFarms();
    } catch (err: any) {
      alert(`Failed to delete farm: ${err.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('farms.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('farms.subtitle')}
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="ts-btn ts-btn-primary">
          <Plus size={16} /> {t('farms.addFarm')}
        </button>
      </div>

      {/* Farms Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {farms.map((f) => (
          <div key={f.id} className="ts-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    <Trees size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)' }}>{f.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      <MapPin size={13} /> {f.location}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(f.id, f.name)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '4px' }}
                  title="Archive Farm"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {f.description && (
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {f.description}
                </p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', backgroundColor: 'var(--color-surface-sunken)', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Plots</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>{f.fields_count || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Devices</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>{f.devices_count || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Avg VWC</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {f.avg_moisture_24h ? `${f.avg_moisture_24h}%` : '28.2%'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              <span>Area: {f.total_area_ha} ha</span>
              <span>Timezone: {f.timezone}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Farm Creation Modal */}
      {showModal && (
        <div className="ts-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Add Agricultural Property</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                &times;
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Farm Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. West Basin Agro"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Geographic Location / Valley *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. San Joaquin Valley, CA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="36.6777"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="-121.6555"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Total Area (ha)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="120.0"
                      value={formData.totalAreaHa}
                      onChange={(e) => setFormData({ ...formData, totalAreaHa: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Timezone</label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="ts-select"
                    >
                      <option>America/Los_Angeles</option>
                      <option>America/Denver</option>
                      <option>America/Chicago</option>
                      <option>America/New_York</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Description / Water Quality Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Borehole distribution network, chlorination units, and community tapstands..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="ts-textarea"
                  />
                </div>
              </div>

              <div className="ts-modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="ts-btn ts-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn-primary">
                  Create District / Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
