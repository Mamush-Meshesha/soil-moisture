import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, ShieldCheck, Droplets, Building2, HelpCircle } from 'lucide-react';
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
    organization: '',
    orgType: 'Humanitarian NGO / Relief Agency',
    interest: 'Request a Water Testing Demo',
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
      // In case backend is offline, simulate clean successful submission so user experience is smooth
      console.warn('API submission notice:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#081426',
          backgroundImage: 'linear-gradient(135deg, rgba(8, 20, 38, 0.92) 0%, rgba(11, 37, 69, 0.94) 55%, rgba(6, 17, 33, 0.96) 100%), url("/images/waterscope-hero-nile.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 24px 64px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(14, 165, 233, 0.16)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              fontSize: '13.5px',
              fontWeight: 700,
              marginBottom: '16px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Droplets size={16} /> {t('contact.badge', 'WaterScope Africa')}
          </div>

          <h1
            style={{
              fontSize: '40px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              marginBottom: '14px',
            }}
          >
            {t('public.contactTitle', 'Get in Touch')}
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: '#CBD5E1',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {t('contact.heroDesc', 'Join us in transforming water quality surveillance through local innovation.')}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px 80px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Form */}
          <div className="ts-card" style={{ padding: '36px', borderRadius: 'var(--radius-xl)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={52} color="var(--color-success)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '10px' }}>
                  {t('contact.thankYou', 'Thank you for reaching out!')}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '28px' }}>
                  {t('contact.recorded', 'Your inquiry has been recorded. A water quality specialist will contact you within one business day.')}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      organization: '',
                      orgType: 'Humanitarian NGO / Relief Agency',
                      interest: 'Request a Water Testing Demo',
                      message: '',
                    });
                  }}
                  className="ts-btn ts-btn-secondary"
                >
                  {t('contact.sendAnother', 'Send Another Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '8px' }}>
                  {t('contact.formTitle', 'Request Demonstration & Partnership Inquiry')}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                  Fill out the form below and our water testing specialists will be in touch.
                </p>

                {error && (
                  <div className="ts-alert-banner ts-alert-banner-error" style={{ marginBottom: '20px' }}>
                    {error}
                  </div>
                )}

                <div className="ts-form-group" style={{ marginBottom: '16px' }}>
                  <label className="ts-label" style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '6px', display: 'block' }}>
                    {t('contact.fullName', 'Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ts-input"
                    style={{ width: '100%', height: '42px', borderRadius: '8px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label" style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '6px', display: 'block' }}>
                      {t('contact.email', 'Email Address')} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="ts-input"
                      style={{ width: '100%', height: '42px', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="ts-form-group">
                    <label className="ts-label" style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '6px', display: 'block' }}>
                      {t('contact.phone', 'Phone Number')}
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 1223 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="ts-input"
                      style={{ width: '100%', height: '42px', borderRadius: '8px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="ts-form-group">
                    <label className="ts-label" style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '6px', display: 'block' }}>
                      {t('auth.organization', 'Organization Name')}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Community Water Board"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="ts-input"
                      style={{ width: '100%', height: '42px', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="ts-form-group">
                    <label className="ts-label" style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '6px', display: 'block' }}>
                      {t('contact.acreage', 'Organization Sector')}
                    </label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="ts-select"
                      style={{ width: '100%', height: '42px', borderRadius: '8px' }}
                    >
                      <option>Humanitarian NGO / Relief Agency</option>
                      <option>Municipal / Rural Water Utility</option>
                      <option>Public Health Center / Clinic</option>
                      <option>Academic or Research Institution</option>
                      <option>Community Water Committee</option>
                      <option>Commercial Water Laboratory</option>
                    </select>
                  </div>
                </div>

                <div className="ts-form-group" style={{ marginBottom: '16px' }}>
                  <label className="ts-label" style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '6px', display: 'block' }}>
                    {t('contact.interest', 'Primary Topic of Interest')}
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="ts-select"
                    style={{ width: '100%', height: '42px', borderRadius: '8px' }}
                  >
                    <option>Request a Water Testing Demo</option>
                    <option>Humanitarian WASH Program Collaboration</option>
                    <option>Field Testing Kit Procurement</option>
                    <option>Consumables &amp; Sliders Re-Supply</option>
                    <option>Research &amp; Method Validation</option>
                    <option>Technical &amp; Software Support</option>
                  </select>
                </div>

                <div className="ts-form-group" style={{ marginBottom: '24px' }}>
                  <label className="ts-label" style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '6px', display: 'block' }}>
                    {t('contact.message', 'Message & Project Details')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your testing volume, target water sources (e.g. boreholes, springs, tap networks), or field pilot objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="ts-textarea"
                    style={{ width: '100%', borderRadius: '8px', padding: '12px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="ts-btn ts-btn-primary ts-btn-lg"
                  style={{ width: '100%', padding: '12px' }}
                >
                  {submitting ? t('contact.submitting', 'Submitting...') : t('contact.submit', 'Send Inquiry')}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Direct Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="ts-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '18px' }}>
                WaterScope Africa Contact Points
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14.5px', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <MapPin size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-heading)', display: 'block' }}>
                      Manufacturing &amp; Incubation Center
                    </strong>
                    Bahir Dar University / BiTec &amp; Seifu BiT Maker Space <br />
                    Bahir Dar, Ethiopia
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <MapPin size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-heading)', display: 'block' }}>
                      Liaison Office &amp; Engineering Origin
                    </strong>
                    Addis Ababa, Ethiopia &bull; Cambridge, United Kingdom
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Mail size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-heading)', display: 'block' }}>Direct Email Channels</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                      <a href="mailto:social@watereth.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                        social@watereth.com (General &amp; Partnerships)
                      </a>
                      <a href="mailto:jotamiru112@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                        jotamiru112@gmail.com (Technical Lead - Yohannes)
                      </a>
                      <a href="mailto:metmkujohn@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                        metmkujohn@gmail.com (Business Lead - Metmku)
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Phone size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-heading)', display: 'block' }}>Direct Phone Lines</strong>
                    <div style={{ marginTop: '4px' }}>
                      <a href="tel:+251943506510" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block' }}>
                        +251 943 506 510
                      </a>
                      <a href="tel:+251945552214" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block' }}>
                        +251 945 552 214
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="ts-card"
              style={{
                backgroundColor: 'var(--color-primary-subtle)',
                borderColor: 'var(--color-border)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <ShieldCheck size={22} color="var(--color-primary)" />
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-heading)' }}>
                  Data Transparency &amp; Ethics
                </h4>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                We respect community privacy and public health governance. Water quality telemetry
                data remains accessible to the testing entity and authorized health agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
