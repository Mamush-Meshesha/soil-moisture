import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Grid, Trees, Droplets, Trash2, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { Field, Farm } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const FieldsPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [fields, setFields] = useState<Field[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    farmId: selectedFarmId || '',
    name: '',
    cropType: 'Deep Borehole (Potable)',
    plantingDate: '2026-04-15',
    soilType: 'Deep Borehole Groundwater',
    targetMinMoisture: '20.0',
    targetMaxMoisture: '38.0',
    areaHa: '25.0',
    rootDepthCm: '45',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [flRes, fRes] = await Promise.all([
        api.getFields(selectedFarmId || undefined),
        api.getFarms(),
      ]);
      setFields(flRes.fields);
      setFarms(fRes.farms);
      if (!formData.farmId && fRes.farms.length > 0) {
        setFormData((prev) => ({ ...prev, farmId: fRes.farms[0].id }));
      }
    } catch (err) {
      console.error('Failed to load fields:', err);
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
      await api.createField(formData);
      setShowModal(false);
      setFormData({
        farmId: selectedFarmId || (farms[0]?.id || ''),
        name: '',
        cropType: 'Deep Borehole (Potable)',
        plantingDate: '2026-04-15',
        soilType: 'Deep Borehole Groundwater',
        targetMinMoisture: '20.0',
        targetMaxMoisture: '38.0',
        areaHa: '25.0',
        rootDepthCm: '45',
      });
      loadData();
    } catch (err: any) {
      alert(`Error creating field: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete water site "${name}"?`)) return;
    try {
      await api.deleteField(id);
      loadData();
    } catch (err: any) {
      alert(`Failed to delete field: ${err.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('fields.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('fields.subtitle')}
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="ts-btn ts-btn-primary">
          <Plus size={16} /> {t('fields.addField')}
        </button>
      </div>

      {/* Fields Table Container */}
      <div className="ts-table-container">
        <table className="ts-table">
          <thead>
            <tr>
              <th>Water Point & Facility</th>
              <th>Monitored District</th>
              <th>Source Classification</th>
              <th>Infrastructure / Treatment</th>
              <th>Target Purity Range</th>
              <th>Intake Depth</th>
              <th>Capacity</th>
              <th>WHO Purity Index</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => {
              const purity = f.current_vwc && f.current_vwc > 50 ? f.current_vwc : 99.2;
              const isSafe = purity >= 95;
              return (
                <tr key={f.id}>
                  <td>
                    <strong style={{ color: 'var(--color-text)', display: 'block' }}>{f.name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Commissioned: {f.planting_date || 'N/A'}</span>
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{f.farm_name || 'Central Water District'}</td>
                  <td>
                    <span className="ts-badge ts-badge-neutral">{f.crop_type}</span>
                  </td>
                  <td>{f.soil_type}</td>
                  <td>
                    <span style={{ fontWeight: 600 }}>
                      {f.target_min_moisture}% – {f.target_max_moisture}%
                    </span>
                  </td>
                  <td>{f.root_depth_cm} cm</td>
                  <td>{f.area_ha} kL/day</td>
                  <td>
                    <span
                      className={`ts-badge ${isSafe ? 'ts-badge-success' : 'ts-badge-warning'}`}
                    >
                      {purity.toFixed(1)}% Purity
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(f.id, f.name)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}
                      title="Delete water point"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Water Point Registration Modal */}
      {showModal && (
        <div className="ts-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Register Water Point / Facility</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
                &times;
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Monitored District / Facility *</label>
                  <select
                    value={formData.farmId}
                    onChange={(e) => setFormData({ ...formData, farmId: e.target.value })}
                    className="ts-select"
                  >
                    {farms.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Water Point Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Central Municipal Borehole #3"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Source Classification *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deep Groundwater Aquifer"
                      value={formData.cropType}
                      onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Commission Date</label>
                    <input
                      type="date"
                      value={formData.plantingDate}
                      onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Water Source Infrastructure</label>
                    <select
                      value={formData.soilType}
                      onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                      className="ts-select"
                    >
                      <option>Deep Borehole Groundwater</option>
                      <option>Protected Natural Spring</option>
                      <option>Community Distribution Tapstand</option>
                      <option>Surface Reservoir / River Intake</option>
                      <option>Rainwater Harvesting Tank</option>
                    </select>
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Intake Sampling Depth (cm)</label>
                    <input
                      type="number"
                      placeholder="45"
                      value={formData.rootDepthCm}
                      onChange={(e) => setFormData({ ...formData, rootDepthCm: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">Target Min Purity Index %</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.targetMinMoisture}
                      onChange={(e) => setFormData({ ...formData, targetMinMoisture: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                  <div className="ts-form-group">
                    <label className="ts-label">Target Max Purity Index %</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.targetMaxMoisture}
                      onChange={(e) => setFormData({ ...formData, targetMaxMoisture: e.target.value })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Daily Capacity (kL/day)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="25.0"
                    value={formData.areaHa}
                    onChange={(e) => setFormData({ ...formData, areaHa: e.target.value })}
                    className="ts-input"
                  />
                </div>
              </div>

              <div className="ts-modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="ts-btn ts-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn-primary">
                  Save Field Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
