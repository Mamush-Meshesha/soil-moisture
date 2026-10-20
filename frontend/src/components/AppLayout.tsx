import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
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
  Sun,
  Moon,
  ExternalLink,
  Globe,
  ShoppingBag,
  UploadCloud,
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
        // Keep selectedFarmId as '' by default to display all monitored facilities
        const { alerts } = await api.getAlerts({ status: 'ACTIVE' });
        setActiveAlerts(alerts);
      } catch (err) {
        console.error('Failed to load layout data:', err);
      }
    }
    loadFarmsAndAlerts();
  }, []);


  const navSections = [
    {
      title: 'Operations & Telemetry',
      items: [
        { label: t('app.overview'), path: '/app', icon: LayoutDashboard },
        { label: t('app.waterTesting') || 'Water Quality Testing', path: '/app/water-testing', icon: Waves },
        { label: t('app.fieldsCrops'), path: '/app/fields', icon: Grid },
        { label: t('app.farms'), path: '/app/farms', icon: MapPin },
        { label: t('app.devices'), path: '/app/devices', icon: Cpu },
        { label: t('app.analytics'), path: '/app/analytics', icon: LineChart },
        { label: t('app.alerts'), path: '/app/alerts', icon: Bell, badge: activeAlerts.length },
        { label: t('app.reports'), path: '/app/reports', icon: FileSpreadsheet },
      ],
    },
    {
      title: 'Publishing & Content',
      items: [
        { label: 'Initiative Publisher', path: '/app/uploads', icon: UploadCloud, badgeText: 'Cloudinary' },
        { label: t('app.projects'), path: '/app/projects', icon: Globe },
        { label: t('app.storeManage'), path: '/app/store-management', icon: ShoppingBag },
      ],
    },
    {
      title: 'Administration',
      items: [
        { label: t('app.team'), path: '/app/team', icon: Users },
        { label: t('app.maintenance'), path: '/app/maintenance', icon: Wrench },
        { label: t('app.settings'), path: '/app/settings', icon: Settings },
      ],
    },
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
              <Droplets size={22} />
            </div>
            {!collapsed && (
              <div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                  AquaScope
                </span>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '0.06em' }}>
                  WATER SAFETY PORTAL
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

        {/* Navigation Items Organized by Section */}
        <nav style={{ padding: '14px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navSections.map((section, sIdx) => (
            <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {!collapsed && (
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-muted)',
                    padding: '4px 12px 4px',
                    textTransform: 'uppercase',
                    opacity: 0.85,
                  }}
                >
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
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
                      padding: collapsed ? '10px 0' : '9px 12px',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                      color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                      transition: 'all var(--transition-fast)',
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={18} color={isActive ? 'var(--color-primary)' : 'currentColor'} style={{ flexShrink: 0 }} />
                    {!collapsed && <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>}
                    {!collapsed && (item as any).badgeText && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          color: '#10B981',
                        }}
                      >
                        {(item as any).badgeText}
                      </span>
                    )}
                    {!collapsed && (item as any).badge !== undefined && (item as any).badge > 0 && (
                      <span className="ts-badge ts-badge-warning" style={{ padding: '2px 6px', fontSize: '11px' }}>
                        {(item as any).badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
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
          {/* Community / District Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <MapPin size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                District:
              </span>
              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  paddingRight: '6px',
                }}
              >
                <option value="">All Monitored Districts ({farms.length})</option>
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.location})
                  </option>
                ))}
              </select>
            </div>
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
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Bluetooth size={15} color="var(--color-primary)" />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Optical Scanner BLE</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--transition-fast)',
              }}
              title={t('app.toggleTheme')}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* User Profile Menu */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingLeft: '12px',
                borderLeft: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 102, 153, 0.25)',
                }}
              >
                {user?.fullName ? user.fullName.split(' ').map(w => w[0]).filter(c => /[A-Za-z]/.test(c)).slice(0, 2).join('') || 'SK' : 'SK'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.2 }}>
                  {user?.fullName?.replace(/\[|\]/g, '') || 'Dr. Sarah Kibet'}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {user?.role === 'PLATFORM_ADMIN'
                    ? 'Platform Administrator'
                    : user?.role === 'FARM_MANAGER'
                    ? 'WASH Program Lead'
                    : 'Water Microbiologist'}
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
                  color: 'var(--color-text-subtle)',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '4px',
                  transition: 'color var(--transition-fast)',
                }}
                title={t('nav.logout')}
              >
                <LogOut size={16} />
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
