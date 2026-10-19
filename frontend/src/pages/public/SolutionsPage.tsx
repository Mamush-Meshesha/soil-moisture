import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Sprout, Building2, Droplet, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const SolutionsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '64px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="ts-badge ts-badge-success" style={{ marginBottom: '16px' }}>
            {t('solutions.badge')}
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
            {t('public.solutionsTitle')}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
            {t('solutions.heroDesc')}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {[
            {
              icon: Sprout,
              title: t('solutions.c1Title'),
              desc: t('solutions.c1Desc'),
              benefits: [
                t('solutions.c1b1'),
                t('solutions.c1b2'),
                t('solutions.c1b3'),
              ],
            },
            {
              icon: Trees,
              title: t('solutions.c2Title'),
              desc: t('solutions.c2Desc'),
              benefits: [
                t('solutions.c2b1'),
                t('solutions.c2b2'),
                t('solutions.c2b3'),
              ],
            },
            {
              icon: Building2,
              title: t('solutions.c3Title'),
              desc: t('solutions.c3Desc'),
              benefits: [
                t('solutions.c3b1'),
                t('solutions.c3b2'),
                t('solutions.c3b3'),
              ],
            },
            {
              icon: Droplet,
              title: t('solutions.c4Title'),
              desc: t('solutions.c4Desc'),
              benefits: [
                t('solutions.c4b1'),
                t('solutions.c4b2'),
                t('solutions.c4b3'),
              ],
            },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="ts-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-primary-subtle)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                    {s.desc}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    {s.benefits.map((b, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={15} color="var(--color-primary)" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                  <Link to="/contact" className="ts-btn ts-btn-secondary ts-btn-sm" style={{ width: '100%' }}>
                    {t('solutions.requestBrief')} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};
