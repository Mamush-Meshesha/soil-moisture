import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Globe,
  Users,
  Microscope,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { aboutContent } from '../../data/aboutContent';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const content = aboutContent[language] || aboutContent.en;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '72px 24px 60px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-primary-subtle)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              color: 'var(--color-primary)',
              fontSize: '13.5px',
              fontWeight: 700,
              marginBottom: '20px',
            }}
          >
            <Compass size={16} /> {content.headerBadge}
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 900,
              color: 'var(--color-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '18px',
              lineHeight: 1.15,
            }}
          >
            {content.headerTitle}
          </h1>

          <p
            style={{
              fontSize: '19px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '760px',
              margin: '0 auto',
            }}
          >
            {content.headerDesc}
          </p>
        </div>
      </section>

      {/* Mission & Background Story */}
      <section style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div
            className="ts-card"
            style={{
              padding: '40px',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              {content.missionBadge}
            </span>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--color-heading)',
                marginBottom: '16px',
              }}
            >
              {content.missionTitle}
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--color-text-muted)',
                lineHeight: '1.75',
                marginBottom: '18px',
              }}
            >
              {content.missionP1}
            </p>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--color-text-muted)',
                lineHeight: '1.75',
              }}
            >
              {content.missionP2}
            </p>
          </div>

          {/* Visual Highlight Banner */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <img
                src="/images/hero-water-testing.jpg"
                alt="Community water point sanitation testing in progress"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Users size={20} color="var(--color-primary)" />
                  <h4 style={{ fontSize: '17px', fontWeight: 700 }}>{content.pillar1Title}</h4>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {content.pillar1Desc}
                </p>
              </div>

              <div
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <ShieldCheck size={20} color="var(--color-primary)" />
                  <h4 style={{ fontSize: '17px', fontWeight: 700 }}>{content.pillar2Title}</h4>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {content.pillar2Desc}
                </p>
              </div>

              <div
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Globe size={20} color="var(--color-primary)" />
                  <h4 style={{ fontSize: '17px', fontWeight: 700 }}>{content.pillar3Title}</h4>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {content.pillar3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Three Core Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="ts-card" style={{ padding: '28px' }}>
              <Compass size={28} color="var(--color-primary)" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>{content.val1Title}</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                {content.val1Desc}
              </p>
            </div>

            <div className="ts-card" style={{ padding: '28px' }}>
              <Microscope size={28} color="var(--color-primary)" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>{content.val2Title}</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                {content.val2Desc}
              </p>
            </div>

            <div className="ts-card" style={{ padding: '28px' }}>
              <HeartHandshake size={28} color="var(--color-primary)" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>{content.val3Title}</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                {content.val3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          padding: '72px 24px',
          backgroundColor: 'var(--color-primary-dark)',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '34px', fontWeight: 800, marginBottom: '14px' }}>
            {content.ctaTitle}
          </h2>
          <p style={{ fontSize: '17px', color: '#94A9C0', lineHeight: 1.6, marginBottom: '28px' }}>
            {content.ctaDesc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="ts-btn ts-btn-primary ts-btn-lg">
              {content.ctaBtn1} <ArrowRight size={18} />
            </Link>
            <Link
              to="/our-work"
              className="ts-btn ts-btn-secondary ts-btn-lg"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)' }}
            >
              {content.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
