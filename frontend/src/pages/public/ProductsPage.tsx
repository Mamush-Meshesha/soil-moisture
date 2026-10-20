import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, ShieldCheck, ChevronRight, Droplets, Filter, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { WATER_PRODUCTS } from '../../data/waterProducts';
import { useCart } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(WATER_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await api.getProducts(activeCategory === 'ALL' ? undefined : activeCategory);
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          // Filter fallback products
          if (activeCategory === 'ALL') {
            setProducts(WATER_PRODUCTS);
          } else {
            setProducts(WATER_PRODUCTS.filter((p) => p.category === activeCategory));
          }
        }
      } catch (err) {
        if (activeCategory === 'ALL') {
          setProducts(WATER_PRODUCTS);
        } else {
          setProducts(WATER_PRODUCTS.filter((p) => p.category === activeCategory));
        }
      }
    }
    fetchProducts();
  }, [activeCategory]);

  const categories = ['ALL', 'Testing Kits', 'Equipment', 'Consumables', 'Accessories'];

  const handleAdd = (p: Product) => {
    addToCart(p, 1);
    setAddedSlug(p.slug);
    setTimeout(() => setAddedSlug(null), 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '64px 24px 48px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-primary-subtle)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              color: 'var(--color-primary)',
              fontSize: '13.5px',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            <Droplets size={16} /> Water Testing Hardware &amp; Consumables
          </div>

          <h1
            style={{
              fontSize: '40px',
              fontWeight: 900,
              color: 'var(--color-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '14px',
            }}
          >
            Water Quality Testing Catalog
          </h1>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--color-text-muted)',
              maxWidth: '720px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            Explore our field-tested equipment, portable incubators, membrane filtration units, and
            single-use consumables designed for reliable bacteriological water testing.
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`ts-btn ts-btn-sm ${activeCategory === cat ? 'ts-btn-primary' : 'ts-btn-secondary'}`}
                style={{ borderRadius: '20px', padding: '7px 18px' }}
              >
                {cat === 'ALL' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="ts-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-xl)',
                  padding: '0',
                  overflow: 'hidden',
                }}
              >
                {/* Product Photo */}
                <div
                  style={{
                    height: '210px',
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
                    {p.inStock ? `In Stock (${p.stock_qty || 25})` : 'Order on Request'}
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
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
                        marginBottom: '16px',
                      }}
                    >
                      {p.description}
                    </p>

                    {/* Specs preview */}
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
                          <span style={{ color: 'var(--color-text-muted)' }}>Standard:</span>
                          <span style={{ fontWeight: 600 }}>{p.specs.method}</span>
                        </div>
                      )}
                      {p.specs.speed && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Speed:</span>
                          <span style={{ fontWeight: 600 }}>{p.specs.speed}</span>
                        </div>
                      )}
                      {p.specs.target && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Target:</span>
                          <span style={{ fontWeight: 600 }}>{p.specs.target}</span>
                        </div>
                      )}
                      {p.specs.poreSize && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Pore Size:</span>
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
                        Unit Price
                      </span>
                      <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--color-primary)' }}>
                        {formatBirr(p.price, language)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/products/${p.slug}`} className="ts-btn ts-btn-secondary ts-btn-sm">
                        Specifications
                      </Link>
                      <button
                        onClick={() => handleAdd(p)}
                        className={`ts-btn ts-btn-sm ${addedSlug === p.slug ? 'ts-btn-secondary' : 'ts-btn-primary'}`}
                      >
                        {addedSlug === p.slug ? (
                          <>
                            <Check size={14} color="var(--color-primary)" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={14} /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
