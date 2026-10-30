import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Check,
  ShieldCheck,
  ChevronRight,
  Droplets,
  PackageCheck,
  ArrowRight,
  SlidersHorizontal,
  Info,
  Clock,
  Cpu,
  Layers,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { WATER_PRODUCTS } from '../../data/waterProducts';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(WATER_PRODUCTS);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [sortBy, setSortBy] = useState('menu_order');

  const { addToCart, totalItems, subtotal } = useCart();
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchStoreProduct() {
      try {
        const data = await api.getProducts();
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setProducts(WATER_PRODUCTS);
        }
      } catch (err) {
        setProducts(WATER_PRODUCTS);
      }
    }
    fetchStoreProduct();
  }, []);

  const singleProduct = products[0] || WATER_PRODUCTS[0];

  const handleAddToCart = (e: React.MouseEvent, p: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p, 1);
    setAddedSlug(p.slug);
    setTimeout(() => setAddedSlug(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Breadcrumb Bar - WaterScope WooCommerce Style */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13.5px',
            color: '#64748B',
          }}
        >
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 500 }}>
              {t('nav.home', 'Home')}
            </Link>
            <span style={{ color: '#94A3B8' }}>/</span>
            <span style={{ color: '#0F172A', fontWeight: 600 }}>{t('nav.store', 'Store')}</span>
          </nav>

          {totalItems > 0 && (
            <Link
              to="/checkout"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0284C7',
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: 'rgba(2, 132, 199, 0.08)',
                padding: '6px 14px',
                borderRadius: '20px',
              }}
            >
              <ShoppingCart size={15} />
              <span>
                {totalItems} {totalItems === 1 ? 'item' : 'items'} · {formatBirr(subtotal, language)}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Store Header */}
      <section style={{ padding: '40px 24px 20px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#132745',
              fontFamily: 'Montserrat, Inter, sans-serif',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            {t('nav.store', 'Store')}
          </h1>

          {/* WooCommerce Toolbar: Count & Sort */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              paddingBottom: '24px',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <p style={{ margin: 0, fontSize: '15px', color: '#64748B' }}>
              Showing the single result
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="menu_order">Default sorting</option>
                <option value="popularity">Sort by popularity</option>
                <option value="rating">Sort by average rating</option>
                <option value="date">Sort by latest</option>
                <option value="price">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* WaterScope Single Product Showcase - Faithful to waterscope.org/store/ */}
      <section style={{ padding: '40px 24px 72px', flex: 1 }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 380px))',
              justifyContent: 'start',
              gap: '32px',
            }}
          >
            {/* Single Product Card */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '24px 24px 30px',
                textAlign: 'center',
                boxShadow: isHovered ? '0 16px 32px rgba(19, 39, 69, 0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 300ms ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Link
                to={`/products/${singleProduct.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                {/* Secondary Image Crossfade Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#FFFFFF',
                    overflow: 'hidden',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Primary Studio Shot (3-1.png) */}
                  <img
                    src="/images/waterscope-kit-3-1.png"
                    alt={singleProduct.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: isHovered ? 'translate(-50%, -50%) scale(1.03)' : 'translate(-50%, -50%) scale(1)',
                      opacity: isHovered ? 0 : 1,
                      transition: 'opacity 350ms ease, transform 350ms ease',
                    }}
                  />

                  {/* Secondary Image (incubator.jpg) on hover */}
                  <img
                    src="/images/incubator.jpg"
                    alt="WaterScope Smart Incubator"
                    style={{
                      maxWidth: '85%',
                      maxHeight: '85%',
                      objectFit: 'contain',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: isHovered ? 'translate(-50%, -50%) scale(1.03)' : 'translate(-50%, -50%) scale(0.98)',
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 350ms ease, transform 350ms ease',
                    }}
                  />
                </div>

                {/* Product Title */}
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#132745',
                    fontFamily: 'Montserrat, Inter, sans-serif',
                    marginBottom: '10px',
                    lineHeight: 1.4,
                    transition: 'color 200ms ease',
                  }}
                >
                  {singleProduct.name}
                </h2>

                {/* Product Price */}
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#132745',
                    marginBottom: '20px',
                  }}
                >
                  <span>$149.00</span>
                  {language !== 'en' && (
                    <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '6px', fontWeight: 400 }}>
                      ({formatBirr(singleProduct.price, language)})
                    </span>
                  )}
                </div>
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => handleAddToCart(e, singleProduct)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: addedSlug === singleProduct.slug ? '#059669' : '#132745',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 250ms ease, transform 150ms ease',
                  boxShadow: '0 2px 6px rgba(19, 39, 69, 0.15)',
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {addedSlug === singleProduct.slug ? (
                  <>
                    <Check size={17} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={17} /> Add to cart
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Authentic WaterScope Kit Highlights Breakdown */}
          <div
            style={{
              marginTop: '64px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '40px 32px',
            }}
          >
            <div style={{ maxWidth: '840px', marginBottom: '32px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0284C7',
                  backgroundColor: 'rgba(2, 132, 199, 0.08)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '10px',
                }}
              >
                <PackageCheck size={14} /> The WaterScope System
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#132745', marginBottom: '8px' }}>
                Complete Bacterial Water Testing in Any Location
              </h3>
              <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
                WaterScope is a rapid, simple, digital bacterial testing kit for drinking water, enabling inclusive
                access to smart, reliable testing without requiring extensive laboratory infrastructure or aseptic
                sterilization knowledge.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
              }}
            >
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Clock size={22} color="#0284C7" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  8–21 Hours Turnaround
                </h4>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Provides early indication of bacterial contamination in 8 hours and full quantitative ISO 9308-1 count
                  in 21–24 hours.
                </p>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Cpu size={22} color="#0284C7" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  Automated AI Colony Count
                </h4>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  High-resolution optical scanner and image recognition automatically count colonies, removing manual
                  counting error.
                </p>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Layers size={22} color="#0284C7" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  Patented Cartridge System
                </h4>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Pre-sterilized metal cartridge eliminates aseptic technique prerequisites, making testing safe and
                  foolproof in field settings.
                </p>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Droplets size={22} color="#0284C7" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  Lab in a Box (&lt;6 kg)
                </h4>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Ruggedized all-weather carry case, integrated lithium battery buffer, and compliant with all IATA
                  flight carriage rules.
                </p>
              </div>
            </div>

            {/* In the Box Checklist */}
            <div
              style={{
                marginTop: '32px',
                paddingTop: '28px',
                borderTop: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  What is included in the Basic Kit?
                </h4>
                <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                  Includes 1× WaterScope Digital Reader, 1× Smart Thermal Incubator, 5× E. coli Cartridges, 1× Vacuum
                  Syringe, Power Adapter, and Rugged Carry Case.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link
                  to={`/products/${singleProduct.slug}`}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  View Full Specifications <ChevronRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px',
                    backgroundColor: '#132745',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Institutional / NGO Quote <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StorePage;
