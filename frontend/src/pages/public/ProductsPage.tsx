import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, ShieldCheck, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { products } = await api.getProducts(activeCategory === 'ALL' ? undefined : activeCategory);
        setProducts(products);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  const categories = ['ALL', 'Sensors', 'Gateways', 'Accessories', 'Tools'];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ALL': return t('store.all');
      case 'Sensors': return t('store.sensors');
      case 'Gateways': return t('store.gateways');
      case 'Accessories': return t('store.accessories');
      case 'Tools': return t('store.tools');
      default: return cat;
    }
  };

  const handleAdd = (p: Product) => {
    addToCart(p, 1);
    setAddedSlug(p.slug);
    setTimeout(() => setAddedSlug(null), 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '56px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span className="ts-badge ts-badge-success" style={{ marginBottom: '16px' }}>
            {t('products.badge')}
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
            {t('products.title')}
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', maxWidth: '680px', margin: '0 auto' }}>
            {t('products.subtitle')}
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '32px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`ts-btn ts-btn-sm ${activeCategory === cat ? 'ts-btn-primary' : 'ts-btn-secondary'}`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
            {products.map((p) => (
              <div
                key={p.id}
                className="ts-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="ts-badge ts-badge-neutral">{p.category}</span>
                    <span className={`ts-badge ${p.inStock ? 'ts-badge-success' : 'ts-badge-error'}`}>
                      {p.inStock ? `${t('store.inStock')} (${p.stock_qty})` : t('products.backordered')}
                    </span>
                  </div>

                  <Link to={`/products/${p.slug}`}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                      {p.name}
                    </h3>
                  </Link>

                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                    {p.description}
                  </p>

                  {/* Highlights from specs */}
                  <div style={{ backgroundColor: 'var(--color-bg)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
                    {p.specs.depths && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>{t('products.specsHorizons')}:</span>
                        <span style={{ fontWeight: 600 }}>{p.specs.depths}</span>
                      </div>
                    )}
                    {p.specs.interface && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>{t('products.specsInterface')}:</span>
                        <span style={{ fontWeight: 600 }}>{p.specs.interface}</span>
                      </div>
                    )}
                    {p.specs.cellular && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>{t('products.specsCellular')}:</span>
                        <span style={{ fontWeight: 600 }}>{p.specs.cellular}</span>
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
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>{t('products.unitPrice')}</span>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                      {formatBirr(p.price, language)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/products/${p.slug}`} className="ts-btn ts-btn-secondary ts-btn-sm">
                      {t('products.details')}
                    </Link>
                    <button
                      onClick={() => handleAdd(p)}
                      className={`ts-btn ts-btn-sm ${addedSlug === p.slug ? 'ts-btn-secondary' : 'ts-btn-primary'}`}
                    >
                      {addedSlug === p.slug ? (
                        <>
                          <Check size={14} color="var(--color-primary)" /> {t('store.itemAdded')}
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={14} /> {t('store.addToCart')}
                        </>
                      )}
                    </button>
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
