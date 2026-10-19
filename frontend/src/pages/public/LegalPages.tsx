import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section style={{ maxWidth: '840px', margin: '48px auto', padding: '0 24px', flex: 1 }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
          {t('public.legalPrivacy')} &amp; Farm Data Ownership
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Last updated: October 2026
        </p>
        <div className="ts-card" style={{ lineHeight: '1.8', fontSize: '15px', color: 'var(--color-text)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>1. Grower Data Ownership</h3>
          <p>
            All volumetric soil moisture readings, farm boundary coordinates, crop classifications, and irrigation event logs uploaded to the [Platform Name] platform remain the exclusive property of the grower or agricultural subscriber.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>2. Data Collection &amp; Telemetry Usage</h3>
          <p>
            We collect telemetry strictly to calculate root-zone moisture metrics, evaluate alert thresholds, and provide irrigation scheduling guidance. We do not monetize or sell identifiable farm data to commodity brokers, chemical vendors, or third parties.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>3. Data Export &amp; Portability</h3>
          <p>
            Subscribers can export raw time-series data at any time in standard CSV format without restriction.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section style={{ maxWidth: '840px', margin: '48px auto', padding: '0 24px', flex: 1 }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
          {t('public.legalTerms')}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Last updated: October 2026
        </p>
        <div className="ts-card" style={{ lineHeight: '1.8', fontSize: '15px', color: 'var(--color-text)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>1. Advisory Nature of Irrigation Guidance</h3>
          <p>
            [Platform Name] provides advisory water management calculations based on dielectric soil readings and user-provided soil texture thresholds. Farm operators remain solely responsible for physical irrigation valve operation and equipment safety.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>2. Hardware Warranty &amp; Calibration</h3>
          <p>
            Probes are calibrated for standard agricultural soils (loam, sand, clay). Subscriptions include access to cloud telemetry ingestion and mobile BLE synchronization tools.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};
