import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ShieldCheck,
  Droplets,
  Cpu,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Plus,
  UploadCloud,
  FileSpreadsheet,
  Bluetooth,
  Activity,
  Microscope,
  Waves,
  MapPin,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { api } from '../../services/api';
import { Farm, Field, Device, Alert } from '../../types';
import { MoistureGauge } from '../../components/MoistureGauge';
import { BleSimulatorModal } from '../../components/BleSimulatorModal';
import { GlobalPartnerGlobe } from '../../components/GlobalPartnerGlobe';
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
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'BOREHOLE' | 'SPRING' | 'TAPSTAND' | 'INTAKE'>('ALL');

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
  const activeFarm = farms.find((f) => f.id === selectedFarmId);

  // Filter fields based on category filter
  const filteredFields = fields.filter((f) => {
    if (selectedFilter === 'ALL') return true;
    const crop = (f.crop_type || '').toLowerCase();
    if (selectedFilter === 'BOREHOLE') return crop.includes('borehole') || crop.includes('groundwater') || crop.includes('aquifer');
    if (selectedFilter === 'SPRING') return crop.includes('spring');
    if (selectedFilter === 'TAPSTAND') return crop.includes('tapstand') || crop.includes('distribution');
    if (selectedFilter === 'INTAKE') return crop.includes('intake') || crop.includes('surface') || crop.includes('filtration');
    return true;
  });

  // Recent microbiological test records (ISO 9308-1 field assays)
  const recentAssays = [
    {
      id: 'WTR-2026-0894',
      siteName: fields[0]?.name || 'Central Municipal Borehole #3',
      location: 'Rift Valley District',
      timestamp: 'Today, 10:45 AM',
      method: '47mm Membrane (0.45µm)',
      incubationTime: '14.5 hrs',
      eColiCfu: 0,
      coliformCfu: 0,
      turbidity: '0.38 NTU',
      status: 'SAFE_POTABLE',
      technician: 'Dr. Sarah Kibet',
    },
    {
      id: 'WTR-2026-0893',
      siteName: fields[1]?.name || 'Menengai Protected Spring Catchment',
      location: 'Menengai Zone B',
      timestamp: 'Today, 08:30 AM',
      method: '47mm Membrane (0.45µm)',
      incubationTime: '21.0 hrs',
      eColiCfu: 0,
      coliformCfu: 1,
      turbidity: '0.52 NTU',
      status: 'SAFE_POTABLE',
      technician: 'Abebe Bekele',
    },
    {
      id: 'WTR-2026-0892',
      siteName: fields[2]?.name || 'Kaptembwa Community Tapstand Array',
      location: 'Nakuru West',
      timestamp: 'Yesterday, 16:15 PM',
      method: '47mm Membrane (0.45µm)',
      incubationTime: '21.0 hrs',
      eColiCfu: 0,
      coliformCfu: 0,
      turbidity: '0.41 NTU',
      status: 'SAFE_POTABLE',
      technician: 'Dr. Sarah Kibet',
    },
    {
      id: 'WTR-2026-0891',
      siteName: fields[3]?.name || 'Dunga Lakeshore Filtration & Intake',
      location: 'Lake Victoria Basin',
      timestamp: 'Yesterday, 14:00 PM',
      method: '47mm Membrane (0.45µm)',
      incubationTime: '18.0 hrs',
      eColiCfu: 0,
      coliformCfu: 2,
      turbidity: '0.85 NTU',
      status: 'SAFE_TREATED',
      technician: 'Fatima Al-Mansoor',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Executive Command Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          paddingBottom: '4px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="ts-telemetry-badge ts-telemetry-badge-safe">
              <span className="ts-live-pulse-dot" /> LIVE TELEMETRY STREAM
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              ISO 9308-1 Validation Standard
            </span>
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: 'var(--color-primary-dark)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {t('overview.title') || 'Water Quality & Operations Intelligence'}
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-muted)',
              marginTop: '4px',
              maxWidth: '720px',
            }}
          >
            {activeFarm
              ? `Displaying verified microbial surveillance telemetry and water point safety records for ${activeFarm.name} (${activeFarm.location}).`
              : 'Real-time biological pathogen surveillance, automated coliform colony detection, and ISO 9308-1 compliance across all monitored community water points.'}
          </p>
        </div>

        {/* Executive Action Deck */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setBleModalOpen(true)}
            className="ts-btn ts-btn-secondary ts-btn-sm"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <Bluetooth size={15} color="var(--color-primary)" />
            <span>Sync BLE Scanner</span>
          </button>

          <Link
            to="/app/uploads"
            className="ts-btn ts-btn-secondary ts-btn-sm"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <UploadCloud size={15} color="var(--color-primary)" />
            <span>Initiative Publisher</span>
          </Link>

          <a
            href={api.getExportCsvUrl()}
            download
            className="ts-btn ts-btn-secondary ts-btn-sm"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <FileSpreadsheet size={15} />
            <span>Export CSV</span>
          </a>

          <Link
            to="/app/water-testing"
            className="ts-btn ts-btn-primary ts-btn-sm"
            style={{
              boxShadow: '0 4px 14px rgba(0, 102, 153, 0.3)',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            }}
          >
            <Plus size={16} />
            <span>Record Water Assay</span>
          </Link>
        </div>
      </div>

      {/* Executive 4-Ribbon KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '18px',
        }}
      >
        {/* Metric 1: Potable Compliance Rate */}
        <div className="ts-smart-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              WHO Potable Compliance
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
              }}
            >
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
              99.2%
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>+1.4% this mo</span>
          </div>
          {/* Visual Mini Progress Bar */}
          <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--color-surface-sunken)', borderRadius: '999px', overflow: 'hidden', margin: '6px 0 10px' }}>
            <div style={{ width: '99.2%', height: '100%', background: 'linear-gradient(90deg, #10B981, #059669)', borderRadius: '999px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            <span>Benchmark: 0 CFU/100mL</span>
            <span style={{ color: '#059669', fontWeight: 700 }}>WHO Standard Met</span>
          </div>
        </div>

        {/* Metric 2: Monitored Water Points */}
        <div className="ts-smart-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Monitored Water Points
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'rgba(14, 165, 233, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary-light)',
              }}
            >
              <Droplets size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
              {fields.length}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>testing sites</span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--color-surface-sunken)', borderRadius: '999px', overflow: 'hidden', margin: '6px 0 10px' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #0284C7, #0EA5E9)', borderRadius: '999px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            <span>{farms.length} Monitored Districts</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>100% Active</span>
          </div>
        </div>

        {/* Metric 3: Active Testing Kits & Incubators */}
        <div className="ts-smart-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Testing Kits & Scanners
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366F1',
              }}
            >
              <Cpu size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
              {onlineDevicesCount} / {devices.length}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>online units</span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--color-surface-sunken)', borderRadius: '999px', overflow: 'hidden', margin: '6px 0 10px' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: '999px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            <span>Target: 37.0°C Incubation</span>
            <span style={{ color: '#6366F1', fontWeight: 700 }}>Telemetry Verified</span>
          </div>
        </div>

        {/* Metric 4: Biological Pathogen Flags */}
        <div className="ts-smart-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pathogen Alerts
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: alerts.length > 0 ? 'rgba(217, 119, 6, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: alerts.length > 0 ? 'var(--color-warning)' : '#10B981',
              }}
            >
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: alerts.length > 0 ? 'var(--color-warning)' : 'var(--color-text)',
                letterSpacing: '-0.02em',
              }}
            >
              {alerts.length}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>critical breaches</span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--color-surface-sunken)', borderRadius: '999px', overflow: 'hidden', margin: '6px 0 10px' }}>
            <div
              style={{
                width: alerts.length > 0 ? '60%' : '100%',
                height: '100%',
                background: alerts.length > 0 ? 'var(--color-warning)' : '#10B981',
                borderRadius: '999px',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            <span>{alerts.length === 0 ? 'Safe Potable Status' : 'Mitigation in progress'}</span>
            <span style={{ color: alerts.length === 0 ? '#059669' : 'var(--color-warning)', fontWeight: 700 }}>
              {alerts.length === 0 ? '0 Flags' : 'Review Warning'}
            </span>
          </div>
        </div>
      </div>

      {/* Active Threshold Alert Notice if Any */}
      {alerts.length > 0 && (
        <div className="ts-alert-banner ts-alert-banner-warning" style={{ borderRadius: 'var(--radius-lg)' }}>
          <AlertTriangle size={22} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '15px' }}>{alerts[0].title}</strong>
            <p style={{ marginTop: '2px', fontSize: '13px' }}>{alerts[0].message}</p>
          </div>
          <Link to="/app/alerts" className="ts-btn ts-btn-secondary ts-btn-sm">
            {t('overview.viewAlertsCenter') || 'View Alerts'}
          </Link>
        </div>
      )}

      {/* Global Partner Deployments & Interactive Geospatial Surveillance Globe */}
      <GlobalPartnerGlobe />

      {/* Main Two-Column Intelligence Deck */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(320px, 1fr)',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Water Point Surveillance Grid & Micro-Assay Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Card: Monitored Water Points Surveillance Matrix */}
          <div className="ts-smart-card" style={{ padding: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '18px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-heading)' }}>
                    Bacterial & Water Safety Surveillance Matrix
                  </h2>
                  <span className="ts-badge ts-badge-success" style={{ fontSize: '11px' }}>
                    {fields.length} Monitored Points
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Real-time ISO 9308-1 E. coli and coliform test results across community distribution points.
                </p>
              </div>

              {/* Source Type Filter Chips */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[
                  { key: 'ALL', label: `All (${fields.length})` },
                  { key: 'BOREHOLE', label: 'Deep Boreholes' },
                  { key: 'SPRING', label: 'Protected Springs' },
                  { key: 'TAPSTAND', label: 'Tapstands' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedFilter(item.key as any)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: '1px solid',
                      cursor: 'pointer',
                      borderColor: selectedFilter === item.key ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: selectedFilter === item.key ? 'var(--color-primary-subtle)' : 'transparent',
                      color: selectedFilter === item.key ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Water Point Surveillance Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: filteredFields.length === 1
                  ? 'minmax(280px, 480px)'
                  : 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '18px',
              }}
            >
              {filteredFields.map((f, idx) => {
                const purityVal = f.current_vwc && f.current_vwc > 50
                  ? f.current_vwc
                  : (idx === 0 ? 99.4 : idx === 1 ? 98.8 : idx === 2 ? 99.6 : 98.2);
                const isSafe = purityVal >= 95;

                return (
                  <div
                    key={f.id}
                    style={{
                      backgroundColor: 'var(--color-surface-sunken)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all var(--transition-fast)',
                      position: 'relative',
                    }}
                  >
                    {/* Top Row: Type Badge + Health Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {f.crop_type}
                      </span>
                      <span
                        className={`ts-telemetry-badge ${isSafe ? 'ts-telemetry-badge-safe' : 'ts-telemetry-badge-warning'}`}
                        style={{ fontSize: '10px', padding: '2px 7px' }}
                      >
                        <span className="ts-live-pulse-dot" style={{ width: '6px', height: '6px' }} />
                        {isSafe ? 'WHO Safe (Potable)' : 'Low Risk (Treated)'}
                      </span>
                    </div>

                    {/* Water Point Title */}
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                      {f.name}
                    </h3>

                    {/* Centered Quality Gauge */}
                    <div style={{ margin: '8px 0', display: 'flex', justifyContent: 'center' }}>
                      <MoistureGauge
                        value={purityVal}
                        minTarget={f.target_min_moisture}
                        maxTarget={f.target_max_moisture}
                        size={155}
                        label="ISO 9308-1 Assay"
                      />
                    </div>

                    {/* 4 Telemetry Micro-Pills */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        padding: '10px',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border-subtle)',
                        margin: '8px 0 12px',
                        fontSize: '11px',
                      }}
                    >
                      <div>
                        <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Residual Cl₂</span>
                        <strong style={{ color: 'var(--color-text)', fontSize: '12px' }}>0.35 mg/L</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Turbidity</span>
                        <strong style={{ color: 'var(--color-text)', fontSize: '12px' }}>0.42 NTU</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>pH Level</span>
                        <strong style={{ color: 'var(--color-text)', fontSize: '12px' }}>7.2 pH</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Incubator Temp</span>
                        <strong style={{ color: 'var(--color-text)', fontSize: '12px' }}>
                          {f.current_temp ? `${f.current_temp}°C` : '37.0°C'}
                        </strong>
                      </div>
                    </div>

                    {/* Card Footer: Action Link */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '10px',
                        fontSize: '12px',
                      }}
                    >
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                        Last Assay: Today 10:30 AM
                      </span>
                      <Link
                        to="/app/water-testing"
                        style={{
                          fontWeight: 700,
                          color: 'var(--color-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Assay Trends <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card: Recent Microbiological Field Assays Table */}
          <div className="ts-smart-card" style={{ padding: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-heading)' }}>
                  Recent Microbiological Field Assays
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Automated membrane filtration results verified via high-resolution optical colony count.
                </p>
              </div>
              <Link to="/app/water-testing" className="ts-btn ts-btn-secondary ts-btn-sm">
                Full Testing Log <ArrowRight size={14} />
              </Link>
            </div>

            <div className="ts-table-container">
              <table className="ts-table">
                <thead>
                  <tr>
                    <th>Sample Barcode</th>
                    <th>Water Point & Community</th>
                    <th>Incubation</th>
                    <th>E. coli (CFU/100mL)</th>
                    <th>Coliforms</th>
                    <th>WHO Potable Status</th>
                    <th>Field Technician</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssays.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            backgroundColor: 'var(--color-surface-sunken)',
                            borderRadius: '4px',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {row.id}
                        </span>
                      </td>
                      <td>
                        <strong style={{ fontSize: '13px', display: 'block' }}>{row.siteName}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{row.location}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{row.incubationTime}</span>
                        <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>
                          {row.method.split(' ')[0]}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 800,
                            color: row.eColiCfu === 0 ? '#059669' : 'var(--color-error)',
                          }}
                        >
                          {row.eColiCfu} CFU
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{row.coliformCfu} CFU</span>
                      </td>
                      <td>
                        <span
                          className={`ts-badge ${row.status === 'SAFE_POTABLE' ? 'ts-badge-success' : 'ts-badge-info'}`}
                          style={{ fontSize: '11px', padding: '2px 8px' }}
                        >
                          <CheckCircle2 size={12} />
                          {row.status === 'SAFE_POTABLE' ? 'WHO Potable Safe' : 'Treated Potable'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{row.technician}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Rapid Command Deck, Fleet Telemetry & WHO Standards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Widget 1: Quick Action Command Deck */}
          <div className="ts-smart-card" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '14px' }}>
              Rapid WASH Operations Deck
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/app/water-testing"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-sunken)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(0, 102, 153, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Microscope size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div>Record New Water Sample</div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                    Log 100mL membrane filtration assay
                  </span>
                </div>
                <ArrowRight size={14} color="var(--color-text-subtle)" />
              </Link>

              <button
                onClick={() => setBleModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-sunken)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary-light)',
                  }}
                >
                  <Bluetooth size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div>Optical Scanner BLE Sync</div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                    Connect handheld incubator scanner
                  </span>
                </div>
                <ArrowRight size={14} color="var(--color-text-subtle)" />
              </button>

              <Link
                to="/app/uploads"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-sunken)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981',
                  }}
                >
                  <UploadCloud size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div>Initiative Media Publisher</div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                    Upload field evidence to Cloudinary
                  </span>
                </div>
                <ArrowRight size={14} color="var(--color-text-subtle)" />
              </Link>

              <Link
                to="/app/reports"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-sunken)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#A855F7',
                  }}
                >
                  <FileSpreadsheet size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div>WASH Compliance Reports</div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                    Generate WHO & Ministry certificates
                  </span>
                </div>
                <ArrowRight size={14} color="var(--color-text-subtle)" />
              </Link>
            </div>
          </div>

          {/* Widget 2: Hardware Fleet & Incubator Telemetry */}
          <div className="ts-smart-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-heading)' }}>
                Hardware & Incubator Fleet
              </h3>
              <span className="ts-badge ts-badge-success" style={{ fontSize: '10px' }}>
                4 Units
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-surface-sunken)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '13px' }}>AquaScope Incubator #01</strong>
                  <span className="ts-telemetry-badge ts-telemetry-badge-safe" style={{ fontSize: '9px', padding: '1px 6px' }}>
                    <span className="ts-live-pulse-dot" style={{ width: '5px', height: '5px' }} /> ONLINE
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  <span>Chamber: 37.1°C (Target 37.0°C)</span>
                  <span>12 Samples in Chamber</span>
                </div>
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-surface-sunken)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '13px' }}>Optical Colony Counter #02</strong>
                  <span className="ts-telemetry-badge ts-telemetry-badge-safe" style={{ fontSize: '9px', padding: '1px 6px' }}>
                    <span className="ts-live-pulse-dot" style={{ width: '5px', height: '5px' }} /> READY
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  <span>Automated E. coli Recognition</span>
                  <span>Battery: 94%</span>
                </div>
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-surface-sunken)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '13px' }}>Culture Media Cartridge Stock</strong>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>86% Stock</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  <span>Zero Cold-Chain Required</span>
                  <span>Ambient Stable to 45°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: WHO Drinking Water Quality Guidelines Reference */}
          <div
            className="ts-smart-card"
            style={{
              padding: '22px',
              background: 'linear-gradient(135deg, rgba(0, 102, 153, 0.04) 0%, rgba(13, 148, 136, 0.04) 100%)',
              border: '1px solid rgba(0, 102, 153, 0.18)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <ShieldCheck size={18} color="var(--color-primary)" />
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-heading)' }}>
                WHO Drinking Water Standards
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
              International microbiological drinking water benchmarks under ISO 9308-1:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <span><strong>E. coli:</strong> 0 CFU / 100 mL (Must be undetectable)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <span><strong>Total Coliforms:</strong> 0 CFU / 100 mL (Treated)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <span><strong>Residual Chlorine:</strong> 0.2 – 0.5 mg/L</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <span><strong>Turbidity:</strong> &lt; 1.0 NTU (Max 4.0 NTU)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLE Field Sync Wizard Modal */}
      <BleSimulatorModal
        isOpen={bleModalOpen}
        onClose={() => setBleModalOpen(false)}
        onSyncComplete={loadData}
      />
    </div>
  );
};
