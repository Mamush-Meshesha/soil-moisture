import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Bluetooth,
  Wifi,
  Database,
  Shield,
  Layers,
  ArrowRight,
  Code,
  HardDrive,
  FileCheck,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const TechnologyPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '64px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="ts-badge ts-badge-success" style={{ marginBottom: '16px' }}>
            {t('tech.badge')}
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
            {t('public.techTitle')}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '780px', margin: '0 auto' }}>
            {t('tech.heroDesc')}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Sensor Physics */}
          <div className="ts-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Layers size={26} color="var(--color-primary)" />
              <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{t('tech.sec1Title')}</h2>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
              {t('tech.sec1Desc')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', backgroundColor: 'var(--color-surface-sunken)', padding: '16px', borderRadius: '8px' }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--color-text)' }}>{t('tech.mMetric')}</strong>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{t('tech.mMetricVal')}</div>
              </div>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--color-text)' }}>{t('tech.mTemp')}</strong>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{t('tech.mTempVal')}</div>
              </div>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--color-text)' }}>{t('tech.mEc')}</strong>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{t('tech.mEcVal')}</div>
              </div>
            </div>
          </div>

          {/* Industrial Interfaces */}
          <div className="ts-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Cpu size={26} color="var(--color-primary)" />
              <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{t('tech.sec2Title')}</h2>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
              {t('tech.sec2Desc')}
            </p>
            <pre style={{ backgroundColor: 'var(--color-primary-dark)', color: '#FFFFFF', padding: '16px', borderRadius: '8px', fontSize: '13px', overflowX: 'auto', fontFamily: 'monospace' }}>
{`// Example SDI-12 Sensor Command / Response Sequence
Tx: "0M!"      // Address 0, Start Measurement
Rx: "00025"    // Takes 2 seconds, returns 5 parameters
Tx: "0D0!"     // Request Data Block 0
Rx: "0+28.4+21.3+1.15+31.8+19.8" // [10cm VWC, 10cm Temp, 10cm EC, 20cm VWC, 20cm Temp]`}
            </pre>
          </div>

          {/* Bluetooth Low Energy & Offline Spooling */}
          <div className="ts-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Bluetooth size={26} color="var(--color-primary)" />
              <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{t('tech.sec3Title')}</h2>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
              {t('tech.sec3Desc')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{t('tech.uuidTitle')}</h4>
                <code style={{ fontSize: '12px', color: 'var(--color-primary)' }}>6E400001-B5A3-F393-E0A9-E50E24DCCA9E</code>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                  {t('tech.uuidDesc')}
                </p>
              </div>
              <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{t('tech.idemTitle')}</h4>
                <code style={{ fontSize: '12px', color: 'var(--color-primary)' }}>X-Idempotency-Key Header</code>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                  {t('tech.idemDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-surface)', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
          {t('tech.ctaTitle')}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
          <Link to="/products" className="ts-btn ts-btn-primary ts-btn-lg">
            {t('tech.ctaCatalog')} <ArrowRight size={18} />
          </Link>
          <Link to="/resources" className="ts-btn ts-btn-secondary ts-btn-lg">
            {t('tech.ctaManuals')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
