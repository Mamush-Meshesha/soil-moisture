import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';
import { api } from '../../services/api';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const CheckoutPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '[Customer Name / Farm Manager]',
    email: 'farmer@example.com',
    street: '[123 Farm Road, Plot Alpha]',
    city: '[City]',
    state: '[State / Region]',
    zip: '[Postal Code]',
    country: '[Country]',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    const orderPayload = {
      customerEmail: formData.email,
      customerName: formData.name,
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      },
      items: items.map((i) => ({
        productId: i.product.id,
        slug: i.product.slug,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      totalAmount: subtotal,
    };

    try {
      const res = await api.checkout(orderPayload);
      setCompletedOrder(res.order);
      clearCart();
    } catch (err: any) {
      alert(`Checkout failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px', textAlign: 'center', flex: 1 }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <span className="ts-badge ts-badge-success" style={{ marginBottom: '12px' }}>
            Sandbox Payment Simulated
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
            {t('store.orderConfirmed')}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
            {t('checkout.orderRef')}: <strong>{completedOrder.id}</strong> (Payment Ref: {completedOrder.payment_reference})
          </p>

          <div className="ts-card" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              {t('store.shippingAddress')}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-text)' }}>
              {completedOrder.customer_name} <br />
              {completedOrder.shippingAddress?.street} <br />
              {completedOrder.shippingAddress?.city}, {completedOrder.shippingAddress?.state} {completedOrder.shippingAddress?.zip} <br />
              {completedOrder.shippingAddress?.country}
            </p>

            <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '20px', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              {t('checkout.orderedItems')}
            </h3>
            {completedOrder.items?.map((it: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '6px 0' }}>
                <span>{it.quantity}x {it.name}</span>
                <span style={{ fontWeight: 600 }}>{formatBirr(it.price * it.quantity, language)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
              <span>{t('checkout.totalPaid')}</span>
              <span>{formatBirr(completedOrder.total_amount, language)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/store" className="ts-btn ts-btn-secondary">
              {t('checkout.returnStore')}
            </Link>
            <Link to="/app" className="ts-btn ts-btn-primary">
              {t('checkout.goDashboard')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '36px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {t('checkout.title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {t('checkout.subtitle')}
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {items.length === 0 ? (
            <div className="ts-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
              <ShoppingCart size={48} style={{ color: 'var(--color-text-muted)', margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>{t('store.emptyCart')}</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                {t('checkout.emptySub')}
              </p>
              <Link to="/store" className="ts-btn ts-btn-primary">
                {t('checkout.exploreCatalog')}
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Cart Review */}
              <div className="ts-card">
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>
                  {t('checkout.selectedEquipment')} ({totalItems} {t('checkout.items')})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {items.map((it) => (
                    <div
                      key={it.product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '16px',
                        borderBottom: '1px solid var(--color-border-subtle)',
                        gap: '12px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700 }}>{it.product.name}</h4>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                          {formatBirr(it.product.price, language)} {t('checkout.each')}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={it.quantity}
                          onChange={(e) => updateQuantity(it.product.id, parseInt(e.target.value, 10) || 1)}
                          className="ts-input"
                          style={{ width: '60px', padding: '4px 8px', textAlign: 'center' }}
                        />
                        <button
                          onClick={() => removeFromCart(it.product.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '15px', minWidth: '70px', textAlign: 'right' }}>
                        {formatBirr(it.product.price * it.quantity, language)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '2px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{t('store.subtotal')}</span>
                    <span>{formatBirr(subtotal, language)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{t('store.shipping')}</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{t('store.freeShipping')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, marginTop: '12px' }}>
                    <span>{t('store.total')}</span>
                    <span style={{ color: 'var(--color-primary-dark)' }}>{formatBirr(subtotal, language)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Payment Form */}
              <div className="ts-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <ShieldCheck size={20} color="var(--color-primary)" />
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>{t('checkout.title')}</h3>
                </div>

                <div className="ts-alert-banner ts-alert-banner-info" style={{ marginBottom: '20px' }}>
                  <div>
                    {t('checkout.sandboxNotice')}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="ts-form-group">
                    <label className="ts-label">{t('checkout.fullName')}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="ts-input"
                    />
                  </div>

                  <div className="ts-form-group">
                    <label className="ts-label">{t('checkout.email')}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="ts-input"
                    />
                  </div>

                  <div className="ts-form-group">
                    <label className="ts-label">{t('checkout.street')}</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="ts-input"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="ts-form-group">
                      <label className="ts-label">{t('checkout.city')}</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="ts-input"
                      />
                    </div>
                    <div className="ts-form-group">
                      <label className="ts-label">{t('checkout.state')}</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="ts-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="ts-form-group">
                      <label className="ts-label">{t('checkout.zip')}</label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="ts-input"
                      />
                    </div>
                    <div className="ts-form-group">
                      <label className="ts-label">{t('checkout.country')}</label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="ts-input"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ts-btn ts-btn-primary ts-btn-lg"
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    {isSubmitting ? t('checkout.processingOrder') : `${t('store.placeOrder')} (${formatBirr(subtotal, language)})`}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
