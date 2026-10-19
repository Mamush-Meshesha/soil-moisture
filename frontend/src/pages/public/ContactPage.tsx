import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farmSize: '50 - 250 Hectares',
    interest: 'Soil Moisture Platform Demo',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await api.submitContact(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ backgroundColor: 'var(--color-surface)', padding: '56px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="ts-badge ts-badge-success" style={{ marginBottom: '16px' }}>
            {t('contact.badge')}
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
            {t('public.contactTitle')}
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto' }}>
            {t('contact.heroDesc')}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {/* Form */}
          <div className="ts-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={48} color="var(--color-primary)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>{t('contact.thankYou')}</h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {t('contact.recorded')}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      farmSize: '50 - 250 Hectares',
                      interest: 'Soil Moisture Platform Demo',
                      message: '',
                    });
                  }}
                  className="ts-btn ts-btn-secondary"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
                  {t('contact.formTitle')}
                </h3>

                {error && (
                  <div className="ts-alert-banner ts-alert-banner-error" style={{ marginBottom: '16px' }}>
                    {error}
                  </div>
                )}

                <div className="ts-form-group">
                  <label className="ts-label">{t('contact.fullName')} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. [Your Full Name]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">{t('checkout.email')} *</label>
                  <input
                    type="email"
                    required
                    placeholder="grower@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 012-3456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label">{t('contact.acreage')}</label>
                    <select
                      value={formData.farmSize}
                      onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                      className="ts-select"
                    >
                      <option>&lt; 50 Hectares</option>
                      <option>50 - 250 Hectares</option>
                      <option>250 - 1,000 Hectares</option>
                      <option>&gt; 1,000 Hectares</option>
                    </select>
                  </div>

                  <div className="ts-form-group">
                    <label className="ts-label">{t('contact.interest')}</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="ts-select"
                    >
                      <option>Soil Moisture Platform Demo</option>
                      <option>Hardware Probe Procurement</option>
                      <option>BLE Gateway Offline Sync</option>
                      <option>Commercial Agronomy Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">{t('contact.message')} *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your soil type, crops (e.g. corn, grapes), and current irrigation method..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="ts-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="ts-btn ts-btn-primary ts-btn-lg"
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  {submitting ? t('contact.submitting') : t('contact.submit')}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Direct Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="ts-card">
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                {t('contact.officeTitle')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text)', display: 'block' }}>[Agricultural Technology Center]</strong>
                    [123 Innovation Parkway, Suite 100] <br />
                    [City, State / Region, Zip, Country]
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--color-text)', display: 'block' }}>Email</strong>
                    info@example.com
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--color-text)', display: 'block' }}>Phone</strong>
                    +1 (555) 012-3456
                  </div>
                </div>
              </div>
            </div>

            <div className="ts-card" style={{ backgroundColor: 'var(--color-primary-subtle)', borderColor: 'var(--color-primary-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={20} color="var(--color-primary)" />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  {t('contact.privacyTitle')}
                </h4>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-primary-dark)', lineHeight: '1.6' }}>
                {t('contact.privacyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
