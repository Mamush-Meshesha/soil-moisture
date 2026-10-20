import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets, ShoppingCart, Menu, X, ArrowRight, Moon, Sun, ShieldCheck } from 'lucide-react';
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

  // WaterScope aligned navigation hierarchy
  const navLinks = [
    { label: t('nav.home', 'Home'), path: '/' },
    { label: t('nav.about', 'About'), path: '/about' },
    { label: t('nav.technology', 'Technology'), path: '/technology' },
    { label: t('nav.ourWork', 'Our Work'), path: '/our-work' },
    { label: t('nav.store', 'Store'), path: '/store' },
    { label: t('nav.contact', 'Contact'), path: '/contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isScrolled
          ? (theme === 'dark' ? 'rgba(11, 27, 44, 0.96)' : 'rgba(255, 255, 255, 0.95)')
          : (theme === 'dark' ? 'rgba(7, 18, 30, 0.90)' : 'rgba(255, 255, 255, 0.90)'),
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isScrolled ? (theme === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0, 102, 153, 0.12)') : 'var(--color-border)'}`,
        boxShadow: isScrolled
          ? (theme === 'dark' ? '0 4px 24px -2px rgba(0, 0, 0, 0.55)' : '0 4px 24px -2px rgba(11, 37, 69, 0.08)')
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
          gap: '16px',
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
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #006699 0%, #0EA5E9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.32)',
              transition: 'transform 200ms ease',
            }}
          >
            <Droplets size={22} />
          </div>
          <div style={{ whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--color-heading)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                }}
              >
                AquaScope
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                }}
              >
                LAB & FIELD
              </span>
            </div>
            <span
              style={{
                fontSize: '9.5px',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              {t('nav.subtitle', 'Water Testing & Safety')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
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
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  transition: 'all 180ms ease',
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
            title={t('app.toggleTheme', 'Toggle Theme')}
            aria-label={t('app.toggleTheme', 'Toggle Theme')}
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
              border: '1px solid var(--color-border)',
            }}
            title={t('store.cart', 'Cart')}
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
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
              style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '8px 14px', fontSize: '13px' }}
            >
              {t('nav.farmPortal', 'Water Safety Portal')} <ArrowRight size={14} />
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <Link
                to="/contact"
                className="ts-btn ts-btn-primary ts-btn-sm"
                style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '13px', borderRadius: '8px' }}
              >
                {t('nav.requestDemo', 'Request Demo')}
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
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="ts-btn ts-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {t('nav.requestDemo', 'Request Demo')}
            </Link>
            <Link
              to="/store"
              onClick={() => setMobileMenuOpen(false)}
              className="ts-btn ts-btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {t('store.title', 'AquaScope Store')}
            </Link>
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

        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
