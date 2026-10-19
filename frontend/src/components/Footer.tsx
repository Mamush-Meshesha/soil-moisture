import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: '#FFFFFF',
        padding: '64px 24px 32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}
      >
        {/* Brand & Mission */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary-dark)',
              }}
            >
              <Sprout size={22} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              [Platform Name]
            </span>
          </div>
          <p style={{ fontSize: '14px', color: '#B2D8C3', lineHeight: '1.6', marginBottom: '20px' }}>
            {t('footer.tagline')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#B2D8C3' }}>
            <Shield size={16} color="var(--color-primary-light)" />
            <span>{t('footer.iso')}</span>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>
            {t('nav.technology')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><Link to="/technology" style={{ color: '#B2D8C3' }}>{t('nav.technology')}</Link></li>
            <li><Link to="/products" style={{ color: '#B2D8C3' }}>{t('nav.products')}</Link></li>
            <li><Link to="/solutions" style={{ color: '#B2D8C3' }}>{t('nav.solutions')}</Link></li>
            <li><Link to="/app" style={{ color: '#B2D8C3' }}>{t('nav.farmPortal')}</Link></li>
          </ul>
        </div>

        {/* Resources & Hardware Store */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>
            {t('nav.store')} &amp; {t('nav.resources')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><Link to="/store" style={{ color: '#B2D8C3' }}>{t('nav.store')}</Link></li>
            <li><Link to="/resources" style={{ color: '#B2D8C3' }}>{t('nav.resources')}</Link></li>
            <li><Link to="/about" style={{ color: '#B2D8C3' }}>{t('nav.about')}</Link></li>
            <li><Link to="/contact" style={{ color: '#B2D8C3' }}>{t('nav.contact')}</Link></li>
            <li><Link to="/checkout" style={{ color: '#B2D8C3' }}>{t('store.cart')}</Link></li>
          </ul>
        </div>

        {/* Company & Support */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>
            {t('footer.contactTitle')}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#B2D8C3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="var(--color-primary-light)" />
              <span>{t('footer.address')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--color-primary-light)" />
              <span>support@example.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="var(--color-primary-light)" />
              <span>+1 (555) 012-3456</span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <Link to="/contact" className="ts-btn ts-btn-outline ts-btn-sm" style={{ color: '#FFFFFF', borderColor: '#B2D8C3' }}>
                {t('cta.scheduleConsultation')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '13px',
          color: '#9BB0A3',
        }}
      >
        <div>
          &copy; {new Date().getFullYear()} [Your Company Name / Organization]. {t('footer.rights')}
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/privacy" style={{ color: '#9BB0A3' }}>{t('public.legalPrivacy')}</Link>
          <Link to="/terms" style={{ color: '#9BB0A3' }}>{t('public.legalTerms')}</Link>
          <span>{t('footer.version')}</span>
        </div>
      </div>
    </footer>
  );
};
