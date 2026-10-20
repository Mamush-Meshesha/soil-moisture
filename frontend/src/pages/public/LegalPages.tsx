import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section style={{ maxWidth: '840px', margin: '56px auto', padding: '0 24px', flex: 1 }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '16px' }}>
          Water Quality Data Privacy &amp; Ownership
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '28px' }}>
          Last updated: October 2026
        </p>
        <div className="ts-card" style={{ lineHeight: '1.8', fontSize: '15px', color: 'var(--color-text)', padding: '36px', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>1. Water Quality Data Ownership</h3>
          <p>
            All microbiological test results, sample coordinates, raw optical colony imagery, and water point metadata uploaded to the AquaScope platform remain the exclusive property of the sampling institution, NGO, utility, or community health authority.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '24px', marginBottom: '8px' }}>2. Telemetry &amp; Public Health Governance</h3>
          <p>
            We collect water testing telemetry solely to compute colony counts, generate safety risk classifications under WHO guidelines, and provide traceable records. Identifiable water source records are never sold or commercialized. Aggregated public health data may be shared with authorized environmental health ministries to support sanitary remediation.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '24px', marginBottom: '8px' }}>3. Data Export &amp; Audit Trail</h3>
          <p>
            Authorized operators can export raw CFU measurements, calibration records, and high-resolution annotated colony photos at any time in standard CSV and JSON formats without restriction.
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
      <section style={{ maxWidth: '840px', margin: '56px auto', padding: '0 24px', flex: 1 }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '16px' }}>
          Terms of Service &amp; Testing Scope
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '28px' }}>
          Last updated: October 2026
        </p>
        <div className="ts-card" style={{ lineHeight: '1.8', fontSize: '15px', color: 'var(--color-text)', padding: '36px', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>1. Microbiological Testing Scope</h3>
          <p>
            AquaScope testing equipment is calibrated specifically for the detection and enumeration of fecal indicator bacteria (total coliforms and Escherichia coli) in drinking water following membrane filtration methods. The system does not test for chemical contaminants, toxic heavy metals, or viruses, which require separate analytical protocols.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '24px', marginBottom: '8px' }}>2. Sanitary Advisory &amp; Field Intervention</h3>
          <p>
            Water safety results provided by the system are intended to inform sanitary decisions, boil-water advisories, and chlorination treatments. Field technicians and public health authorities remain responsible for verifying critical infrastructure and issuing drinking water clearances.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '24px', marginBottom: '8px' }}>3. Equipment Warranty &amp; Consumables Integrity</h3>
          <p>
            Hardware units include a standard 2-year warranty covering motorized pump mechanisms, incubator electronics, and optical cameras. Sterile filtration sliders and nutrient broth pads must be stored in accordance with product specifications to ensure microbiological viability.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
