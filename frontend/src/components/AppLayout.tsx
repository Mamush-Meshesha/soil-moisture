import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Trees,
  Grid,
  Cpu,
  Waves,
  LineChart,
  Droplets,
  Bell,
  FileSpreadsheet,
  Wrench,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bluetooth,
  Sprout,
  Sun,
  Moon,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import { Farm, Alert } from '../types';
import { BleSimulatorModal } from './BleSimulatorModal';
import { LanguageSelector } from './LanguageSelector';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string>('');
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [bleModalOpen, setBleModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFarmsAndAlerts() {
      try {
        const { farms } = await api.getFarms();
        setFarms(farms);
        if (farms.length > 0 && !selectedFarmId) {
          setSelectedFarmId(farms[0].id);
        }
        const { alerts } = await api.getAlerts({ status: 'ACTIVE' });
        setActiveAlerts(alerts);
      } catch (err) {
        console.error('Failed to load layout data:', err);
      }
    }
    loadFarmsAndAlerts();
  }, []);


  const navItems = [
    { label: t('app.overview'), path: '/app', icon: LayoutDashboard },
    { label: t('app.soilMonitoring'), path: '/app/soil-monitoring', icon: Waves },
    { label: t('app.farms'), path: '/app/farms', icon: Trees },
    { label: t('app.fieldsCrops'), path: '/app/fields', icon: Grid },
    { label: t('app.devices'), path: '/app/devices', icon: Cpu },
    { label: t('app.analytics'), path: '/app/analytics', icon: LineChart },
    { label: t('app.irrigation'), path: '/app/irrigation', icon: Droplets },
    { label: t('app.alerts'), path: '/app/alerts', icon: Bell, badge: activeAlerts.length },
    { label: t('app.reports'), path: '/app/reports', icon: FileSpreadsheet },
    { label: t('app.maintenance'), path: '/app/maintenance', icon: Wrench },
    { label: t('app.team'), path: '/app/team', icon: Users },
    { label: t('app.settings'), path: '/app/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? '72px' : '260px',
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width var(--transition-normal)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            height: '68px',
            padding: collapsed ? '0 16px' : '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <Link to="/app" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <Sprout size={22} />
            </div>
            {!collapsed && (
              <div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                  [Platform Name]
                </span>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {t('nav.farmPortal').toUpperCase()}
                </span>
              </div>
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              title={t('app.collapseSidebar')}
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* Collapsed Toggle Button when small */}
        {collapsed && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <button
              onClick={() => setCollapsed(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              title={t('app.expandSidebar')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav style={{ padding: '12px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: collapsed ? '10px 0' : '10px 14px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                  color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                  transition: 'all var(--transition-fast)',
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={19} color={isActive ? 'var(--color-primary)' : 'currentColor'} style={{ flexShrink: 0 }} />
                {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="ts-badge ts-badge-warning" style={{ padding: '2px 6px', fontSize: '11px' }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Link to Public Website */}
        <div style={{ padding: '12px', borderTop: '1px solid var(--color-border)' }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
          >
            <ExternalLink size={16} />
            {!collapsed && <span>{t('nav.home')}</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: '68px',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          {/* Farm Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{t('overview.selectFarm')}:</span>
            <select
              value={selectedFarmId}
              onChange={(e) => setSelectedFarmId(e.target.value)}
              className="ts-select"
              style={{ padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}
            >
              {farms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.location})
                </option>
              ))}
            </select>
          </div>

          {/* Top Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Selector */}
            <LanguageSelector />

            {/* BLE Field Sync Wizard Button */}
            <button
              onClick={() => setBleModalOpen(true)}
              className="ts-btn ts-btn-secondary ts-btn-sm"
              title={t('app.bleSync')}
            >
              <Bluetooth size={16} color="var(--color-primary)" />
              <span>{t('app.bleSync')}</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
              }}
              title={t('app.toggleTheme')}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            {/* User Profile Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', borderLeft: '1px solid var(--color-border)' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text)' }}>
                  {user?.fullName || 'Farm User'}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>
                  {user?.role || 'FARM_MANAGER'}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  padding: '4px',
                }}
                title={t('nav.logout')}
              >
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Body Viewport */}
        <main style={{ padding: '28px', flex: 1, minWidth: 0 }}>
          <Outlet context={{ selectedFarmId }} />
        </main>
      </div>

      {/* Bluetooth BLE Field Sync Modal */}
      <BleSimulatorModal
        isOpen={bleModalOpen}
        onClose={() => setBleModalOpen(false)}
        onSyncComplete={() => {
          // Trigger reload if needed
        }}
      />
    </div>
  );
};
