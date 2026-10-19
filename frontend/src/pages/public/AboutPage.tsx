import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Compass, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '64px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <span className="ts-badge ts-badge-success" style={{ marginBottom: '16px' }}>
            {t('about.badge')}
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
            {t('public.aboutTitle')}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
            {t('about.heroDesc')}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="ts-card">
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
              {t('about.challengeTitle')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
              {t('about.challengeP1')}
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
              {t('about.challengeP2')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div className="ts-card">
              <Compass size={24} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{t('about.val1Title')}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                {t('about.val1Desc')}
              </p>
            </div>

            <div className="ts-card">
              <ShieldCheck size={24} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{t('about.val2Title')}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                {t('about.val2Desc')}
              </p>
            </div>

            <div className="ts-card">
              <HeartHandshake size={24} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{t('about.val3Title')}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                {t('about.val3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
