import React, { useState } from 'react';
import { Settings, Key, Globe, Shield, Save, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSelector } from '../../components/LanguageSelector';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [units, setUnits] = useState<'METRIC' | 'IMPERIAL'>('METRIC');
  const [timezone, setTimezone] = useState('Africa/Addis_Ababa');
  const [apiKey, setApiKey] = useState('ts_live_9f83b271a04e4c28bb921');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const generateNewKey = () => {
    setApiKey(`ts_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
          {t('settings.title')}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
          {t('settings.subtitle')}
        </p>
      </div>

      {saved && (
        <div className="ts-alert-banner ts-alert-banner-success">
          <Check size={18} /> {t('settings.savedSuccess')}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Profile Card */}
        <div className="ts-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
            User Account &amp; Organization
          </h3>
          <div className="ts-form-group">
            <label className="ts-label">{t('settings.accountName')}</label>
            <input type="text" disabled value={user?.fullName || '[Farm Manager Name]'} className="ts-input" />
          </div>
          <div className="ts-form-group">
            <label className="ts-label">{t('settings.email')}</label>
            <input type="email" disabled value={user?.email || 'farmer@example.com'} className="ts-input" />
          </div>
          <div className="ts-form-group">
            <label className="ts-label">{t('settings.role')}</label>
            <input type="text" disabled value={user?.role || 'FARM_MANAGER'} className="ts-input" />
          </div>
        </div>

        {/* Units & Localization */}
        <div className="ts-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--color-primary)" />
            Units &amp; Regional Localization
          </h3>

          <div className="ts-form-group" style={{ marginBottom: '20px' }}>
            <label className="ts-label">{t('settings.language')}</label>
            <div style={{ marginTop: '8px' }}>
              <LanguageSelector />
            </div>
          </div>

          <div className="ts-form-group">
            <label className="ts-label">{t('settings.units')}</label>
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="radio"
                  name="unit_standard"
                  checked={units === 'METRIC'}
                  onChange={() => setUnits('METRIC')}
                />
                <strong>Metric System</strong> (mm water, °C temp, hectares)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="radio"
                  name="unit_standard"
                  checked={units === 'IMPERIAL'}
                  onChange={() => setUnits('IMPERIAL')}
                />
                <strong>US Customary</strong> (inches water, °F temp, acres)
              </label>
            </div>
          </div>

          <div className="ts-form-group" style={{ marginTop: '16px' }}>
            <label className="ts-label">Primary Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="ts-select"
            >
              <option value="Africa/Addis_Ababa">East Africa Time (EAT - UTC+3)</option>
              <option value="America/Los_Angeles">Pacific Time (US &amp; Canada)</option>
              <option value="America/Chicago">Central Time (US &amp; Canada)</option>
              <option value="America/New_York">Eastern Time (US &amp; Canada)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
            </select>
          </div>
        </div>

        {/* Developer Telemetry API Ingestion Key */}
        <div className="ts-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} color="var(--color-primary)" />
            IoT Gateway Telemetry Key
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Used by physical Raspberry Pi and cellular field gateways to authenticate against <code>POST /api/telemetry/ingest</code>.
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              readOnly
              value={apiKey}
              className="ts-input"
              style={{ fontFamily: 'monospace', fontSize: '13px', flex: 1 }}
            />
            <button
              type="button"
              onClick={generateNewKey}
              className="ts-btn ts-btn-secondary ts-btn-sm"
            >
              Regenerate
            </button>
          </div>
        </div>

        <button type="submit" className="ts-btn ts-btn-primary ts-btn-lg" style={{ alignSelf: 'flex-start' }}>
          <Save size={18} /> {t('settings.saveSettings')}
        </button>
      </form>
    </div>
  );
};
