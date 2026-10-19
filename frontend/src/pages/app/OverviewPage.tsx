import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Trees,
  Grid,
  Cpu,
  AlertTriangle,
  Droplets,
  Bluetooth,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';
import { api } from '../../services/api';
import { Farm, Field, Device, Alert } from '../../types';
import { MoistureGauge } from '../../components/MoistureGauge';
import { BleSimulatorModal } from '../../components/BleSimulatorModal';
import { useLanguage } from '../../i18n/LanguageContext';

export const OverviewPage: React.FC = () => {
  const { selectedFarmId } = useOutletContext<{ selectedFarmId: string }>();
  const { t } = useLanguage();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [bleModalOpen, setBleModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [fRes, flRes, dRes, aRes] = await Promise.all([
        api.getFarms(),
        api.getFields(selectedFarmId || undefined),
        api.getDevices(),
        api.getAlerts({ status: 'ACTIVE' }),
      ]);
      setFarms(fRes.farms);
      setFields(flRes.fields);
      setDevices(dRes.devices);
      setAlerts(aRes.alerts);
    } catch (err) {
      console.error('Failed to load overview data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedFarmId]);

  const onlineDevicesCount = devices.filter((d) => d.status === 'ONLINE').length;
  const activeFarm = farms.find((f) => f.id === selectedFarmId) || farms[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner & Quick Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('overview.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('overview.selectFarm')}: <strong>{activeFarm?.name || 'All Operations'}</strong> ({activeFarm?.location || 'General'})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setBleModalOpen(true)} className="ts-btn ts-btn-secondary ts-btn-sm">
            <Bluetooth size={16} color="var(--color-primary)" /> {t('app.bleSync')}
          </button>
          <Link to="/app/irrigation" className="ts-btn ts-btn-secondary ts-btn-sm">
            <Droplets size={16} color="var(--color-info)" /> {t('overview.logIrrigation')}
          </Link>
          <a
            href={api.getExportCsvUrl()}
            download
            className="ts-btn ts-btn-outline ts-btn-sm"
          >
            <FileSpreadsheet size={16} /> {t('overview.exportCsv')}
          </a>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="ts-metric-card">
          <div className="ts-metric-title">
            <span>{t('overview.regFarms')}</span>
            <Trees size={18} color="var(--color-primary)" />
          </div>
          <div className="ts-metric-val">
            {farms.length}
            <span className="ts-metric-unit">{t('overview.farmsUnit')}</span>
          </div>
          <div className="ts-metric-sub">
            <span>{farms.reduce((acc, f) => acc + (f.total_area_ha || 0), 0)} {t('overview.haUnderManagement')}</span>
          </div>
        </div>

        <div className="ts-metric-card">
          <div className="ts-metric-title">
            <span>{t('overview.monPlots')}</span>
            <Grid size={18} color="var(--color-primary)" />
          </div>
          <div className="ts-metric-val">
            {fields.length}
            <span className="ts-metric-unit">{t('overview.plotsUnit')}</span>
          </div>
          <div className="ts-metric-sub">
            <span>{t('overview.cropsSummary')}</span>
          </div>
        </div>

        <div className="ts-metric-card">
          <div className="ts-metric-title">
            <span>{t('overview.sensorGateways')}</span>
            <Cpu size={18} color="var(--color-primary)" />
          </div>
          <div className="ts-metric-val">
            {onlineDevicesCount} / {devices.length}
            <span className="ts-metric-unit">{t('overview.onlineUnit')}</span>
          </div>
          <div className="ts-metric-sub">
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{t('overview.telemetryFreshness')}</span>
          </div>
        </div>

        <div className="ts-metric-card">
          <div className="ts-metric-title">
            <span>{t('overview.activeAlerts')}</span>
            <AlertTriangle size={18} color={alerts.length > 0 ? 'var(--color-warning)' : 'var(--color-text-muted)'} />
          </div>
          <div className="ts-metric-val" style={{ color: alerts.length > 0 ? 'var(--color-warning)' : 'inherit' }}>
            {alerts.length}
            <span className="ts-metric-unit">{t('overview.unresolvedUnit')}</span>
          </div>
          <div className="ts-metric-sub">
            {alerts.length > 0 ? (
              <Link to="/app/alerts" style={{ color: 'var(--color-warning)', fontWeight: 600 }}>
                {t('overview.reviewWarnings')} &rarr;
              </Link>
            ) : (
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{t('overview.safeMoisture')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Active Threshold Alert Notice if Any */}
      {alerts.length > 0 && (
        <div className="ts-alert-banner ts-alert-banner-warning">
          <AlertTriangle size={22} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '15px' }}>{alerts[0].title}</strong>
            <p style={{ marginTop: '2px', fontSize: '13px' }}>{alerts[0].message}</p>
          </div>
          <Link to="/app/alerts" className="ts-btn ts-btn-secondary ts-btn-sm">
            {t('overview.viewAlertsCenter')}
          </Link>
        </div>
      )}

      {/* Field Soil Status Gauges Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-text)' }}>
              {t('overview.moistureByField')}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              {t('overview.moistureSub')}
            </p>
          </div>
          <Link to="/app/soil-monitoring" className="ts-btn ts-btn-secondary ts-btn-sm">
            {t('overview.horizonCharts')} <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {fields.map((f) => (
            <div key={f.id} className="ts-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="ts-badge ts-badge-neutral">{f.crop_type}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{f.soil_type}</span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '4px 0 12px', textAlign: 'center' }}>
                {f.name}
              </h3>

              <MoistureGauge
                value={f.current_vwc || 28.5}
                minTarget={f.target_min_moisture}
                maxTarget={f.target_max_moisture}
                size={170}
                label={`${f.root_depth_cm}cm ${t('overview.rootZone')}`}
              />

              <div style={{ width: '100%', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                <span>{t('overview.area')}: {f.area_ha} ha</span>
                <span>{t('overview.temp')}: {f.current_temp ? `${f.current_temp}°C` : '20.4°C'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BLE Field Sync Modal Component */}
      <BleSimulatorModal
        isOpen={bleModalOpen}
        onClose={() => setBleModalOpen(false)}
        onSyncComplete={loadData}
      />
    </div>
  );
};
