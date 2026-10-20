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

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface)',
          padding: '80px 24px 72px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(240, 248, 255, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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
            {/* Mission Badge */}
            <motion.div variants={fadeInUp}>
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
                }}
              >
                <Droplets size={16} /> {content.heroBadge}
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
                color: 'var(--color-heading)',
              }}
            >
              {content.heroHeadline1}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #006699 0%, #0EA5E9 100%)',
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
                fontSize: '18.5px',
                color: 'var(--color-text-muted)',
                lineHeight: 1.65,
                maxWidth: '560px',
              }}
            >
              {content.heroSubtitle}
            </motion.p>

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
                  boxShadow: '0 8px 20px rgba(0, 102, 153, 0.22)',
                }}
              >
                {content.heroBtnTech} <ArrowRight size={18} />
              </Link>
              <Link
                to="/our-work"
                className="ts-btn ts-btn-secondary ts-btn-lg"
                style={{
                  padding: '14px 24px',
                  fontSize: '15.5px',
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
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--color-text)' }}>
                <CheckCircle2 size={18} color="var(--color-success)" />
                <span>{content.heroTrust1}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--color-text)' }}>
                <CheckCircle2 size={18} color="var(--color-success)" />
                <span>{content.heroTrust2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--color-text)' }}>
                <CheckCircle2 size={18} color="var(--color-success)" />
                <span>{content.heroTrust3}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual */}
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
                boxShadow: '0 24px 48px -12px rgba(11, 37, 69, 0.2)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <img
                src="/images/hero-water-testing.jpg"
                alt="WASH technician conducting on-site drinking water quality testing at a community water point"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />

              {/* Floating Verified Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  backgroundColor: 'rgba(11, 37, 69, 0.90)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B2545',
                  }}
                >
                  <Activity size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>
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

      {/* The Problem */}
      <section style={{ padding: '88px 24px', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--color-error)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {content.problemBadge}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 38px)',
                  fontWeight: 800,
                  color: 'var(--color-heading)',
                  lineHeight: 1.25,
                  marginBottom: '20px',
                }}
              >
                {content.problemTitle}
              </h2>
              <p
                style={{
                  fontSize: '16.5px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                }}
              >
                {content.problemDesc}
              </p>
            </div>

            {/* Pain Points Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                className="ts-card"
                style={{
                  borderLeft: '4px solid var(--color-error)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Clock size={20} color="var(--color-error)" />
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{content.pain1Title}</h4>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  {content.pain1Desc}
                </p>
              </div>

              <div
                className="ts-card"
                style={{
                  borderLeft: '4px solid var(--color-warning)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Briefcase size={20} color="var(--color-warning)" />
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{content.pain2Title}</h4>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  {content.pain2Desc}
                </p>
              </div>

              <div
                className="ts-card"
                style={{
                  borderLeft: '4px solid var(--color-primary)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Microscope size={20} color="var(--color-primary)" />
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{content.pain3Title}</h4>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  {content.pain3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '56px',
              alignItems: 'center',
            }}
          >
            {/* Product Image */}
            <div style={{ order: 1 }}>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card-hover)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <img
                  src="/images/portable-kit-system.jpg"
                  alt="AquaScope portable water testing system with motorized filtration pump, incubator slots, and digital screen"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>

            {/* Solution Narrative */}
            <div style={{ order: 2 }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {content.solutionBadge}
              </span>

              <h2
                style={{
                  fontSize: 'clamp(30px, 4vw, 42px)',
                  fontWeight: 900,
                  color: 'var(--color-heading)',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                {content.solutionTitle}
              </h2>

              <p
                style={{
                  fontSize: '17px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                {content.solutionDesc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                <div style={{ padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {content.solutionStat1Val}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {content.solutionStat1Desc}
                  </div>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                    {content.solutionStat2Val}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {content.solutionStat2Desc}
                  </div>
                </div>
              </div>

              <Link to="/technology" className="ts-btn ts-btn-primary">
                {content.solutionBtn} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How the Technology Works (Testing Workflow) */}
      <section style={{ padding: '96px 24px', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
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
              {content.workflowBadge}
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 44px)',
                fontWeight: 900,
                color: 'var(--color-heading)',
                marginBottom: '18px',
              }}
            >
              {content.workflowTitle}
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              {content.workflowDesc}
            </p>
          </div>

          {/* Interactive Steps Display */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {content.workflowSteps.map((step, idx) => {
              const isSelected = activeWorkflowStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className="ts-card"
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    transform: isSelected ? 'translateY(-4px)' : 'none',
                    boxShadow: isSelected ? 'var(--shadow-card-hover)' : 'var(--shadow-sm)',
                    transition: 'all 200ms ease',
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
                        marginBottom: '14px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '20px',
                          fontWeight: 900,
                          color: isSelected ? 'var(--color-primary)' : 'var(--color-text-subtle)',
                        }}
                      >
                        {step.step}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface-sunken)',
                          color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {step.highlight}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '19px',
                        fontWeight: 800,
                        color: 'var(--color-heading)',
                        marginBottom: '10px',
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: '12px',
                      borderTop: '1px solid var(--color-border)',
                      fontSize: '12.5px',
                      color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-subtle)',
                      fontWeight: 500,
                    }}
                  >
                    {step.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Capabilities: Optics & AI */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
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
                {content.opticsBadge}
              </span>
              <h2
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: 'var(--color-heading)',
                  lineHeight: 1.25,
                  marginBottom: '16px',
                }}
              >
                {content.opticsTitle}
              </h2>
              <p
                style={{
                  fontSize: '16.5px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}
              >
                {content.opticsDesc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" />
                  <span>{content.opticsCheck1}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" />
                  <span>{content.opticsCheck2}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" />
                  <span>{content.opticsCheck3}</span>
                </div>
              </div>
            </div>

            {/* Microscopic Grid Image */}
            <div>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card-hover)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#000000',
                }}
              >
                <img
                  src="/images/microbiology-grid.jpg"
                  alt="Microscopic membrane filter grid view showing automated AI colony detection and counting"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Impact & UN SDG 6 */}
      <section
        style={{
          padding: '80px 24px',
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
            {content.sdgBadge}
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 900,
              marginBottom: '20px',
              lineHeight: 1.25,
            }}
          >
            {content.sdgTitle}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#94A9C0',
              lineHeight: 1.7,
              maxWidth: '820px',
              margin: '0 auto 40px',
            }}
          >
            &ldquo;{content.sdgQuote}&rdquo; {content.sdgQuoteSub}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
              }}
            >
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
                {content.sdgCol1Title}
              </h4>
              <p style={{ fontSize: '14px', color: '#94A9C0', lineHeight: 1.6 }}>
                {content.sdgCol1Desc}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
              }}
            >
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
                {content.sdgCol2Title}
              </h4>
              <p style={{ fontSize: '14px', color: '#94A9C0', lineHeight: 1.6 }}>
                {content.sdgCol2Desc}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
              }}
            >
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
                {content.sdgCol3Title}
              </h4>
              <p style={{ fontSize: '14px', color: '#94A9C0', lineHeight: 1.6 }}>
                {content.sdgCol3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Field Work Preview */}
      <section style={{ padding: '88px 24px', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '48px',
            }}
          >
            <div>
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
                {content.workBadge}
              </span>
              <h2
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: 'var(--color-heading)',
                }}
              >
                {content.workTitle}
              </h2>
            </div>
            <Link to="/our-work" className="ts-btn ts-btn-secondary">
              {content.workViewAll} <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {dynamicProjects.length > 0 ? (
              dynamicProjects.map((p) => (
                <div key={p.id} className="ts-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="ts-badge ts-badge-neutral" style={{ marginBottom: '12px' }}>
                      {p.category}
                    </span>
                    <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '10px' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '16px' }}>
                      {p.summary}
                    </p>
                  </div>
                  <Link to="/our-work" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px' }}>
                    {content.workReadCase} &rarr;
                  </Link>
                </div>
              ))
            ) : (
              <>
                <div className="ts-card" style={{ padding: '24px' }}>
                  <span className="ts-badge ts-badge-neutral" style={{ marginBottom: '12px' }}>
                    {content.workCard1Badge}
                  </span>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '10px' }}>
                    {content.workCard1Title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '16px' }}>
                    {content.workCard1Desc}
                  </p>
                  <Link to="/our-work" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px' }}>
                    {content.workReadCase} &rarr;
                  </Link>
                </div>

                <div className="ts-card" style={{ padding: '24px' }}>
                  <span className="ts-badge ts-badge-neutral" style={{ marginBottom: '12px' }}>
                    {content.workCard2Badge}
                  </span>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '10px' }}>
                    {content.workCard2Title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '16px' }}>
                    {content.workCard2Desc}
                  </p>
                  <Link to="/our-work" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px' }}>
                    {content.workReadCase} &rarr;
                  </Link>
                </div>

                <div className="ts-card" style={{ padding: '24px' }}>
                  <span className="ts-badge ts-badge-neutral" style={{ marginBottom: '12px' }}>
                    {content.workCard3Badge}
                  </span>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '10px' }}>
                    {content.workCard3Title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '16px' }}>
                    {content.workCard3Desc}
                  </p>
                  <Link to="/our-work" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px' }}>
                    {content.workReadCase} &rarr;
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section
        style={{
          padding: '88px 24px',
          backgroundColor: 'var(--color-surface)',
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

      {/* Final Call to Action */}
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
