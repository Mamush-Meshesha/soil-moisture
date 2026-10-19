import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, LogIn, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'farmer' | 'admin') => {
    if (role === 'farmer') {
      setEmail('farmer@example.com');
      setPassword('AgriPass2026!');
    } else {
      setEmail('admin@example.com');
      setPassword('AgriPass2026!');
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
              <Sprout size={28} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
              {t('auth.signInTitle')}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              {t('auth.subtitle')}
            </p>
          </div>

          {error && (
            <div className="ts-alert-banner ts-alert-banner-error" style={{ marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="ts-label">{t('auth.password')}</label>
                <Link to="/contact" style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
                  {t('auth.forgotPassword')}
                </Link>
              </div>
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
              {loading ? t('auth.authenticating') : t('auth.submit')}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              {t('auth.quickCredentials')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => fillDemoCredentials('farmer')}
                className="ts-btn ts-btn-secondary ts-btn-sm"
                style={{ fontSize: '12px' }}
              >
                <UserCheck size={14} /> {t('auth.demoFarmer')}
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="ts-btn ts-btn-secondary ts-btn-sm"
                style={{ fontSize: '12px' }}
              >
                <ShieldCheck size={14} /> {t('auth.demoAdmin')}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
              {t('auth.registerNow')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
