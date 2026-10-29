import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplets } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(email, password, fullName, organization);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ts-card" style={{ maxWidth: '440px', width: '100%', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                margin: '0 auto 12px',
              }}
            >
              <Droplets size={28} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-heading)' }}>
              {t('auth.createAccountTitle')}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              {t('auth.registerSubtitle')}
            </p>
          </div>

          {error && (
            <div className="ts-alert-banner ts-alert-banner-error" style={{ marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="ts-form-group">
              <label className="ts-label">{t('auth.fullName')}</label>
              <input
                type="text"
                required
                placeholder="[Your Full Name]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="ts-input"
              />
            </div>

            <div className="ts-form-group">
              <label className="ts-label">{t('auth.organization')}</label>
              <input
                type="text"
                required
                placeholder="[Your Farm / Organization Name]"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="ts-input"
              />
            </div>

            <div className="ts-form-group">
              <label className="ts-label">{t('auth.email')}</label>
              <input
                type="email"
                required
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ts-input"
              />
            </div>

            <div className="ts-form-group">
              <label className="ts-label">{t('auth.password')}</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ts-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="ts-btn ts-btn-primary"
              style={{ width: '100%', padding: '12px', marginTop: '8px' }}
            >
              {loading ? t('auth.creatingAccount') : t('auth.registerSubmit')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
              {t('auth.signInLink')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
