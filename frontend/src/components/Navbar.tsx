import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, ShoppingCart, Menu, X, ArrowRight, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LanguageSelector } from './LanguageSelector';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.technology'), path: '/technology' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.solutions'), path: '/solutions' },
    { label: t('nav.store'), path: '/store' },
    { label: t('nav.resources'), path: '/resources' },
    { label: t('nav.about'), path: '/about' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isScrolled
          ? (theme === 'dark' ? 'rgba(18, 33, 25, 0.94)' : 'rgba(255, 255, 255, 0.94)')
          : (theme === 'dark' ? 'rgba(11, 20, 15, 0.88)' : 'rgba(255, 255, 255, 0.85)'),
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isScrolled ? (theme === 'dark' ? 'rgba(116, 184, 117, 0.15)' : 'rgba(23, 107, 69, 0.12)') : 'var(--color-border)'}`,
        boxShadow: isScrolled
          ? (theme === 'dark' ? '0 4px 24px -2px rgba(0, 0, 0, 0.5)' : '0 4px 24px -2px rgba(18, 59, 43, 0.08)')
          : 'none',
        transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
          height: isScrolled ? '66px' : '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          transition: 'height 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
            textDecoration: 'none',
            minWidth: 'max-content',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(23, 107, 69, 0.25)',
              transition: 'transform 200ms ease',
            }}
          >
            <Sprout size={22} />
          </div>
          <div style={{ whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--color-heading)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
              }}
            >
              [Platform Name]
            </span>
            <span
              style={{
                fontSize: '9.5px',
                display: 'block',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              {t('nav.subtitle')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2px',
            flexShrink: 1,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="nav-desktop-link"
                style={{
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-primary-light)' : 'var(--color-text)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Language Selector */}
          <LanguageSelector />

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '7px',
              cursor: 'pointer',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
            }}
            title={t('app.toggleTheme')}
            aria-label={t('app.toggleTheme')}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="var(--color-warning)" />}
          </button>

          {/* Hardware Store Cart Icon */}
          <Link
            to="/checkout"
            style={{
              position: 'relative',
              padding: '7px',
              borderRadius: '8px',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            title={t('store.cart')}
          >
            <ShoppingCart size={19} />
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '1px',
                  right: '1px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '17px',
                  height: '17px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              to="/app"
              className="ts-btn ts-btn-primary ts-btn-sm"
              style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '7px 14px', fontSize: '13px' }}
            >
              {t('nav.farmPortal')} <ArrowRight size={14} />
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <Link
                to="/login"
                className="ts-btn ts-btn-secondary ts-btn-sm"
                style={{ whiteSpace: 'nowrap', padding: '7px 12px', fontSize: '13px' }}
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/contact"
                className="ts-btn ts-btn-primary ts-btn-sm"
                style={{ whiteSpace: 'nowrap', padding: '7px 14px', fontSize: '13px' }}
              >
                {t('nav.requestDemo', t('hero.requestDemo'))}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              color: 'var(--color-text)',
              flexShrink: 0,
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--color-text)',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: location.pathname === link.path ? 'var(--color-primary-subtle)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '14px',
              marginTop: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {user ? (
              <Link
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="ts-btn ts-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {t('nav.farmPortal')} <ArrowRight size={16} />
              </Link>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="ts-btn ts-btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="ts-btn ts-btn-primary"
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  {t('nav.requestDemo', t('hero.requestDemo'))}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav {
          display: none !important;
        }
        .mobile-toggle {
          display: flex !important;
        }

        @media (min-width: 1080px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }

        @media (min-width: 1080px) and (max-width: 1240px) {
          .nav-desktop-link {
            padding: 5px 7px !important;
            font-size: 13px !important;
          }
          .lang-label-text {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .lang-label-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
