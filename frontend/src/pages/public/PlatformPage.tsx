import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Cpu,
  Wifi,
  Droplets,
  Bell,
  FileSpreadsheet,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Database,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const PlatformPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '64px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="ts-badge ts-badge-success" style={{ marginBottom: '16px' }}>
            {t('platform.badge')}
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
            {t('platform.title')}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '780px', margin: '0 auto' }}>
            {t('platform.subtitle')}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {[
            {
              icon: Layers,
              title: t('platform.pillar1Title'),
              desc: t('platform.pillar1Desc'),
              points: [
                t('platform.pillar1Pt1'),
                t('platform.pillar1Pt2'),
                t('platform.pillar1Pt3'),
              ],
            },
            {
              icon: Wifi,
              title: t('platform.pillar2Title'),
              desc: t('platform.pillar2Desc'),
              points: [
                t('platform.pillar2Pt1'),
                t('platform.pillar2Pt2'),
                t('platform.pillar2Pt3'),
              ],
            },
            {
              icon: Droplets,
              title: t('platform.pillar3Title'),
              desc: t('platform.pillar3Desc'),
              points: [
                t('platform.pillar3Pt1'),
                t('platform.pillar3Pt2'),
                t('platform.pillar3Pt3'),
              ],
            },
            {
              icon: Bell,
              title: t('platform.pillar4Title'),
              desc: t('platform.pillar4Desc'),
              points: [
                t('platform.pillar4Pt1'),
                t('platform.pillar4Pt2'),
                t('platform.pillar4Pt3'),
              ],
            },
            {
              icon: FileSpreadsheet,
              title: t('platform.pillar5Title'),
              desc: t('platform.pillar5Desc'),
              points: [
                t('platform.pillar5Pt1'),
                t('platform.pillar5Pt2'),
                t('platform.pillar5Pt3'),
              ],
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="ts-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '32px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-primary-subtle)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text)', marginBottom: '12px' }}>
                    {item.title}
                  </h2>
                  <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{ backgroundColor: 'var(--color-bg)', padding: '24px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {t('platform.keySpecs')}
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--color-text)' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-surface)', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
          {t('platform.ctaTitle')}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
          <Link to="/app" className="ts-btn ts-btn-primary ts-btn-lg">
            {t('platform.exploreDash')} <ArrowRight size={18} />
          </Link>
          <Link to="/products" className="ts-btn ts-btn-secondary ts-btn-lg">
            {t('platform.browseSensors')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
