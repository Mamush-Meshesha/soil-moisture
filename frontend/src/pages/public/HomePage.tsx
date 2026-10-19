import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  Waves,
  Cpu,
  Droplets,
  ShieldCheck,
  ArrowRight,
  Bluetooth,
  Activity,
  Layers,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Radio,
  Sparkles,
  Database,
  BarChart3,
  Calendar,
  Compass,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);

  // Animation variants with typed tuples
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

  const soilLayers = [
    {
      depthKey: 'home.depth10',
      nameKey: 'home.depth10Name',
      depthCm: '10 cm',
      vwc: '28.4%',
      vwcNum: 28.4,
      temp: '21.3°C',
      statusKey: 'home.statusOptimal',
      color: '#74B875',
      accentBg: 'rgba(116, 184, 117, 0.12)',
    },
    {
      depthKey: 'home.depth20',
      nameKey: 'home.depth20Name',
      depthCm: '20 cm',
      vwc: '31.8%',
      vwcNum: 31.8,
      temp: '19.8°C',
      statusKey: 'home.statusOptimal',
      color: '#176B45',
      accentBg: 'rgba(23, 107, 69, 0.14)',
    },
    {
      depthKey: 'home.depth30',
      nameKey: 'home.depth30Name',
      depthCm: '30 cm',
      vwc: '34.2%',
      vwcNum: 34.2,
      temp: '18.5°C',
      statusKey: 'home.statusFieldCapacity',
      color: '#3678B7',
      accentBg: 'rgba(54, 120, 183, 0.12)',
    },
    {
      depthKey: 'home.depth40',
      nameKey: 'home.depth40Name',
      depthCm: '40 cm',
      vwc: '35.9%',
      vwcNum: 35.9,
      temp: '17.9°C',
      statusKey: 'home.statusSaturated',
      color: '#8558A8',
      accentBg: 'rgba(133, 88, 168, 0.12)',
    },
    {
      depthKey: 'home.depth50',
      nameKey: 'home.depth50Name',
      depthCm: '50 cm',
      vwc: '36.5%',
      vwcNum: 36.5,
      temp: '17.4°C',
      statusKey: 'home.statusBuffer',
      color: '#D99A23',
      accentBg: 'rgba(217, 154, 35, 0.12)',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* =========================================================================
          HERO SECTION — Spacious, Editorial, Natural Motion
          ========================================================================= */}
      <section className="ts-section-hero ts-gradient-mesh" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="ts-container" style={{ textAlign: 'center' }}>
          {/* Top Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'inline-flex', marginBottom: '24px' }}
          >
            <span
              className="ts-badge ts-gradient-pill"
              style={{
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 650,
                letterSpacing: '0.02em',
                boxShadow: '0 2px 10px rgba(23, 107, 69, 0.08)',
              }}
            >
              <ShieldCheck size={16} color="var(--color-primary)" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Hero Headline with Animated Stagger */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="ts-heading-hero"
            style={{
              maxWidth: '1020px',
              margin: '0 auto 28px',
            }}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Hero Supporting Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="ts-lead-paragraph"
            style={{
              margin: '0 auto 44px',
              maxWidth: '780px',
            }}
          >
            {t('hero.desc')}
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              marginBottom: '64px',
            }}
          >
            <Link
              to="/app"
              className="ts-btn ts-btn-primary ts-btn-lg"
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                boxShadow: '0 8px 24px rgba(23, 107, 69, 0.28)',
                transition: 'all 0.25s ease',
              }}
            >
              {t('hero.explorePlatform')} <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="ts-btn ts-btn-secondary ts-btn-lg"
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                backgroundColor: 'var(--color-surface)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              {t('hero.requestDemo')}
            </Link>
          </motion.div>

          {/* Interactive Multi-Depth Soil Intelligence Explorer */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: '1120px',
              margin: '0 auto',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '24px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card-hover)',
              padding: '36px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Visual Header bar of the Soil Explorer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '28px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--color-border-subtle)',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-primary-subtle)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Radio size={20} className="pulse-indicator" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--color-text)' }}>
                    Probe-X5 Multi-Depth Horizon Telemetry
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Field Alpha Center (Loam Soil) • Live 5-Depth Permittivity Scan
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span className="ts-badge ts-badge-success" style={{ padding: '6px 12px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary)',
                      display: 'inline-block',
                    }}
                  />
                  Live SDI-12 Signal: -64 dBm
                </span>
                <span className="ts-badge ts-badge-neutral" style={{ padding: '6px 12px' }}>
                  Battery: 94% (Solar Buffered)
                </span>
              </div>
            </div>

            {/* Depth Horizons Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '18px',
                textAlign: 'left',
              }}
            >
              {soilLayers.map((layer, idx) => {
                const isHovered = activeLayerIndex === idx;
                return (
                  <motion.div
                    key={layer.depthKey}
                    onMouseEnter={() => setActiveLayerIndex(idx)}
                    onMouseLeave={() => setActiveLayerIndex(null)}
                    whileHover={{ y: shouldReduceMotion ? 0 : -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      borderLeft: `5px solid ${layer.color}`,
                      padding: '18px 18px',
                      backgroundColor: isHovered ? layer.accentBg : 'var(--color-bg)',
                      borderRadius: '12px',
                      border: `1px solid ${isHovered ? layer.color : 'transparent'}`,
                      borderLeftWidth: '5px',
                      borderLeftColor: layer.color,
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 750,
                        color: layer.color,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{t(layer.depthKey)}</span>
                      <span style={{ fontSize: '10px', opacity: 0.85 }}>{layer.depthCm}</span>
                    </div>

                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 750,
                        color: 'var(--color-text)',
                        marginTop: '4px',
                        lineHeight: 1.3,
                      }}
                    >
                      {t(layer.nameKey)}
                    </div>

                    {/* VWC Reading & Temp */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '12px' }}>
                      <span style={{ fontSize: '24px', fontWeight: 850, color: 'var(--color-text)' }}>
                        {layer.vwc}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                        {layer.temp}
                      </span>
                    </div>

                    {/* Moisture Level Visual Fill Bar */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                        borderRadius: '999px',
                        marginTop: '10px',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (layer.vwcNum / 45) * 100)}%` }}
                        transition={{ duration: 1.2, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          backgroundColor: layer.color,
                          borderRadius: '999px',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        marginTop: '10px',
                        fontSize: '11px',
                        color: 'var(--color-text-muted)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span style={{ color: 'var(--color-text-subtle)' }}>{t('home.statusPrefix')}:</span>
                      <span style={{ color: layer.color, fontWeight: 700 }}>{t(layer.statusKey)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          VERIFIED AGRONOMIC CAPABILITIES & STATS RIBBON
          ========================================================================= */}
      <section
        style={{
          padding: '48px 24px',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="ts-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            <motion.div variants={fadeInUp} style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 850, color: 'var(--color-heading)', lineHeight: 1 }}>
                5-Depth
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text)', marginTop: '8px' }}>
                {t('hero.statMoisture')}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {t('hero.statMoistureSub')}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 850, color: 'var(--color-primary)', lineHeight: 1 }}>
                20-30%
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text)', marginTop: '8px' }}>
                {t('hero.statWaterSavings')}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {t('hero.statWaterSavingsSub')}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 850, color: 'var(--color-heading)', lineHeight: 1 }}>
                ±1.5%
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text)', marginTop: '8px' }}>
                {t('hero.statAccuracy')}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {t('hero.statAccuracySub')}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 850, color: 'var(--color-primary)', lineHeight: 1 }}>
                100%
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text)', marginTop: '8px' }}>
                {t('hero.statUptime')}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {t('hero.statUptimeSub')}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          PROBLEM & SOLUTION VISUAL STORY — Clear contrast, no crowded text
          ========================================================================= */}
      <section className="ts-section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="ts-container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span
              className="ts-badge ts-badge-neutral"
              style={{ marginBottom: '16px', padding: '6px 14px', fontSize: '12px' }}
            >
              Root-Zone Diagnostics
            </span>
            <h2 className="ts-heading-section" style={{ marginBottom: '16px' }}>
              From Subsoil Guesswork to Verified Agronomy
            </h2>
            <p className="ts-lead-paragraph" style={{ margin: '0 auto' }}>
              Over 70% of crop water stress happens underground before foliage shows visible wilting. Here is how modern precision sensing changes the outcome.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {/* The Blindspot (Traditional Method) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              className="ts-card-spacious"
              style={{
                borderLeft: '6px solid var(--color-error)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-error-bg)',
                    color: 'var(--color-error)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <XCircle size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text)' }}>
                    Traditional Surface Guesswork
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    High risk of yield reduction and fertilizer loss
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Surface soil dries rapidly under sun and wind while deep roots may be waterlogged, or shallow sprinklers wet only topsoil while taproots starve.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text)' }}>
                  <XCircle size={18} color="var(--color-error)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Irrigation scheduled only after foliage symptoms appear (yield loss has already occurred).</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text)' }}>
                  <XCircle size={18} color="var(--color-error)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Excess irrigation leaches nitrogen fertilizers below root horizons into groundwater.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text)' }}>
                  <XCircle size={18} color="var(--color-error)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Zero data retention or offline synchronization during remote cellular blackouts.</span>
                </div>
              </div>
            </motion.div>

            {/* The Solution (Platform Name) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              className="ts-card-spacious"
              style={{
                borderLeft: '6px solid var(--color-primary)',
                backgroundColor: 'var(--color-surface)',
                boxShadow: '0 8px 30px rgba(23, 107, 69, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
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
                  }}
                >
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-heading)' }}>
                    [Platform Name] Root Intelligence
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
                    Calibrated multi-horizon dielectric assurance
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Calibrated 5-depth digital capacitance tracks wetting front penetration hour by hour. Crops stay protected in the optimal root comfort zone.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Real-time wilting thresholds and refill warnings triggered 48 hours before plant stress.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Wetting front monitoring confirms water reaches active roots without wasteful deep percolation.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-primary)' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Robust offline SQLite spooling with Bluetooth BLE sync guarantees 0% telemetry loss.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS — Connected Visual Workflow
          ========================================================================= */}
      <section className="ts-section" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="ts-container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span
              className="ts-badge ts-badge-success"
              style={{ marginBottom: '16px', padding: '6px 14px', fontSize: '12px' }}
            >
              System Architecture
            </span>
            <h2 className="ts-heading-section" style={{ marginBottom: '16px' }}>
              {t('pipeline.title')}
            </h2>
            <p className="ts-lead-paragraph" style={{ margin: '0 auto' }}>
              {t('pipeline.subtitle')}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              position: 'relative',
            }}
          >
            {[
              {
                step: '01',
                title: t('pipeline.step1Title'),
                icon: Layers,
                desc: t('pipeline.step1Desc'),
                tag: 'SDI-12 / Modbus',
              },
              {
                step: '02',
                title: t('pipeline.step2Title'),
                icon: Bluetooth,
                desc: t('pipeline.step2Desc'),
                tag: 'Offline Spool & BLE',
              },
              {
                step: '03',
                title: t('pipeline.step3Title'),
                icon: Cpu,
                desc: t('pipeline.step3Desc'),
                tag: 'Idempotent Cloud',
              },
              {
                step: '04',
                title: t('pipeline.step4Title'),
                icon: Droplets,
                desc: t('pipeline.step4Desc'),
                tag: 'Deficit Irrigation',
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.step}
                  variants={fadeInUp}
                  whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
                  transition={{ duration: 0.25 }}
                  className="ts-card-spacious"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '12px',
                          backgroundColor: 'var(--color-primary-subtle)',
                          color: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(23, 107, 69, 0.12)',
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span
                        style={{
                          fontSize: '28px',
                          fontWeight: 850,
                          color: 'var(--color-border)',
                          letterSpacing: '-0.03em',
                        }}
                      >
                        {card.step}
                      </span>
                    </div>

                    <span
                      className="ts-badge ts-badge-neutral"
                      style={{ fontSize: '11px', marginBottom: '12px', padding: '3px 8px' }}
                    >
                      {card.tag}
                    </span>

                    <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '12px', color: 'var(--color-text)' }}>
                      {card.title}
                    </h3>

                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                      {card.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)' }}>
                    <span style={{ fontSize: '12px', fontWeight: 650, color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Phase {idx + 1} Pipeline Flow <ChevronRight size={14} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          CORE FEATURE PILLARS — Spacious, Clear Editorial Grid
          ========================================================================= */}
      <section className="ts-section" style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <div className="ts-container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span
              className="ts-badge ts-badge-success"
              style={{ marginBottom: '16px', padding: '6px 14px', fontSize: '12px' }}
            >
              Platform Capabilities
            </span>
            <h2 className="ts-heading-section" style={{ marginBottom: '16px' }}>
              {t('pillars.title')}
            </h2>
            <p className="ts-lead-paragraph" style={{ margin: '0 auto' }}>
              {t('pillars.subtitle')}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {/* Pillar 1 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
              className="ts-card-spacious"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(116, 184, 117, 0.15)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '22px',
                  }}
                >
                  <Waves size={26} />
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '14px' }}>
                  {t('pillar1.title')}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {t('pillar1.desc')}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
                <ul style={{ fontSize: '13px', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar1.b1')}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar1.b2')}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar1.b3')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
              className="ts-card-spacious"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(54, 120, 183, 0.14)',
                    color: 'var(--color-info)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '22px',
                  }}
                >
                  <Activity size={26} />
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '14px' }}>
                  {t('pillar2.title')}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {t('pillar2.desc')}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
                <ul style={{ fontSize: '13px', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar2.b1')}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar2.b2')}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar2.b3')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
              className="ts-card-spacious"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(23, 107, 69, 0.15)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '22px',
                  }}
                >
                  <Droplets size={26} />
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '14px' }}>
                  {t('pillar3.title')}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {t('pillar3.desc')}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
                <ul style={{ fontSize: '13px', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar3.b1')}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar3.b2')}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>{t('pillar3.b3')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          HARDWARE SHOWCASE — Spacious, Prominent Product Cards
          ========================================================================= */}
      <section className="ts-section" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="ts-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '54px',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <span
                className="ts-badge ts-badge-neutral"
                style={{ marginBottom: '12px', padding: '6px 14px', fontSize: '12px' }}
              >
                Industrial Soil Hardware
              </span>
              <h2 className="ts-heading-section" style={{ marginBottom: '8px' }}>
                {t('hw.title')}
              </h2>
              <p className="ts-lead-paragraph">
                {t('hw.subtitle')}
              </p>
            </div>
            <Link to="/products" className="ts-btn ts-btn-outline ts-btn-lg">
              {t('hw.viewCatalog')} <ChevronRight size={18} />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '28px',
            }}
          >
            {[
              {
                slug: 'probe-x5',
                nameKey: 'hw.name1',
                price: 480,
                desc: t('hw.desc1'),
                badge: t('hw.badge1'),
                icon: Layers,
                specs: '10, 20, 30, 40, 50 cm | SDI-12',
              },
              {
                slug: 'probe-x3',
                nameKey: 'hw.name2',
                price: 320,
                desc: t('hw.desc2'),
                badge: t('hw.badge2'),
                icon: Compass,
                specs: '10, 20, 30 cm | Compact Root',
              },
              {
                slug: 'solar-field-gateway',
                nameKey: 'hw.name3',
                price: 550,
                desc: t('hw.desc3'),
                badge: t('hw.badge3'),
                icon: Radio,
                specs: 'LTE-M / NB-IoT • BLE 5.2 • Solar',
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.slug}
                  variants={fadeInUp}
                  whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
                  className="ts-card-spacious"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                      <span className="ts-badge ts-badge-neutral" style={{ padding: '6px 12px' }}>
                        {p.badge}
                      </span>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--color-bg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-primary)',
                        }}
                      >
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px', color: 'var(--color-heading)' }}>
                      {t(p.nameKey)}
                    </h3>

                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '20px' }}>
                      {p.desc}
                    </p>

                    <div
                      style={{
                        padding: '10px 14px',
                        backgroundColor: 'var(--color-bg)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        fontWeight: 600,
                        marginBottom: '24px',
                      }}
                    >
                      {p.specs}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '20px',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Unit Price</span>
                      <span style={{ fontSize: '22px', fontWeight: 850, color: 'var(--color-heading)' }}>
                        {formatBirr(p.price, language)}
                      </span>
                    </div>

                    <Link to={`/products/${p.slug}`} className="ts-btn ts-btn-secondary ts-btn-sm" style={{ padding: '8px 16px' }}>
                      {t('hw.viewSpecs')}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          HEROIC FINAL CALL TO ACTION — Deep Forest Green & Organic Depth
          ========================================================================= */}
      <section
        style={{
          padding: '120px 24px',
          background: 'linear-gradient(180deg, #123B2B 0%, #0A2218 100%)',
          color: '#FFFFFF',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(116, 184, 117, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="ts-container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} style={{ display: 'inline-flex', marginBottom: '20px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  fontSize: '13px',
                  fontWeight: 650,
                  color: '#B2D8C3',
                }}
              >
                <Sparkles size={16} color="var(--color-primary-light)" />
                Continuous Yield & Water Protection
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              style={{
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 850,
                marginBottom: '20px',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
              }}
            >
              {t('cta.title')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: 'clamp(17px, 1.8vw, 20px)',
                color: '#B2D8C3',
                lineHeight: '1.7',
                marginBottom: '44px',
                maxWidth: '700px',
                margin: '0 auto 44px',
              }}
            >
              {t('cta.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}
            >
              <Link
                to="/app"
                className="ts-btn ts-btn-primary ts-btn-lg"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary-dark)',
                  padding: '16px 36px',
                  fontSize: '16px',
                  fontWeight: 750,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                }}
              >
                {t('cta.openPortal')} <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="ts-btn ts-btn-outline ts-btn-lg"
                style={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                  padding: '16px 32px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {t('cta.scheduleConsultation')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
