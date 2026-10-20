import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Cpu,
  Wifi,
  Droplets,
  Bell,
  FileSpreadsheet,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Database,
  Microscope,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const PlatformPage: React.FC = () => {
  const pillars = [
    {
      icon: Layers,
      title: '1. Membrane Filtration & Sample Preparation',
      desc: 'Refining the ISO 9308-1 international standard. A standardized 100mL water sample is drawn through a 0.45µm nitrocellulose membrane slider using a motorized vacuum pump, eliminating manual pump variability and field contamination.',
      points: [
        'Standardized 100mL sample volume filtration in under 60 seconds',
        'Single-use, sealed sterile sliders requiring zero flame sterilization',
        'Direct retention of coliform and Escherichia coli bacterial cells on a gridded surface',
      ],
    },
    {
      icon: Microscope,
      title: '2. Optical Microscopic Imaging & AI Enumeration',
      desc: 'An integrated digital camera module tracks early bacterial microcolony proliferation. Our machine learning algorithm automatically counts colony forming units (CFU), differentiating coliforms from non-target organisms.',
      points: [
        'Early microcolony identification in as little as 8 hours',
        'High-resolution raw image capture and annotated colony overlay stored for auditability',
        'Eliminates subjective human counting variation between operators',
      ],
    },
    {
      icon: Cpu,
      title: '3. Regulated Thermal Incubation',
      desc: 'Internal dual incubation chambers maintain strict temperature stability (37.0°C ± 0.3°C or 44.0°C ± 0.3°C) powered by internal lithium-ion battery cells, operating seamlessly across ambient swings from 10°C to 40°C.',
      points: [
        'Solid-state precision heating eliminating fragile laboratory water-baths',
        '48-hour continuous battery buffer for multi-sample field testing campaigns',
        'Automatic temperature logging and quality-control validation',
      ],
    },
    {
      icon: Wifi,
      title: '4. Hybrid Telemetry: Bluetooth & Global IoT Hub',
      desc: 'Works in fully disconnected environments. Test records sync to smartphones via Bluetooth Low Energy 5.2 and automatically upload to cloud dashboards via multi-band LTE-M/NB-IoT cellular gateways.',
      points: [
        'Instant color-coded safety key and CFU count displayed on field technician mobile app',
        'Offline data buffering in non-volatile flash storage until connectivity is restored',
        'Idempotent cryptographic upload ensuring zero duplicate or lost test records',
      ],
    },
    {
      icon: Database,
      title: '5. Centralized GIS Mapping & Public Health Intelligence',
      desc: 'Transforms fragmented paper water records into a live, interactive map of community drinking-water quality. Water service providers and ministries of health can analyze regional contamination trends.',
      points: [
        'Interactive geospatial mapping of safe vs. at-risk community water points',
        'Automated alert thresholds triggering rapid chlorination and sanitary surveys',
        'Exportable CSV and PDF reports complying with WHO drinking-water guidelines',
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
            <Droplets size={16} /> Architectural Overview
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
            The AquaScope Testing Platform Architecture
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '780px',
              margin: '0 auto',
            }}
          >
            An integrated end-to-end water testing ecosystem engineered to deliver laboratory-grade
            bacterial detection in field environments, from physical sample filtration to cloud GIS analytics.
          </p>
        </div>
      </section>

      <section style={{ padding: '72px 24px 80px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="ts-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr',
                  gap: '24px',
                  padding: '36px',
                  borderRadius: 'var(--radius-xl)',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--color-primary-subtle)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={28} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: 'var(--color-heading)',
                      marginBottom: '10px',
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '15px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7,
                      marginBottom: '20px',
                    }}
                  >
                    {pillar.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pillar.points.map((pt, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '14px',
                          color: 'var(--color-text)',
                        }}
                      >
                        <CheckCircle2 size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA Box */}
          <div
            style={{
              padding: '48px',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '12px' }}>
              Experience the AquaScope Testing Platform
            </h3>
            <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 28px' }}>
              Request a technical walkthrough or discuss how our portable testing equipment can integrate into your existing water monitoring programs.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="ts-btn ts-btn-primary ts-btn-lg">
                Request a Demonstration <ArrowRight size={18} />
              </Link>
              <Link to="/technology" className="ts-btn ts-btn-secondary ts-btn-lg">
                Explore Technology Specs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlatformPage;
