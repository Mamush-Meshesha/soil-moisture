import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Wrench, HelpCircle, Code, FileText, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const ResourcesPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '64px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="ts-badge ts-badge-success" style={{ marginBottom: '16px' }}>
            {t('resources.badge')}
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
            {t('resources.title')}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
            {t('resources.subtitle')}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Soil Fundamentals Table */}
          <div className="ts-card">
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={22} color="var(--color-primary)" />
              {t('resources.tableTitle')}
            </h2>
            <div className="ts-table-container">
              <table className="ts-table">
                <thead>
                  <tr>
                    <th>{t('resources.colState')}</th>
                    <th>{t('resources.colVwc')}</th>
                    <th>{t('resources.colInterp')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: 'var(--color-info)' }}>{t('resources.satTitle')}</strong></td>
                    <td>&gt; 38% – 45%</td>
                    <td>{t('resources.satDesc')}</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: 'var(--color-primary)' }}>{t('resources.fcTitle')}</strong></td>
                    <td>28% – 36%</td>
                    <td>{t('resources.fcDesc')}</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: 'var(--color-warning)' }}>{t('resources.madTitle')}</strong></td>
                    <td>18% – 24%</td>
                    <td>{t('resources.madDesc')}</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: 'var(--color-error)' }}>{t('resources.pwpTitle')}</strong></td>
                    <td>&lt; 14% – 16%</td>
                    <td>{t('resources.pwpDesc')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Installation Manual Summary */}
          <div className="ts-card">
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wrench size={22} color="var(--color-primary)" />
              {t('resources.stepTitle')}
            </h2>
            <ol style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>{t('resources.step1')}</li>
              <li>{t('resources.step2')}</li>
              <li>{t('resources.step3')}</li>
              <li>{t('resources.step4')}</li>
              <li>{t('resources.step5')}</li>
            </ol>
          </div>

          {/* FAQ Accordion Section */}
          <div className="ts-card">
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HelpCircle size={22} color="var(--color-primary)" />
              {t('resources.faqTitle')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  q: t('resources.faq1Q'),
                  a: t('resources.faq1A'),
                },
                {
                  q: t('resources.faq2Q'),
                  a: t('resources.faq2A'),
                },
                {
                  q: t('resources.faq3Q'),
                  a: t('resources.faq3A'),
                },
              ].map((faq, fIdx) => (
                <div key={fIdx} style={{ padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
