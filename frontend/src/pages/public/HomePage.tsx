import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  Droplets,
  ArrowRight,
  Activity,
  CheckCircle2,
  Clock,
  Briefcase,
  Microscope,
  Award,
  Sparkles,
  FileSpreadsheet,
  AlertTriangle,
  Globe2,
  Layers,
  Wrench,
  TrendingDown,
  Cpu,
  Handshake,
  Check,
  ShieldCheck,
  Users,
  Target,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { homeContent } from '../../data/homeContent';
import { api } from '../../services/api';
import { Project } from '../../types';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const content = homeContent[language] || homeContent.en;
  const shouldReduceMotion = useReducedMotion();
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [activeComparisonView, setActiveComparisonView] = useState<'table' | 'flow' | 'cost'>('table');

  useEffect(() => {
    let isMounted = true;
    api
      .getProjects({ limit: 3, lang: language })
      .then((res) => {
        if (isMounted && res && res.projects && res.projects.length > 0) {
          setDynamicProjects(res.projects);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [language]);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <Navbar />

      {/* Hero (Slide 1 & Slide 4) */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#081426',
          backgroundImage: 'linear-gradient(135deg, rgba(8, 20, 38, 0.92) 0%, rgba(11, 37, 69, 0.94) 55%, rgba(6, 17, 33, 0.96) 100%), url("/images/waterscope-hero-nile.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '88px 24px 80px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(0, 0, 0, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          {/* Hero Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
          >
            {/* Mission Badge & Global Tagline */}
            <motion.div variants={fadeInUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
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
                  fontSize: '13px',
                  fontWeight: 700,
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.01em',
                }}
              >
                <Droplets size={16} /> {content.heroBadge}
              </div>

              {/* waterscope.org Global Tagline Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#E2E8F0',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <Sparkles size={14} color="#38BDF8" /> {content.heroTagline}
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              style={{
                fontSize: 'clamp(38px, 5vw, 56px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
              }}
            >
              {content.heroHeadline1}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 60%, #7DD3FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {content.heroHeadline2}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: '18px',
                color: '#CBD5E1',
                lineHeight: 1.65,
                maxWidth: '560px',
              }}
            >
              {content.heroSubtitle}
            </motion.p>

            {/* waterscope.org Global Mission Callout */}
            <motion.div
              variants={fadeInUp}
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.72)',
                borderLeft: '4px solid #38BDF8',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                maxWidth: '580px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Globe2 size={16} color="#38BDF8" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Global Mission &bull; Cambridge Origin
                </span>
              </div>
              <p style={{ fontSize: '13.5px', color: '#E2E8F0', lineHeight: 1.55, margin: 0 }}>
                {content.heroMissionQuote}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginTop: '8px',
              }}
            >
              <Link
                to="/technology"
                className="ts-btn ts-btn-primary ts-btn-lg"
                style={{
                  padding: '14px 28px',
                  fontSize: '15.5px',
                  boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)',
                }}
              >
                {content.heroBtnTech} <ArrowRight size={18} />
              </Link>
              <Link
                to="/our-work"
                className="ts-btn ts-btn-lg"
                style={{
                  padding: '14px 24px',
                  fontSize: '15.5px',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {content.heroBtnWork}
              </Link>
            </motion.div>

            {/* Key Trust Highlights */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#E2E8F0' }}>
                <CheckCircle2 size={18} color="#4ADE80" />
                <span>{content.heroTrust1}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#E2E8F0' }}>
                <CheckCircle2 size={18} color="#4ADE80" />
                <span>{content.heroTrust2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#E2E8F0' }}>
                <CheckCircle2 size={18} color="#4ADE80" />
                <span>{content.heroTrust3}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual (Slide 4 - Nile River Picture) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: '#0F172A',
              }}
            >
              <img
                src="/images/waterscope-hero-nile.jpg"
                alt="WaterScope testing station deployed at Nile River, Bahir Dar, Ethiopia"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />

              {/* Verified Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  backgroundColor: 'rgba(11, 37, 69, 0.94)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#0EA5E9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                  }}
                >
                  <Activity size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                    {content.heroFloatingTitle}
                  </div>
                  <div style={{ fontSize: '11px', color: '#BAE6FD' }}>
                    {content.heroFloatingSub}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Institutional & Strategic Partners Banner (Slide 11 / WordPress Inspiration) */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '28px 24px',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
              }}
            >
              <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--color-border)' }} />
              <span>Institutional Collaboration & Manufacturing Partners</span>
              <span style={{ width: '36px', height: '1px', backgroundColor: 'var(--color-border)' }} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '24px',
                alignItems: 'center',
                justifyItems: 'center',
                width: '100%',
              }}
            >
              {/* Bahir Dar University */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  width: '100%',
                  maxWidth: '220px',
                }}
                title="Bahir Dar University - BiT Academic Partnership"
              >
                <img
                  src="/images/partner-bdu-original.png"
                  alt="Bahir Dar University"
                  style={{ height: '38px', width: '38px', objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Bahir Dar Univ.
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    BiT Research & Lab
                  </span>
                </div>
              </div>

              {/* BiTec Incubation Center */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  width: '100%',
                  maxWidth: '220px',
                }}
                title="BiTec Incubation Center - Technology Commercialization"
              >
                <img
                  src="/images/partner-bitec-original.png"
                  alt="BiTec Incubation Center"
                  style={{ height: '38px', width: '38px', objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    BiTec Incubation
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    Commercialization
                  </span>
                </div>
              </div>

              {/* Centre for Global Equality, Cambridge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  width: '100%',
                  maxWidth: '220px',
                }}
                title="Centre for Global Equality, Cambridge, UK"
              >
                <img
                  src="/images/partner-cge-original.jpg"
                  alt="Centre for Global Equality"
                  style={{ height: '34px', width: '42px', objectFit: 'contain', borderRadius: '4px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    CGE Cambridge
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    Global Equality UK
                  </span>
                </div>
              </div>

              {/* Seifu BiT Maker Space */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  width: '100%',
                  maxWidth: '220px',
                }}
                title="Seifu BiT Maker Space - CNC & Cartridge Production"
              >
                <img
                  src="/images/partner-seifu-maker-space.png"
                  alt="Seifu BiT Maker Space"
                  style={{ height: '38px', width: '38px', objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    BiT Maker Space
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    CNC Metal Cartridge
                  </span>
                </div>
              </div>

              {/* Action Against Hunger */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  width: '100%',
                  maxWidth: '220px',
                }}
                title="Action Against Hunger - Humanitarian Pilot Partner (LOI for 30 Units)"
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#DC2626',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Action Against Hunger
                  </span>
                  <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    LOI: 30 Units
                  </span>
                </div>
              </div>

              {/* Ministry of Health */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  width: '100%',
                  maxWidth: '220px',
                }}
                title="Ministry of Health - National Surveillance Collaboration & Hawassa Workshop"
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    border: '1px solid rgba(14, 165, 233, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284C7',
                    flexShrink: 0,
                  }}
                >
                  <Activity size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Ministry of Health
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    Hawassa Pilot
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* waterscope.org Replica: The Problem (Fixed Background Parallax with High-Contrast Floating Card) */}
      <section
        style={{
          position: 'relative',
          padding: '110px 24px',
          backgroundImage: 'linear-gradient(rgba(11, 25, 44, 0.15), rgba(11, 25, 44, 0.22)), url("/images/waterscope-problem-bg.jpg")',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Glassmorphic Card Container for The Problem */}
          <div
            style={{
              backgroundColor: 'rgba(11, 25, 44, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)',
              padding: 'clamp(28px, 4.5vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '48px',
                alignItems: 'center',
              }}
            >
              {/* Left: Authentic Video Embed from waterscope.org */}
              <div
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  backgroundColor: '#000000',
                  aspectRatio: '16 / 9',
                  position: 'relative',
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/R3g_TrnS4Tc?rel=0"
                  title="WaterScope - Transforming Water Quality Surveillance"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Right: The Problem Text Verbatim from waterscope.org */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.45)',
                    color: '#FCA5A5',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: 'fit-content',
                  }}
                >
                  <AlertTriangle size={15} /> Global Public Health Challenge
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(32px, 4vw, 44px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {content.problemHeading}
                </h2>

                <p
                  style={{
                    fontSize: '17px',
                    color: '#F1F5F9',
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {content.problemParagraph1}
                </p>

                <p
                  style={{
                    fontSize: '16.5px',
                    color: '#CBD5E1',
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {content.problemParagraph2}
                </p>
              </div>
            </div>

            {/* Localized Public Health Challenge Context (Slide 2 - 3 sub-cards inside the master card) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div
                style={{
                  padding: '22px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderLeft: '4px solid #EF4444',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Droplets size={18} color="#EF4444" />
                  <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{content.pain1Title}</h4>
                </div>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
                  {content.pain1Desc}
                </p>
              </div>

              <div
                style={{
                  padding: '22px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderLeft: '4px solid #F59E0B',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Briefcase size={18} color="#F59E0B" />
                  <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{content.pain2Title}</h4>
                </div>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
                  {content.pain2Desc}
                </p>
              </div>

              <div
                style={{
                  padding: '22px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderLeft: '4px solid #38BDF8',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Clock size={18} color="#38BDF8" />
                  <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{content.pain3Title}</h4>
                </div>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
                  {content.pain3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: Key Challenges in Water Quality Monitoring */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
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
              {content.challengesBadge}
            </span>
            <h2
              style={{
                fontSize: 'clamp(30px, 4vw, 42px)',
                fontWeight: 900,
                color: 'var(--color-heading)',
                marginBottom: '16px',
              }}
            >
              {content.challengesTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {content.challengesDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
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
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertTriangle size={18} color="var(--color-primary)" />
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

      {/* waterscope.org Replica: Our Solution (Fixed Background Parallax with High-Contrast Floating Card) */}
      <section
        style={{
          position: 'relative',
          padding: '110px 24px',
          backgroundImage: 'linear-gradient(rgba(11, 25, 44, 0.12), rgba(11, 25, 44, 0.20)), url("/images/waterscope-solution-bg.jpg")',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Glassmorphic Card Container for Our Solution */}
          <div
            style={{
              backgroundColor: 'rgba(11, 25, 44, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)',
              padding: 'clamp(28px, 4.5vw, 48px)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '48px',
                alignItems: 'center',
              }}
            >
              {/* Product Image / Field Station Visual */}
              <div style={{ order: 1 }}>
                <div
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    backgroundColor: '#081426',
                  }}
                >
                  <img
                    src="/images/waterscope-hero-nile.jpg"
                    alt="WaterScope testing system stationed by the Nile River in Bahir Dar, Ethiopia"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>

              {/* Solution Narrative verbatim from waterscope.org */}
              <div style={{ order: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(14, 165, 233, 0.2)',
                    border: '1px solid rgba(56, 189, 248, 0.45)',
                    color: '#38BDF8',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: 'fit-content',
                  }}
                >
                  <Microscope size={15} /> {content.solutionBadge}
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(32px, 4vw, 44px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {content.solutionHeading}
                </h2>

                <p
                  style={{
                    fontSize: '17px',
                    color: '#F1F5F9',
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {content.solutionParagraph1}
                </p>

                <p
                  style={{
                    fontSize: '16.5px',
                    color: '#CBD5E1',
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {content.solutionParagraph2}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '4px' }}>
                  <div
                    style={{
                      padding: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '14px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#38BDF8' }}>
                      {content.solutionStat1Val}
                    </div>
                    <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.5 }}>
                      {content.solutionStat1Desc}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '14px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#34D399' }}>
                      {content.solutionStat2Val}
                    </div>
                    <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.5 }}>
                      {content.solutionStat2Desc}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <Link to="/technology" className="ts-btn ts-btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
                    {content.solutionBtn} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Key Features of WaterScope System (9 Nodes) */}
      <section
        style={{
          padding: '96px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
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
                marginBottom: '10px',
              }}
            >
              {content.featuresBadge}
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 44px)',
                fontWeight: 900,
                color: 'var(--color-heading)',
                marginBottom: '18px',
              }}
            >
              {content.featuresTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              {content.featuresDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {content.features.map((f, idx) => (
              <div
                key={idx}
                className="ts-card"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="var(--color-primary)" />
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-heading)' }}>
                      {f.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      backgroundColor: 'var(--color-primary-subtle)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 7: What Makes Us Different (4 Nodes) */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
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
              {content.diffBadge}
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 44px)',
                fontWeight: 900,
                color: 'var(--color-heading)',
                marginBottom: '16px',
              }}
            >
              {content.diffTitle}
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              {content.diffDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {content.diffs.map((d, idx) => (
              <div
                key={idx}
                className="ts-card"
                style={{
                  padding: '28px',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--color-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-primary-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                  }}
                >
                  {idx === 0 && <TrendingDown size={22} />}
                  {idx === 1 && <Layers size={22} />}
                  {idx === 2 && <ShieldCheck size={22} />}
                  {idx === 3 && <Briefcase size={22} />}
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-heading)' }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* waterscope.org: UN Sustainable Development Goal 6 & User-Centred Design */}
      <section
        style={{
          padding: '96px 24px',
          background: 'linear-gradient(180deg, var(--color-bg) 0%, rgba(14, 165, 233, 0.05) 50%, var(--color-bg) 100%)',
          borderTop: '1px solid var(--color-border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* SDG 6 Header Banner */}
          <div
            style={{
              borderRadius: '24px',
              padding: '48px 36px',
              background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 60%, #0C4A6E 100%)',
              color: '#FFFFFF',
              boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.35)',
              marginBottom: '56px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '920px', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                <Target size={16} /> {content.sdgBadge}
              </div>

              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}
              >
                {content.sdgTitle}
              </h2>

              <blockquote
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  margin: '0 0 20px',
                  paddingLeft: '20px',
                  borderLeft: '4px solid #38BDF8',
                  color: '#F0F9FF',
                }}
              >
                “{content.sdgQuote}”
              </blockquote>

              <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#E0F2FE', margin: 0 }}>
                {content.sdgDesc}
              </p>
            </div>
          </div>

          {/* Top CTA Link Button from waterscope.org (Image 2) */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <Link
              to="/technology"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 32px',
                borderRadius: '8px',
                backgroundColor: '#132745',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 6px 18px rgba(19, 39, 69, 0.28)',
                transition: 'all 0.2s ease',
              }}
            >
              {content.ucdBtnTech} <ArrowRight size={16} />
            </Link>
          </div>

          {/* waterscope.org Replica: User-Centred Design (Image 2) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '56px',
              alignItems: 'center',
              marginBottom: '56px',
            }}
          >
            {/* Left: Authentic Oxfam Field Image */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <img
                src="/images/waterscope-user-centred-oxfam.png"
                alt="Oxfam field worker assembling WaterScope filter cartridge in low-resource setting"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Right: User-Centred Design Narrative verbatim from waterscope.org */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 42px)',
                  fontWeight: 300,
                  color: 'var(--color-heading)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                {content.ucdHeading}
              </h2>

              <p
                style={{
                  fontSize: '16.5px',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {content.ucdParagraph1}
              </p>

              <p
                style={{
                  fontSize: '16.5px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {content.ucdParagraph2}
              </p>
            </div>
          </div>

          {/* 3 User-Centred Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              className="ts-card"
              style={{
                padding: '32px',
                borderRadius: '20px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(14, 165, 233, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0EA5E9',
                }}
              >
                <Users size={24} />
              </div>
              <h4 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-heading)', margin: 0 }}>
                {content.ucdPoint1Title}
              </h4>
              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                {content.ucdPoint1Desc}
              </p>
            </div>

            <div
              className="ts-card"
              style={{
                padding: '32px',
                borderRadius: '20px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                }}
              >
                <Droplets size={24} />
              </div>
              <h4 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-heading)', margin: 0 }}>
                {content.ucdPoint2Title}
              </h4>
              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                {content.ucdPoint2Desc}
              </p>
            </div>

            <div
              className="ts-card"
              style={{
                padding: '32px',
                borderRadius: '20px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6366F1',
                }}
              >
                <Globe2 size={24} />
              </div>
              <h4 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-heading)', margin: 0 }}>
                {content.ucdPoint3Title}
              </h4>
              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                {content.ucdPoint3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Traction & Institutional Confidence (3 Nodes) */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
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
              {content.tractionBadge}
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 44px)',
                fontWeight: 900,
                color: 'var(--color-heading)',
                marginBottom: '16px',
              }}
            >
              {content.tractionTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              {content.tractionDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {content.tractions.map((t, idx) => (
              <div
                key={idx}
                className="ts-card"
                style={{
                  padding: '28px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={22} color="var(--color-primary)" />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-heading)' }}>
                    {t.title}
                  </h3>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 9: Early Progress: Manufacturing and Training */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
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
              {content.progressBadge}
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 42px)',
                fontWeight: 900,
                color: 'var(--color-heading)',
                marginBottom: '16px',
              }}
            >
              {content.progressTitle}
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
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
                  <Wrench size={16} /> 3D Printing &amp; Rapid Fabrication
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-heading)' }}>
                  Seifu BiT Maker Space
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  We have begun local manufacturing using 3D printing and machining technologies to significantly lower costs by up to 80%.
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
                src="/images/training-hawassa-moh.png"
                alt="Water technician training in Hawassa with Ministry of Health"
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                  <Award size={16} /> Technician Training Programs
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-heading)' }}>
                  Ministry of Health Engagement
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  We conduct active training programs for water technicians, building government capacity and demonstrating system usability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Way Technology Comparison Matrix */}
      <section
        style={{
          padding: '92px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
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
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '14px',
              }}
            >
              <FileSpreadsheet size={16} /> Rigorous Technical Benchmarking
            </div>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 44px)',
                fontWeight: 900,
                color: 'var(--color-heading)',
                marginBottom: '16px',
                lineHeight: 1.2,
              }}
            >
              How WaterScope Africa Outperforms Traditional Field Kits
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              A direct comparison addressing high costs, foreign dependency, and technical complexity through local manufacturing.
            </p>

            {/* View Switcher Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveComparisonView('table')}
                className={`ts-btn ${activeComparisonView === 'table' ? 'ts-btn-primary' : 'ts-btn-secondary'} ts-btn-sm`}
                style={{ borderRadius: '9999px', padding: '8px 18px', fontSize: '13.5px' }}
              >
                Feature Matrix Table
              </button>
              <button
                onClick={() => setActiveComparisonView('flow')}
                className={`ts-btn ${activeComparisonView === 'flow' ? 'ts-btn-primary' : 'ts-btn-secondary'} ts-btn-sm`}
                style={{ borderRadius: '9999px', padding: '8px 18px', fontSize: '13.5px' }}
              >
                Sample Processing Workflow (8m vs 25m)
              </button>
              <button
                onClick={() => setActiveComparisonView('cost')}
                className={`ts-btn ${activeComparisonView === 'cost' ? 'ts-btn-primary' : 'ts-btn-secondary'} ts-btn-sm`}
                style={{ borderRadius: '9999px', padding: '8px 18px', fontSize: '13.5px' }}
              >
                Consumable Cost Breakdown
              </button>
            </div>
          </div>

          {activeComparisonView === 'table' && (
            <div
              className="ts-card"
              style={{
                padding: '0',
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table className="ts-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-surface-sunken)', borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '18px 24px', fontSize: '14px', fontWeight: 800, width: '28%' }}>
                        Evaluation Criteria
                      </th>
                      <th
                        style={{
                          padding: '18px 24px',
                          fontSize: '14px',
                          fontWeight: 800,
                          width: '28%',
                          backgroundColor: 'rgba(14, 165, 233, 0.08)',
                          color: 'var(--color-primary)',
                          borderLeft: '2px solid var(--color-primary)',
                          borderRight: '2px solid var(--color-primary)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={16} /> WaterScope Africa (Local)
                        </div>
                      </th>
                      <th style={{ padding: '18px 24px', fontSize: '14px', fontWeight: 700, width: '22%' }}>
                        Conventional MF Kits (DelAgua / Wagtech)
                      </th>
                      <th style={{ padding: '18px 24px', fontSize: '14px', fontWeight: 700, width: '22%' }}>
                        Aquagenx CBT (Pouch Test)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Sample Prep Time</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-primary-dark)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        8 minutes (7 simple steps)
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>25 minutes (11 manual steps)</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>15 minutes (6 steps)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Results Turnaround</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-primary-dark)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        8h indication / 21h quantitative
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>18–24 hours delay</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>24–48 hours delay</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Result Quantification</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-primary-dark)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        Precise CFU/100mL (AI camera count)
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>CFU/100mL (manual eye enumeration)</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>Qualitative MPN range only</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Operator Skill &amp; Training</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-primary-dark)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        User-friendly design (ease of operation)
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>Specialist laboratory training required</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>Minimal training needed</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Consumable Cost per Test</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-success)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        $4.00 (up to 80% cost reduction)
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>$5.50 ($11.50 full amortized)</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>$11.00 ($12.32 full amortized)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Field Kit Weight &amp; Mobility</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-primary-dark)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        5.8 kg portable kit (low-resource environments)
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>10–15+ kg heavy case (fragile glassware)</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>Disposable plastic bag pouch</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Local Ethiopian Manufacturing</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-success)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        Yes (Bahir Dar University / BiTec)
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-error)' }}>No (Imported from UK / Europe)</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-error)' }}>No (Imported from United States)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 24px', fontWeight: 700 }}>Digital Telemetry &amp; Reporting</td>
                      <td style={{ padding: '16px 24px', backgroundColor: 'rgba(14, 165, 233, 0.05)', fontWeight: 800, color: 'var(--color-primary-dark)', borderLeft: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }}>
                        Mobile App &amp; Dashboard (Real-time monitoring)
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>None (Manual paper logbooks)</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-text-muted)' }}>Manual mobile camera photo upload</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeComparisonView === 'flow' && (
            <div className="ts-card" style={{ padding: '24px', textAlign: 'center' }}>
              <img
                src="/images/comparison-sample-processing.png"
                alt="Detailed step-by-step sample processing comparison"
                style={{ width: '100%', maxHeight: '600px', objectFit: 'contain', margin: '0 auto' }}
              />
              <p style={{ marginTop: '16px', fontSize: '14.5px', color: 'var(--color-text-muted)' }}>
                WaterScope simplifies bacterial testing in drinking water through a cartridge-based method in just 8 minutes of hands-on preparation.
              </p>
            </div>
          )}

          {activeComparisonView === 'cost' && (
            <div className="ts-card" style={{ padding: '24px', textAlign: 'center' }}>
              <img
                src="/images/comparison-cost-breakdown.png"
                alt="5-Year consumable cost and total cost of ownership breakdown"
                style={{ width: '100%', maxHeight: '600px', objectFit: 'contain', margin: '0 auto' }}
              />
              <p style={{ marginTop: '16px', fontSize: '14.5px', color: 'var(--color-text-muted)' }}>
                Local manufacturing significantly lowers costs by up to 80%, making water testing accessible to communities in need.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Slide 10: The Collaboration Invitation */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-primary-dark)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#38BDF8',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            {content.collabBadge}
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 900,
              marginBottom: '20px',
              lineHeight: 1.25,
            }}
          >
            {content.collabTitle}
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: '#94A9C0',
              lineHeight: 1.7,
              maxWidth: '820px',
              margin: '0 auto 40px',
            }}
          >
            {content.collabDesc}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            {content.collabs.map((col, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Handshake size={22} color="#38BDF8" />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                    {col.title}
                  </h4>
                </div>
                <p style={{ fontSize: '14.5px', color: '#94A9C0', lineHeight: 1.6, margin: 0 }}>
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 11: Our Partners */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
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
              {content.partnersBadge}
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '14px' }}>
              {content.partnersTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {content.partnersDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {/* 1. Bahir Dar University */}
            <div
              className="ts-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <img
                  src="/images/partner-bdu-original.png"
                  alt="Bahir Dar University"
                  style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ width: '100%' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    color: '#0284C7',
                    marginBottom: '8px',
                  }}
                >
                  Academic & Validation Partner
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>Bahir Dar University</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Academic research partnership, laboratory validation, and institutional engineering support through Bahir Dar Institute of Technology (BiT).
                </p>
              </div>
            </div>

            {/* 2. BiTec Incubation Center */}
            <div
              className="ts-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <img
                  src="/images/partner-bitec-original.png"
                  alt="BiTec Incubation Center"
                  style={{ maxHeight: '68px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ width: '100%' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    color: '#15803D',
                    marginBottom: '8px',
                  }}
                >
                  Incubation & Commercialization
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>BiTec Incubation Center</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Technology commercialization, venture incubation, and business scaling in the Amhara region and nationwide.
                </p>
              </div>
            </div>

            {/* 3. Seifu BiT Maker Space */}
            <div
              className="ts-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <img
                  src="/images/partner-seifu-maker-space.png"
                  alt="Seifu BiT Maker Space"
                  style={{ maxHeight: '68px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ width: '100%' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(234, 88, 12, 0.1)',
                    color: '#C2410C',
                    marginBottom: '8px',
                  }}
                >
                  Local Precision Manufacturing
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>Seifu BiT Maker Space</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Precision CNC machining and 3D printing of patented metal test cartridges, slashing consumable costs by up to 80%.
                </p>
              </div>
            </div>

            {/* 4. Centre for Global Equality, Cambridge */}
            <div
              className="ts-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <img
                  src="/images/partner-cge-original.jpg"
                  alt="Centre for Global Equality, Cambridge"
                  style={{ maxHeight: '60px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
                />
              </div>
              <div style={{ width: '100%' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                    color: '#7E22CE',
                    marginBottom: '8px',
                  }}
                >
                  International Civil Society
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>Centre for Global Equality</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Cambridge-based civil society partnership fostering inclusive technology transfer, open science, and social enterprise.
                </p>
              </div>
            </div>

            {/* 5. Action Against Hunger (ACF) */}
            <div
              className="ts-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#DC2626',
                  }}
                >
                  <ShieldCheck size={36} />
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#DC2626',
                    marginBottom: '8px',
                  }}
                >
                  Humanitarian LOI Partner
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>Action Against Hunger</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  International NGO partner validating field diagnostic speed; signed Letter of Intent (LOI) to procure up to 30 field kits.
                </p>
              </div>
            </div>

            {/* 6. Ministry of Health (MoH) */}
            <div
              className="ts-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    border: '1px solid rgba(14, 165, 233, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284C7',
                  }}
                >
                  <Activity size={36} />
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    color: '#0284C7',
                    marginBottom: '8px',
                  }}
                >
                  National Health Surveillance
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>Ministry of Health (MoH)</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Government stakeholder in regional surveillance, host of the Hawassa training workshop for national public health technicians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
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
              {content.hwBadge}
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-heading)', marginBottom: '14px' }}>
              {content.hwTitle}
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {content.hwDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="ts-badge ts-badge-success" style={{ marginBottom: '12px' }}>{content.hw1Badge}</span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                  {content.hw1Title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {content.hw1Desc}
                </p>
                <div style={{ fontSize: '13px', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong>{content.hw1Spec1Key}:</strong> {content.hw1Spec1Val}</div>
                  <div><strong>{content.hw1Spec2Key}:</strong> {content.hw1Spec2Val}</div>
                </div>
              </div>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/store" className="ts-btn ts-btn-primary ts-btn-sm">
                  {content.hwViewStore}
                </Link>
                <Link to="/contact" className="ts-btn ts-btn-secondary ts-btn-sm">
                  {content.hwRequestQuote}
                </Link>
              </div>
            </div>

            <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="ts-badge ts-badge-neutral" style={{ marginBottom: '12px' }}>{content.hw2Badge}</span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                  {content.hw2Title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {content.hw2Desc}
                </p>
                <div style={{ fontSize: '13px', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong>{content.hw2Spec1Key}:</strong> {content.hw2Spec1Val}</div>
                  <div><strong>{content.hw2Spec2Key}:</strong> {content.hw2Spec2Val}</div>
                </div>
              </div>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/store" className="ts-btn ts-btn-primary ts-btn-sm">
                  {content.hwViewStore}
                </Link>
                <Link to="/contact" className="ts-btn ts-btn-secondary ts-btn-sm">
                  {content.hwRequestQuote}
                </Link>
              </div>
            </div>

            <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="ts-badge ts-badge-neutral" style={{ marginBottom: '12px' }}>{content.hw3Badge}</span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                  {content.hw3Title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {content.hw3Desc}
                </p>
                <div style={{ fontSize: '13px', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong>{content.hw3Spec1Key}:</strong> {content.hw3Spec1Val}</div>
                  <div><strong>{content.hw3Spec2Key}:</strong> {content.hw3Spec2Val}</div>
                </div>
              </div>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/store" className="ts-btn ts-btn-primary ts-btn-sm">
                  {content.hwViewStore}
                </Link>
                <Link to="/contact" className="ts-btn ts-btn-secondary ts-btn-sm">
                  {content.hwRequestQuote}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 12: Get in Touch & Final Call to Action */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-primary-dark)',
          color: '#FFFFFF',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: '18px',
            }}
          >
            {content.ctaTitle}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#94A9C0',
              lineHeight: 1.65,
              marginBottom: '36px',
            }}
          >
            {content.ctaDesc}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="ts-btn ts-btn-primary ts-btn-lg" style={{ padding: '14px 28px' }}>
              {content.ctaBtnDemo} <ArrowRight size={18} />
            </Link>
            <Link
              to="/technology"
              className="ts-btn ts-btn-secondary ts-btn-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                padding: '14px 24px',
              }}
            >
              {content.ctaBtnSpecs}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
