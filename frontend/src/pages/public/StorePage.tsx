import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Filter, ArrowRight, Check } from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const { addToCart, totalItems, subtotal } = useCart();
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { products } = await api.getProducts(selectedCategory === 'ALL' ? undefined : selectedCategory);
        setProducts(products);
      } catch (err) {
        console.error('Failed to load store products:', err);
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '48px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="ts-badge ts-badge-success" style={{ marginBottom: '12px' }}>
                {t('store.orderMode')}
              </span>
              <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                {t('store.title')}
              </h1>
              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {t('store.subtitle')}
              </p>
            </div>

            <Link to="/checkout" className="ts-btn ts-btn-primary">
              <ShoppingCart size={18} /> {t('store.cart')}: {totalItems} ({formatBirr(subtotal, language)})
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
              />
              <input
                type="text"
                placeholder={t('store.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ts-input"
                style={{ width: '100%', paddingLeft: '40px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['ALL', 'Sensors', 'Gateways', 'Accessories', 'Tools'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`ts-btn ts-btn-sm ${selectedCategory === cat ? 'ts-btn-primary' : 'ts-btn-secondary'}`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {filtered.map((p) => (
              <div
                key={p.id}
                className="ts-card"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="ts-badge ts-badge-neutral">{p.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{p.stock_qty} {t('store.qtyInStock')}</span>
                  </div>
                  <Link to={`/products/${p.slug}`}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text)' }}>
                      {p.name}
                    </h3>
                  </Link>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                    {p.description}
                  </p>
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
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                    {formatBirr(p.price, language)}
                  </span>
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
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
