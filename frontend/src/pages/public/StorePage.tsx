import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Filter, ArrowRight, Check, Droplets, ShieldCheck } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const { addToCart, totalItems, subtotal } = useCart();
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await api.getProducts(selectedCategory === 'ALL' ? undefined : selectedCategory);
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          if (selectedCategory === 'ALL') {
            setProducts(WATER_PRODUCTS);
          } else {
            setProducts(WATER_PRODUCTS.filter((p) => p.category === selectedCategory));
          }
        }
      } catch (err) {
        if (selectedCategory === 'ALL') {
          setProducts(WATER_PRODUCTS);
        } else {
          setProducts(WATER_PRODUCTS.filter((p) => p.category === selectedCategory));
        }
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (p: Product) => {
    addToCart(p, 1);
    setAddedSlug(p.slug);
    setTimeout(() => setAddedSlug(null), 1500);
  };

  const categories = ['ALL', 'Testing Kits', 'Equipment', 'Consumables', 'Accessories'];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ALL':
        return t('store.all', 'All Products');
      case 'Testing Kits':
        return t('store.sensors', 'Testing Kits');
      case 'Equipment':
        return t('store.gateways', 'Equipment');
      case 'Consumables':
        return t('store.accessories', 'Consumables');
      case 'Accessories':
        return t('store.tools', 'Accessories');
      default:
        return cat;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Store Header */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '56px 24px 40px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}
              >
                <Droplets size={14} /> {t('store.badge', 'Official Water Testing Hardware & Reagents')}
              </div>
              <h1
                style={{
                  fontSize: '38px',
                  fontWeight: 900,
                  color: 'var(--color-heading)',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('store.title', 'AquaScope Store')}
              </h1>
              <p style={{ fontSize: '15.5px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                {t('store.subtitle', 'Order certified testing kits, motorized vacuum pumps, and sterile filtration consumables.')}
              </p>
            </div>

            <Link
              to="/checkout"
              className="ts-btn ts-btn-primary"
              style={{
                padding: '12px 22px',
                fontSize: '14.5px',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)',
              }}
            >
              <ShoppingCart size={18} /> {t('store.cart', 'Review Cart')} ({totalItems} {t('checkout.items', 'items')} · {formatBirr(subtotal, language)})
            </Link>
          </div>

          {/* Search & Category Filter Bar */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '36px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                type="text"
                placeholder={t('store.searchPlaceholder', 'Search testing kits, pumps, sliders...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ts-input"
                style={{
                  width: '100%',
                  paddingLeft: '42px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`ts-btn ts-btn-sm ${selectedCategory === cat ? 'ts-btn-primary' : 'ts-btn-secondary'}`}
                  style={{ borderRadius: '20px', padding: '6px 14px' }}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section style={{ padding: '48px 24px 80px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div
              className="ts-card"
              style={{
                textAlign: 'center',
                padding: '64px 20px',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <Droplets size={48} color="var(--color-text-subtle)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                No matching testing products found
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                Try adjusting your search criteria or explore our complete catalog.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('ALL');
                }}
                className="ts-btn ts-btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '32px',
              }}
            >
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="ts-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '0',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-xl)',
                  }}
                >
                  {/* Photo & Status Badge */}
                  <div
                    style={{
                      height: '220px',
                      backgroundColor: 'var(--color-surface-sunken)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={p.image_url || p.image || '/images/portable-kit-system.jpg'}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(11, 37, 69, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                      }}
                    >
                      {p.category}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: p.inStock ? 'rgba(5, 150, 105, 0.9)' : 'rgba(225, 29, 72, 0.9)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                      }}
                    >
                      {p.inStock ? `Available (${p.stock_qty || 25})` : 'Pre-order'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <Link to={`/products/${p.slug}`}>
                        <h3
                          style={{
                            fontSize: '19px',
                            fontWeight: 800,
                            color: 'var(--color-heading)',
                            marginBottom: '8px',
                            lineHeight: 1.3,
                          }}
                        >
                          {p.name}
                        </h3>
                      </Link>

                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.6,
                          marginBottom: '18px',
                        }}
                      >
                        {p.description}
                      </p>

                      {/* Specs Mini List */}
                      <div
                        style={{
                          backgroundColor: 'var(--color-bg)',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          marginBottom: '20px',
                          fontSize: '12.5px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        {p.specs.method && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Protocol:</span>
                            <span style={{ fontWeight: 600 }}>{p.specs.method}</span>
                          </div>
                        )}
                        {p.specs.speed && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Turnaround:</span>
                            <span style={{ fontWeight: 600 }}>{p.specs.speed}</span>
                          </div>
                        )}
                        {p.specs.target && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Detection:</span>
                            <span style={{ fontWeight: 600 }}>{p.specs.target}</span>
                          </div>
                        )}
                        {p.specs.poreSize && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Membrane:</span>
                            <span style={{ fontWeight: 600 }}>{p.specs.poreSize}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--color-border)',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>
                          {t('products.unitPrice', 'Unit Price')}
                        </span>
                        <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--color-primary)' }}>
                          {formatBirr(p.price, language)}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/products/${p.slug}`} className="ts-btn ts-btn-secondary ts-btn-sm">
                          {t('products.details', 'Details')}
                        </Link>
                        <button
                          onClick={() => handleAdd(p)}
                          className={`ts-btn ts-btn-sm ${addedSlug === p.slug ? 'ts-btn-secondary' : 'ts-btn-primary'}`}
                        >
                          {addedSlug === p.slug ? (
                            <>
                              <Check size={14} color="var(--color-primary)" /> {t('store.itemAdded', 'Added!')}
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={14} /> {t('store.addToCart', 'Add')}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Support & Logistics Note */}
      <section style={{ backgroundColor: 'var(--color-surface)', padding: '48px 24px', borderTop: '1px solid var(--color-border)' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <ShieldCheck size={24} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                Warranty &amp; Calibration
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                All optical camera modules and thermal incubation chambers include a 2-year warranty and factory calibration certificates.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <Droplets size={24} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                Consumables Re-Supply
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Membrane sliders and selective culture broth pads are shipped in ambient-stable protective packaging worldwide.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <ArrowRight size={24} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                Institutional Orders
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Bulk pricing, tax exemptions, and purchase order processing are available for NGOs, universities, and water utilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StorePage;
