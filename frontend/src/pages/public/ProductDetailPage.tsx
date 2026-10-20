import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Check,
  ShieldCheck,
  Layers,
  ArrowLeft,
  Package,
  HelpCircle,
  Droplets,
  Microscope,
  FileCheck,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { WATER_PRODUCTS } from '../../data/waterProducts';
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
        const data = await api.getProduct(slug);
        if (data && data.product) {
          setProduct(data.product);
        } else {
          const found = WATER_PRODUCTS.find((p) => p.slug === slug) || WATER_PRODUCTS[0];
          setProduct(found);
        }
      } catch (err) {
        const found = WATER_PRODUCTS.find((p) => p.slug === slug) || WATER_PRODUCTS[0];
        setProduct(found);
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
          <h2>Testing Equipment Not Found</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '16px 0 24px' }}>
            The requested testing item could not be found.
          </p>
          <Link to="/products" className="ts-btn ts-btn-primary">
            Back to Water Testing Catalog
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

      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13.5px',
              color: 'var(--color-primary)',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} /> Back to Water Testing Catalog
          </Link>
        </div>
      </section>

      <section style={{ padding: '48px 24px 80px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '48px',
              alignItems: 'start',
              marginBottom: '48px',
            }}
          >
            {/* Real Product Photograph */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <img
                src={product.image_url || product.image || '/images/portable-kit-system.jpg'}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '380px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="ts-badge ts-badge-neutral">{product.category}</span>
                <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                  ISO 9308-1 Benchmarked
                </span>
              </div>
            </div>

            {/* Product Purchase Actions & Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className={`ts-badge ${product.inStock ? 'ts-badge-success' : 'ts-badge-error'}`}>
                  {product.inStock ? `In Stock (${product.stock_qty || 25} units)` : 'Available on Request'}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  SKU: {product.slug.toUpperCase()}
                </span>
              </div>

              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: 'var(--color-heading)',
                  marginBottom: '14px',
                  lineHeight: 1.25,
                }}
              >
                {product.name}
              </h1>

              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: 'var(--color-primary)',
                  marginBottom: '18px',
                }}
              >
                {formatBirr(product.price, language)}
              </div>

              <p
                style={{
                  fontSize: '15.5px',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.65',
                  marginBottom: '28px',
                }}
              >
                {product.description}
              </p>

              {/* Quantity Selector & Add to Cart */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '10px 16px', background: 'var(--color-surface)', border: 'none', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 14px', fontWeight: 700, fontSize: '15px' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '10px 16px', background: 'var(--color-surface)', border: 'none', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`ts-btn ts-btn-lg ${added ? 'ts-btn-secondary' : 'ts-btn-primary'}`}
                  style={{ flex: 1, padding: '12px 20px' }}
                >
                  {added ? (
                    <>
                      <Check size={18} color="var(--color-primary)" /> Item Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} /> Add to Cart ({formatBirr(product.price * quantity, language)})
                    </>
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to="/checkout" className="ts-btn ts-btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Proceed to Checkout
                </Link>
                <Link to="/contact" className="ts-btn ts-btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Request Institutional Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Specifications Breakdown */}
          <div className="ts-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
              Microbiological &amp; Hardware Specifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    padding: '14px',
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <strong style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                    {val}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
