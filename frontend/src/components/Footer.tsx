import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Mail, Phone, MapPin, ShieldCheck, Check, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: '#FFFFFF',
        padding: '72px 24px 36px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
          marginBottom: '56px',
        }}
      >
        {/* Brand & Purpose */}
        <div style={{ maxWidth: '340px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0B2545',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.35)',
              }}
            >
              <Droplets size={22} />
            </div>
            <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              AquaScope
            </span>
          </div>
          <p style={{ fontSize: '14.5px', color: '#94A9C0', lineHeight: '1.65', marginBottom: '22px' }}>
            {t('footer.tagline', 'Smart, accessible drinking-water quality testing. Empowering laboratories, health workers, and communities worldwide to detect bacterial contamination rapidly and reliably.')}
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'rgba(14, 165, 233, 0.12)',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '12.5px',
              color: '#38BDF8',
              fontWeight: 600,
            }}
          >
            <ShieldCheck size={16} />
            <span>{t('footer.iso', 'ISO 9308-1 Benchmarked Filtration')}</span>
          </div>
        </div>

        {/* Technology & Products */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '18px', color: '#FFFFFF', letterSpacing: '0.02em' }}>
            {t('footer.colTech', 'Technology & Kits')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <li>
              <Link to="/technology" style={{ color: '#94A9C0', textDecoration: 'none', transition: 'color 150ms ease' }}>
                {t('nav.technology', 'Technology')}
              </Link>
            </li>
            <li>
              <Link to="/technology" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('pipeline.step2Title', 'Membrane Filtration')}
              </Link>
            </li>
            <li>
              <Link to="/technology" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('pipeline.step5Title', 'Optical Microcolony Detection')}
              </Link>
            </li>
            <li>
              <Link to="/store" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('store.sensors', 'Testing Kits')}
              </Link>
            </li>
            <li>
              <Link to="/store" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('store.accessories', 'Consumables')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Impact & Work */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '18px', color: '#FFFFFF', letterSpacing: '0.02em' }}>
            {t('footer.colImpact', 'Impact & Field Work')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <li>
              <Link to="/our-work" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('farms.title', 'Field Trials & Deployments')}
              </Link>
            </li>
            <li>
              <Link to="/our-work" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('solutions.c1Title', 'Humanitarian & WASH Programs')}
              </Link>
            </li>
            <li>
              <Link to="/about" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('about.badge', 'Our Mission & Approach')}
              </Link>
            </li>
            <li>
              <Link to="/resources" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('resources.tableTitle', 'WHO Drinking Water Guidelines')}
              </Link>
            </li>
            <li>
              <Link to="/contact" style={{ color: '#94A9C0', textDecoration: 'none' }}>
                {t('nav.contact', 'Contact')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & UN SDG 6 */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: '#FFFFFF', letterSpacing: '0.02em' }}>
            {t('footer.colUpdates', 'Field Updates & Reports')}
          </h4>
          <p style={{ fontSize: '13px', color: '#94A9C0', lineHeight: '1.6', marginBottom: '16px' }}>
            {t('footer.tagline', 'Receive field trial reports, technical whitepapers, and updates on accessible water testing innovations.')}
          </p>

          {subscribed ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: 'rgba(5, 150, 105, 0.2)',
                borderRadius: '8px',
                color: '#34D399',
                fontSize: '13.5px',
                fontWeight: 600,
              }}
            >
              <Check size={16} /> {t('footer.subscribed', 'Subscribed to Field Bulletins!')}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="email"
                required
                placeholder={t('footer.newsletterPlaceholder', 'Enter your institutional email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="ts-btn ts-btn-primary"
                style={{ padding: '9px 14px', fontSize: '13px' }}
              >
                {t('footer.subscribe', 'Subscribe')}
              </button>
            </form>
          )}

          {/* SDG 6 Badge */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(0, 102, 153, 0.25)',
              borderRadius: '10px',
              border: '1px solid rgba(14, 165, 233, 0.2)',
              fontSize: '12px',
              color: '#BAE6FD',
              lineHeight: '1.5',
            }}
          >
            <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '2px' }}>
              {t('footer.sdgShort', 'UN SDG 6 Target 6.1 Alignment')}
            </strong>
            {t('footer.sdgDesc', 'Working towards universal and equitable access to safe and affordable drinking water for all.')}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: '#829AB1',
        }}
      >
        <div>
          &copy; {new Date().getFullYear()} AquaScope Ltd. {t('footer.rights', 'All rights reserved.')}
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/privacy" style={{ color: '#829AB1', textDecoration: 'none' }}>
            {t('footer.terms', 'Terms of Service')}
          </Link>
          <Link to="/privacy" style={{ color: '#829AB1', textDecoration: 'none' }}>
            {t('footer.privacy', 'Privacy Policy')}
          </Link>
          <Link to="/contact" style={{ color: '#829AB1', textDecoration: 'none' }}>
            {t('nav.contact', 'Contact')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
