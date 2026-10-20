import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Wrench, HelpCircle, FileText, CheckCircle2, Download, Droplets, ShieldAlert, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const ResourcesPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Header */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '64px 24px 48px',
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
            <BookOpen size={16} /> Technical Guidelines &amp; Protocols
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
            Water Quality Testing Resources
          </h1>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Standard operating procedures, WHO drinking-water quality thresholds, and downloadable
            documentation for field operators and laboratory technicians.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '64px 24px 80px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* WHO Microbiological Standards Table */}
          <div className="ts-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--color-heading)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Droplets size={22} color="var(--color-primary)" />
              WHO Drinking-Water Microbial Risk Classification
            </h2>

            <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              The World Health Organization (WHO) specifies that <em>Escherichia coli</em> or thermotolerant
              coliform bacteria must not be detectable in any 100mL sample of water intended for drinking.
            </p>

            <div className="ts-table-container">
              <table className="ts-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg)', textAlign: 'left' }}>
                    <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: 700 }}>Risk Level</th>
                    <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: 700 }}>E. coli Count (CFU / 100mL)</th>
                    <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: 700 }}>Public Health Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '14px 18px' }}>
                      <strong style={{ color: 'var(--color-success)' }}>Safe / Compliant</strong>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>0 CFU / 100mL</td>
                    <td style={{ padding: '14px 18px', color: 'var(--color-text-muted)', fontSize: '13.5px' }}>
                      Water meets WHO guideline value. Routine surveillance maintained.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 18px' }}>
                      <strong style={{ color: 'var(--color-warning)' }}>Low Risk</strong>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>1 – 10 CFU / 100mL</td>
                    <td style={{ padding: '14px 18px', color: 'var(--color-text-muted)', fontSize: '13.5px' }}>
                      Potential localized ingress. Conduct sanitary inspection of wellhead / taps.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 18px' }}>
                      <strong style={{ color: '#EA580C' }}>Intermediate Risk</strong>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>11 – 100 CFU / 100mL</td>
                    <td style={{ padding: '14px 18px', color: 'var(--color-text-muted)', fontSize: '13.5px' }}>
                      Fecal contamination present. Implement advisory boiling or shock chlorination.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 18px' }}>
                      <strong style={{ color: 'var(--color-error)' }}>High / Very High Risk</strong>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>&gt; 100 CFU / 100mL</td>
                    <td style={{ padding: '14px 18px', color: 'var(--color-text-muted)', fontSize: '13.5px' }}>
                      Gross contamination. Isolate source immediately; urgent sanitary remediation required.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Standard Operating Procedure Summary */}
          <div className="ts-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--color-heading)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Wrench size={22} color="var(--color-primary)" />
              Standard Field Testing Procedure (ISO 9308-1)
            </h2>

            <ol
              style={{
                fontSize: '15px',
                color: 'var(--color-text-muted)',
                lineHeight: '1.8',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <strong>Sterile Sample Collection:</strong> Disinfect tap with sterile wipe, allow water
                to run for 60 seconds, and collect 100mL into the sterile polypropylene container without
                touching the container neck.
              </li>
              <li>
                <strong>Cartridge Loading:</strong> Slide the sterile 0.45µm nitrocellulose membrane
                slider into the metal cartridge funnel and secure side clamps.
              </li>
              <li>
                <strong>Motorized Vacuum Draw:</strong> Attach vacuum tubing from the pump to the cartridge
                base and activate filtration until the full 100mL has passed through the membrane.
              </li>
              <li>
                <strong>Media Introduction:</strong> Introduce the pre-measured ampoule of selective
                nutrient broth onto the absorbent pad slider.
              </li>
              <li>
                <strong>Incubation &amp; Imaging:</strong> Place cartridge into the thermal incubator bay at
                37.0°C (or 44.0°C for thermotolerant coliforms). The optical camera initiates automated
                monitoring after 8 hours.
              </li>
            </ol>
          </div>

          {/* Downloadable Manuals */}
          <div className="ts-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--color-heading)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <FileText size={22} color="var(--color-primary)" />
              Technical Manuals &amp; Documentation
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                    AquaScope Operator Manual (v3.2)
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                    Complete 42-page guide covering assembly, daily testing workflows, battery maintenance, and troubleshooting.
                  </p>
                </div>
                <a
                  href="/manuals/AquaScope_User_Manual.pdf"
                  target="_blank"
                  className="ts-btn ts-btn-secondary ts-btn-sm"
                  style={{ width: 'fit-content' }}
                >
                  <Download size={14} /> Download PDF (2.4 MB)
                </a>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                    ISO 9308-1 Validation Summary
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                    Certified analytical comparison against reference laboratory membrane filtration and colony counting metrics.
                  </p>
                </div>
                <a
                  href="/manuals/ISO_Validation_Report.pdf"
                  target="_blank"
                  className="ts-btn ts-btn-secondary ts-btn-sm"
                  style={{ width: 'fit-content' }}
                >
                  <Download size={14} /> Download PDF (1.1 MB)
                </a>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="ts-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--color-heading)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <HelpCircle size={22} color="var(--color-primary)" />
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '6px' }}>
                  What contaminants does the AquaScope system detect?
                </h4>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                  The system specifically detects and quantifies microbiological fecal indicator bacteria:
                  total coliforms and <em>Escherichia coli</em> (E. coli). It does not detect chemical
                  contaminants, dissolved heavy metals (e.g. arsenic, lead), or pesticides, which require
                  separate chemical analytical techniques.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '6px' }}>
                  How does the system operate without electricity or laboratory facilities?
                </h4>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                  The unit features an integrated lithium-ion battery buffer supporting up to 48 hours of
                  continuous thermal incubation and vacuum pump operation on a single charge. It can be
                  recharged via standard USB-C, 12V vehicle cigarette lighter ports, or portable solar panels.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '6px' }}>
                  Do the consumable sliders require cold-chain refrigeration?
                </h4>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                  No. The single-use sterile filtration sliders and dehydrated/stabilized nutrient broth media
                  are formulated for ambient room temperature storage (up to 35°C) with a certified shelf
                  life of 12 months, eliminating the need for refrigerated field transport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
