import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Layers,
  ArrowRight,
  Clock,
  Briefcase,
  Microscope,
  CheckCircle2,
  FileText,
  AlertCircle,
  Database,
  Sparkles,
  Cpu,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { technologyContent } from '../../data/technologyContent';

const pillarIcons = [
  Clock, // Rapid
  Briefcase, // Portable
  CheckCircle2, // Simple
  ShieldCheck, // Reliable
  Layers, // Robust
  Cpu, // Digital
  Sparkles, // Smart
  TrendingDown, // Affordable
  Database, // Data-Driven
];

export const TechnologyPage: React.FC = () => {
  const { language } = useLanguage();
  const content = technologyContent[language] || technologyContent.en;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Header Banner (Slide 4) */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#081426',
          backgroundImage: 'linear-gradient(135deg, rgba(8, 20, 38, 0.92) 0%, rgba(11, 37, 69, 0.94) 55%, rgba(6, 17, 33, 0.96) 100%), url("/images/waterscope-hero-nile.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '88px 24px 72px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(14, 165, 233, 0.16)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              fontSize: '13.5px',
              fontWeight: 700,
              marginBottom: '20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Microscope size={16} /> {content.headerBadge}
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            {content.headerTitle}
          </h1>

          <p
            style={{
              fontSize: '19px',
              color: '#CBD5E1',
              lineHeight: 1.65,
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {content.headerDesc}
          </p>
        </div>
      </section>

      {/* Slide 3: Structural Barriers & 6 Challenges */}
      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '36px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              <AlertCircle size={18} /> {content.barrierBadge}
            </div>

            <blockquote
              style={{
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--color-heading)',
                marginBottom: '16px',
                fontStyle: 'normal',
                fontWeight: 600,
              }}
            >
              &ldquo;{content.barrierQuote}&rdquo;
            </blockquote>

            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
              {content.barrierWho}
            </p>
          </div>

          {/* 6 Key Challenges Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {content.challenges.map((c, idx) => (
              <div
                key={idx}
                className="ts-card"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  borderTop: '3px solid var(--color-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={17} color="var(--color-primary)" />
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-heading)' }}>
                    {c.title}
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 5: The 9 Key Features of WaterScope System */}
      <section style={{ padding: '88px 24px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {content.pillarsTag}
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '16px' }}>
              {content.pillarsTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              {content.pillarsDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {content.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx] || CheckCircle2;
              return (
                <div
                  key={idx}
                  className="ts-card"
                  style={{
                    padding: '28px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '18px',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--color-primary-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-primary)',
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: 'var(--color-bg)',
                          color: 'var(--color-text-muted)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '10px' }}>
                      {pillar.title}
                    </h3>

                    <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Workflow Steps */}
      <section style={{ padding: '88px 24px', backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 64px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {content.sopBadge}
            </span>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '16px' }}>
              {content.sopTitle}
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              {content.sopDesc}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {content.stages.map((stage, idx) => (
              <div
                key={idx}
                className="ts-card"
                style={{
                  padding: '32px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '24px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)',
                  }}
                >
                  {stage.num}
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: 'var(--color-heading)',
                      marginBottom: '10px',
                    }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15.5px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7,
                      marginBottom: '14px',
                    }}
                  >
                    {stage.desc}
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--color-primary-subtle)',
                      color: 'var(--color-primary-dark)',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--color-primary)" />
                    {stage.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Workflow Comparison & Hardware Showcase */}
      <section style={{ padding: '80px 24px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Efficiency By Design
            </span>
            <h2 style={{ fontSize: '34px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '14px' }}>
              8 Minutes vs. 25 Minutes: Eliminating Laboratory Friction
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Conventional membrane filtration requires 11 sequential operations, flame sterilization with methanol, and fragile glass funnels. The WaterScope patented cartridge consolidates this into 7 simple steps in under 8 minutes.
            </p>
          </div>

          <div
            className="ts-card"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            <img
              src="/images/comparison-sample-processing.png"
              alt="Detailed side-by-side comparison between WaterScope 8-minute 7-step process and conventional 25-minute 11-step process"
              style={{ width: '100%', maxHeight: '550px', objectFit: 'contain', margin: '0 auto' }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            <div
              className="ts-card"
              style={{
                padding: '0',
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <img
                src="/images/waterscope-hero-nile.jpg"
                alt="WaterScope testing kit at Blue Nile River station"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Field Deployed at the Water Source</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Stationed directly at boreholes, springs, or rivers. Compact, portable, and deployable on-site as shown here by the Nile River in Bahir Dar.
                </p>
              </div>
            </div>

            <div
              className="ts-card"
              style={{
                padding: '0',
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <img
                src="/images/waterscope-training-field.jpg"
                alt="Technician filtering water with patented metal cartridge"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Patented Sealed Cartridge</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Pre-sterilized stainless-steel cartridge locks the 0.45µm membrane safely in place, preventing hand touch contamination without requiring sterile lab gloves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {content.specsBadge}
            </span>
            <h2 style={{ fontSize: '34px', fontWeight: 900, color: 'var(--color-heading)' }}>
              {content.specsTitle}
            </h2>
          </div>

          <div
            className="ts-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <table className="ts-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 20px', fontSize: '13.5px', fontWeight: 700 }}>{content.colParam}</th>
                  <th style={{ padding: '16px 20px', fontSize: '13.5px', fontWeight: 700 }}>{content.colSpec}</th>
                  <th style={{ padding: '16px 20px', fontSize: '13.5px', fontWeight: 700 }}>{content.colStandard}</th>
                </tr>
              </thead>
              <tbody>
                {content.specsRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{row.param}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-text-muted)' }}>{row.spec}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-primary)', fontWeight: 600 }}>{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Manuals & Resources CTA */}
      <section
        style={{
          padding: '72px 24px',
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: 'var(--color-primary-dark)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
            }}
          >
            <FileText size={28} />
          </div>

          <div>
            <h2 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '12px' }}>
              {content.docTitle}
            </h2>
            <p style={{ fontSize: '16px', color: '#94A9C0', maxWidth: '640px', lineHeight: 1.6 }}>
              {content.docDesc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/resources"
              className="ts-btn ts-btn-primary ts-btn-lg"
              style={{ backgroundColor: '#0EA5E9', color: '#0B2545', fontWeight: 700 }}
            >
              {content.docBtn1} <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="ts-btn ts-btn-secondary ts-btn-lg"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)' }}
            >
              {content.docBtn2}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechnologyPage;
