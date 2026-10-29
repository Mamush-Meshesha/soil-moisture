import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  TrendingDown,
  Layers,
  Shield,
  Briefcase,
  ArrowRight,
  Handshake,
  Wrench,
  Mail,
  Cpu,
  GraduationCap,
  Award,
  Globe2,
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

      {/* Hero Banner (Slide 6) */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#081426',
          backgroundImage: 'linear-gradient(135deg, rgba(8, 20, 38, 0.92) 0%, rgba(11, 37, 69, 0.94) 55%, rgba(6, 17, 33, 0.96) 100%), url("/images/waterscope-training-field.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '88px 24px 72px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
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
            <Users size={16} /> {content.headerBadge}
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              marginBottom: '18px',
              lineHeight: 1.15,
            }}
          >
            {content.headerTitle}
          </h1>

          <p
            style={{
              fontSize: '18.5px',
              color: '#CBD5E1',
              lineHeight: 1.7,
              maxWidth: '820px',
              margin: '0 auto',
            }}
          >
            {content.headerDesc}
          </p>
        </div>
      </section>

      {/* Mission & Public Health Challenge (Slide 2) */}
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
                color: 'var(--color-error)',
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

          {/* Slide 7: What Makes Us Different (4 Core Pillars) */}
          <div>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
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
                Systems Innovation Model
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-heading)' }}>
                What Makes Us Different
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              <div className="ts-card" style={{ padding: '28px' }}>
                <TrendingDown size={28} color="var(--color-primary)" style={{ marginBottom: '14px' }} />
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>{content.pillar1Title}</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                  {content.pillar1Desc}
                </p>
              </div>

              <div className="ts-card" style={{ padding: '28px' }}>
                <Layers size={28} color="var(--color-primary)" style={{ marginBottom: '14px' }} />
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>{content.pillar2Title}</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                  {content.pillar2Desc}
                </p>
              </div>

              <div className="ts-card" style={{ padding: '28px' }}>
                <Shield size={28} color="var(--color-primary)" style={{ marginBottom: '14px' }} />
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>{content.pillar3Title}</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                  {content.pillar3Desc}
                </p>
              </div>

              <div className="ts-card" style={{ padding: '28px' }}>
                <Briefcase size={28} color="var(--color-primary)" style={{ marginBottom: '14px' }} />
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>{content.pillar4Title}</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                  {content.pillar4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Early Progress: Manufacturing and Training */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
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
              Early Progress
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '16px' }}>
              {content.progressTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {content.progressDesc}
            </p>
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
                border: '1px solid var(--color-border)',
              }}
            >
              <img
                src="/images/manufacturing-3dprint.png"
                alt="3D printing of cartridge components at Seifu BiT Maker Space in Bahir Dar"
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                  <Wrench size={16} /> 3D Printing Technologies
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-heading)' }}>
                  Seifu BiT Maker Space
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Direct local fabrication of custom cartridge casings and pump chassis using 3D printing technologies, reducing costs by up to 80%.
                </p>
              </div>
            </div>

            <div
              className="ts-card"
              style={{
                padding: '0',
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
              }}
            >
              <img
                src="/images/manufacturing-cnc.png"
                alt="Precision CNC milling and quality assembly in Bahir Dar, Ethiopia"
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                  <Cpu size={16} /> Machining Technologies &amp; Assembly
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-heading)' }}>
                  BiTec Incubation Center
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Precision machining of stainless-steel cartridge filtration components and optical microscope alignment at Bahir Dar University.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Co-Founders (Slide 6) */}
      <section style={{ padding: '88px 24px', backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
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
              Leadership
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '14px' }}>
              Our Committed Team
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Young Ethiopian engineers building local diagnostic capacity and fostering African-led innovation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              maxWidth: '860px',
              margin: '0 auto',
            }}
          >
            {/* Yohannes Tamiru */}
            <div
              className="ts-card"
              style={{
                padding: '32px',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 20px',
                  border: '4px solid var(--color-primary-subtle)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src="/images/team-yohannes-tamiru.png"
                  alt="Yohannes Tamiru - CoFounder and Technical Lead"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '4px' }}>
                Yohannes Tamiru
              </h3>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '14px' }}>
                CoFounder and Technical Lead
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
                Co-founder of WaterScope Manufacturing. Leads hardware engineering, optical microscopy integration, and local manufacturing technologies.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-surface)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Mail size={14} color="var(--color-primary)" /> jotamiru112@gmail.com
              </div>
            </div>

            {/* Metmku Yohannes */}
            <div
              className="ts-card"
              style={{
                padding: '32px',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 20px',
                  border: '4px solid var(--color-primary-subtle)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src="/images/team-metmku-yohannes.png"
                  alt="Metmku Yohannes - CoFounder and Bussiness Lead"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '4px' }}>
                Metmku Yohannes
              </h3>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '14px' }}>
                CoFounder and Bussiness Lead
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
                Co-founder of WaterScope Manufacturing. Directs institutional partnerships, public health operations, and NGO collaborations.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-surface)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Mail size={14} color="var(--color-primary)" /> metmkujohn@gmail.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* waterscope.org: University of Cambridge Heritage & Scientific Founding */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Cambridge Banner */}
          <div
            style={{
              borderRadius: '24px',
              padding: '40px 36px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'center',
              marginBottom: '56px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(14, 165, 233, 0.12)',
                  color: 'var(--color-primary)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '14px',
                }}
              >
                <GraduationCap size={15} /> {content.cambridgeBadge}
              </div>
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 34px)',
                  fontWeight: 900,
                  color: 'var(--color-heading)',
                  marginBottom: '14px',
                  lineHeight: 1.25,
                }}
              >
                {content.cambridgeTitle}
              </h2>
              <p style={{ fontSize: '15.5px', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                {content.cambridgeDesc}
              </p>
            </div>

            <div
              className="ts-card"
              style={{
                padding: '28px',
                borderRadius: '18px',
                borderLeft: '4px solid var(--color-primary)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Award size={22} color="var(--color-primary)" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-heading)', margin: 0 }}>
                  {content.cambridgeFunding}
                </h3>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                {content.cambridgeFundingDesc}
              </p>
            </div>
          </div>

          {/* 3 Global Cambridge Founders */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
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
              Scientific Founders &bull; Cambridge Origin
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)', margin: 0 }}>
              Cambridge Founding Pioneers
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {/* Alexander Patto */}
            <div
              className="ts-card"
              style={{
                padding: '30px',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 18px',
                  border: '3px solid var(--color-primary-subtle)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src="/images/founder-alex-patto.png"
                  alt="Dr. Alexander Patto"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '4px' }}>
                {content.founder1Name}
              </h4>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '12px' }}>
                {content.founder1Role}
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {content.founder1Bio}
              </p>
            </div>

            {/* Sammy Mahdi */}
            <div
              className="ts-card"
              style={{
                padding: '30px',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 18px',
                  border: '3px solid var(--color-primary-subtle)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src="/images/founder-sammy-mahdi.png"
                  alt="Sammy Mahdi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '4px' }}>
                {content.founder2Name}
              </h4>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '12px' }}>
                {content.founder2Role}
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {content.founder2Bio}
              </p>
            </div>

            {/* Richard Bowman */}
            <div
              className="ts-card"
              style={{
                padding: '30px',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 18px',
                  border: '3px solid var(--color-primary-subtle)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src="/images/founder-richard-bowman.png"
                  alt="Dr. Richard Bowman"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '4px' }}>
                {content.founder3Name}
              </h4>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '12px' }}>
                {content.founder3Role}
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {content.founder3Bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: The Collaboration Invitation */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
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
              Academic Collaboration
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '16px' }}>
              {content.collabTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {content.collabDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            <div className="ts-card" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Handshake size={22} color="var(--color-primary)" />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-heading)' }}>
                  {content.collab1Title}
                </h4>
              </div>
              <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                {content.collab1Desc}
              </p>
            </div>

            <div className="ts-card" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Handshake size={22} color="var(--color-primary)" />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-heading)' }}>
                  {content.collab2Title}
                </h4>
              </div>
              <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                {content.collab2Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 12: Call to Action */}
      <section
        style={{
          padding: '72px 24px',
          backgroundColor: 'var(--color-primary-dark)',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '34px', fontWeight: 800, marginBottom: '14px' }}>
            {content.ctaTitle}
          </h2>
          <p style={{ fontSize: '17px', color: '#94A9C0', lineHeight: 1.65, marginBottom: '28px' }}>
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
