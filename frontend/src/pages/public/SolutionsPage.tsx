import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Droplets, Building2, Globe, ArrowRight, CheckCircle2, HeartPulse, Tent, Landmark } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      icon: Tent,
      title: 'Humanitarian & Emergency WASH',
      desc: 'Rapid microbiological testing for emergency response teams, refugee settlements, and disaster zones where water infrastructure has been compromised.',
      benefits: [
        'Rapid 8-hour coliform presence results for fast emergency water clearance',
        'Operates 100% off-grid using rugged IP67 battery-powered field kits',
        'Zero cold-chain requirement for filtration consumables and media pads',
      ],
    },
    {
      icon: Droplets,
      title: 'Rural Community Water Boards',
      desc: 'Empowering local community caretakers and water committees to monitor boreholes, gravity-fed schemes, and protected springs autonomously.',
      benefits: [
        'Eliminates weeks of delay waiting for central laboratory courier logistics',
        'Simple color-coded safety indicators requiring minimal operator training',
        'Enables immediate localized chlorination interventions when risk is detected',
      ],
    },
    {
      icon: HeartPulse,
      title: 'Health Centers & Field Laboratories',
      desc: 'Providing decentralized clinics and district health centers with ISO 9308-1 compliant quantitative bacterial testing without high capital equipment costs.',
      benefits: [
        'Automated digital colony counting eliminates subjective technician bias',
        'Stores raw optical photos and AI-annotated overlays for audit verification',
        'Sensitive down to 1 viable bacterial CFU per 100mL sample volume',
      ],
    },
    {
      icon: Landmark,
      title: 'Municipal Utilities & Regulators',
      desc: 'Enabling water service providers and government health ministries to conduct comprehensive spatial mapping and surveillance across distribution networks.',
      benefits: [
        'Automatic Bluetooth & cellular cloud sync to centralized GIS dashboards',
        'Early identification of cross-contamination and pipe network pressure loss',
        'Generates traceable regulatory compliance reports for public safety records',
      ],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '72px 24px 56px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
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
            <Globe size={16} /> Targeted Water Safety Solutions
          </div>

          <h1
            style={{
              fontSize: '42px',
              fontWeight: 900,
              color: 'var(--color-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Tailored for Every Water Setting
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '740px',
              margin: '0 auto',
            }}
          >
            Whether coordinating refugee camp emergency WASH, managing rural community boreholes,
            or regulating municipal pipe distribution networks, AquaScope provides the verified ground-truth data you need.
          </p>
        </div>
      </section>

      <section style={{ padding: '72px 24px 80px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
          }}
        >
          {solutions.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="ts-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '36px',
                  borderRadius: 'var(--radius-xl)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--color-primary-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={26} />
                  </div>

                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: 'var(--color-heading)',
                      marginBottom: '12px',
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14.5px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.65,
                      marginBottom: '24px',
                    }}
                  >
                    {s.desc}
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      paddingLeft: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '28px',
                    }}
                  >
                    {s.benefits.map((b, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '13.5px',
                          color: 'var(--color-text)',
                        }}
                      >
                        <CheckCircle2
                          size={17}
                          color="var(--color-primary)"
                          style={{ flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="ts-btn ts-btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Discuss This Solution <ArrowRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionsPage;
