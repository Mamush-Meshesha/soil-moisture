import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Check,
  ShieldCheck,
  Wrench,
  Layers,
  ArrowLeft,
  Package,
  HelpCircle,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetail() {
      if (!slug) return;
      try {
        setLoading(true);
        const { product } = await api.getProduct(slug);
        setProduct(product);
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ padding: '80px 24px', textAlign: 'center', flex: 1 }}>
          <div className="ts-skeleton" style={{ width: '200px', height: '30px', margin: '0 auto 20px' }} />
          <div className="ts-skeleton" style={{ width: '400px', height: '100px', margin: '0 auto' }} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ padding: '80px 24px', textAlign: 'center', flex: 1 }}>
          <h2>{t('products.notFound')}</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '16px 0 24px' }}>
            {t('products.notFoundDesc')}
          </p>
          <Link to="/products" className="ts-btn ts-btn-primary">
            {t('products.backCatalog')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '24px 24px 16px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            <ArrowLeft size={16} /> {t('products.backCatalog')}
          </Link>
        </div>
      </section>

      <section style={{ padding: '48px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'start',
              marginBottom: '48px',
            }}
          >
            {/* Visual Hardware Schematic */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '24px',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <Layers size={64} />
              </div>
              <span className="ts-badge ts-badge-neutral" style={{ marginBottom: '8px' }}>
                {product.category}
              </span>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {t('products.schematicSubtitle')}
              </div>
            </div>

            {/* Product Purchase Actions & Core Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className={`ts-badge ${product.inStock ? 'ts-badge-success' : 'ts-badge-error'}`}>
                  {product.inStock ? `${t('store.inStock')} (${product.stock_qty})` : t('products.backordered')}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{t('products.sku')}: {product.slug.toUpperCase()}</span>
              </div>

              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
                {product.name}
              </h1>

              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text)', marginBottom: '16px' }}>
                {formatBirr(product.price, language)}
              </div>

              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                {product.description}
              </p>

              {/* Quantity Selector & Add to Cart */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '10px 14px', background: 'var(--color-surface)', border: 'none', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 12px', fontWeight: 700, fontSize: '14px' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '10px 14px', background: 'var(--color-surface)', border: 'none', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`ts-btn ts-btn-lg ${added ? 'ts-btn-secondary' : 'ts-btn-primary'}`}
                  style={{ flex: 1 }}
                >
                  {added ? (
                    <>
                      <Check size={18} color="var(--color-primary)" /> {t('store.itemAdded')}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} /> {t('store.addToCart')} ({formatBirr(product.price * quantity, language)})
                    </>
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to="/checkout" className="ts-btn ts-btn-secondary" style={{ width: '100%' }}>
                  {t('store.checkout')}
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Technical Specifications Table */}
          <div className="ts-card" style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
              {t('products.fullSpecs')}
            </h3>
            <div className="ts-table-container">
              <table className="ts-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 600, width: '35%', color: 'var(--color-text-muted)' }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* What's in the Box & Installation Guidance */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="ts-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Package size={20} color="var(--color-primary)" />
                <h4 style={{ fontSize: '17px', fontWeight: 700 }}>{t('products.whatsIncluded')}</h4>
              </div>
              <ul style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.8', listStyle: 'none' }}>
                <li>• {t('products.item1')}</li>
                <li>• {t('products.item2')}</li>
                <li>• {t('products.item3')}</li>
                <li>• {t('products.item4')}</li>
              </ul>
            </div>

            <div className="ts-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Wrench size={20} color="var(--color-primary)" />
                <h4 style={{ fontSize: '17px', fontWeight: 700 }}>{t('products.installationGuidance')}</h4>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                {t('products.installationDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
