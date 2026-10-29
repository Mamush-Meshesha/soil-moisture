import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, ArrowLeft } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ padding: '80px 24px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-primary-subtle)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Droplets size={36} />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '12px' }}>
          404 – {t('public.notFoundTitle')}
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', maxWidth: '480px', marginBottom: '28px', lineHeight: '1.6' }}>
          {t('public.notFoundDesc')}
        </p>
        <Link to="/" className="ts-btn ts-btn-primary">
          <ArrowLeft size={16} /> {t('public.backHome')}
        </Link>
      </div>
      <Footer />
    </div>
  );
};
