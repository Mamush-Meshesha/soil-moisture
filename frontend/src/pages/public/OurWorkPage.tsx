import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Filter,
  X,
  RefreshCw,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { ourWorkContent, LocalizedProject } from '../../data/ourWorkContent';
import { api } from '../../services/api';
import { Project } from '../../types';

type CategoryFilterKey = 'all' | 'field' | 'humanitarian' | 'research' | 'community';

export const OurWorkPage: React.FC = () => {
  const { language } = useLanguage();
  const content = ourWorkContent[language] || ourWorkContent.en;

  const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryFilterKey>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>(content.projects);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadInitiatives() {
      try {
        setLoading(true);
        const res = await api.getProjects({
          category: activeCategoryKey === 'all' ? undefined : activeCategoryKey,
          lang: language,
        });

        if (isMounted && res && res.projects && res.projects.length > 0) {
          // Format projects ensuring details object is present
          const formatted = res.projects.map((p: any) => ({
            ...p,
            details: p.details || {
              objective: p.objective || '',
              method: p.method || '',
              keyFindings: Array.isArray(p.keyFindings) ? p.keyFindings : [],
              partner: p.partner || '',
            },
          }));
          setProjects(formatted);
        } else if (isMounted) {
          const fallback =
            activeCategoryKey === 'all'
              ? content.projects
              : content.projects.filter((p) => p.categoryKey === activeCategoryKey);
          setProjects(fallback);
        }
      } catch (err) {
        if (isMounted) {
          const fallback =
            activeCategoryKey === 'all'
              ? content.projects
              : content.projects.filter((p) => p.categoryKey === activeCategoryKey);
          setProjects(fallback);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitiatives();

    return () => {
      isMounted = false;
    };
  }, [activeCategoryKey, language]);

  const filterTabs: Array<{ key: CategoryFilterKey; label: string }> = [
    { key: 'all', label: content.categories.all },
    { key: 'field', label: content.categories.field },
    { key: 'humanitarian', label: content.categories.humanitarian },
    { key: 'research', label: content.categories.research },
    { key: 'community', label: content.categories.community },
  ];

  const filteredProjects = projects;

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId || p.slug === selectedProjectId) || null
    : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '72px 24px 56px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              fontSize: '13.5px',
              fontWeight: 700,
              marginBottom: '20px',
              border: '1px solid var(--color-border)',
            }}
          >
            <Globe size={16} /> {content.badge}
          </div>

          <h1
            style={{
              fontSize: '44px',
              fontWeight: 800,
              color: 'var(--color-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '18px',
              lineHeight: 1.2,
            }}
          >
            {content.title}
          </h1>

          <p
            style={{
              fontSize: '19px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '820px',
              margin: '0 auto 36px',
            }}
          >
            {content.desc}
          </p>

          {/* Key Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              maxWidth: '920px',
              margin: '0 auto',
              padding: '24px',
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>
                {content.metric1Val}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {content.metric1Label}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                {content.metric2Val}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {content.metric2Label}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {content.metric3Val}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {content.metric3Label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ backgroundColor: 'var(--color-bg)', padding: '32px 24px 16px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginRight: '8px',
                }}
              >
                <Filter size={15} /> {content.filterLabel}
              </span>
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategoryKey(tab.key)}
                  className={`ts-btn ts-btn-sm ${activeCategoryKey === tab.key ? 'ts-btn-primary' : 'ts-btn-secondary'}`}
                  style={{ borderRadius: '20px', padding: '6px 14px' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              {content.showingText(filteredProjects.length)}
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '24px 24px 80px', backgroundColor: 'var(--color-bg)', flex: 1 }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="ts-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                }}
              >
                {/* Image Header */}
                <div
                  style={{
                    position: 'relative',
                    height: '210px',
                    backgroundColor: 'var(--color-surface-sunken)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 400ms ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      backgroundColor: 'rgba(11, 37, 69, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Meta info */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: '12.5px',
                        color: 'var(--color-text-muted)',
                        marginBottom: '12px',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="var(--color-primary)" /> {project.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} color="var(--color-primary)" /> {project.date}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '19px',
                        fontWeight: 700,
                        color: 'var(--color-heading)',
                        lineHeight: 1.35,
                        marginBottom: '12px',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.65,
                        marginBottom: '20px',
                      }}
                    >
                      {project.summary}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-primary)',
                        fontWeight: 600,
                      }}
                    >
                      {content.verifiedBadge}
                    </span>
                    <button
                      onClick={() => setSelectedProjectId(project.id)}
                      className="ts-btn ts-btn-secondary ts-btn-sm"
                      style={{ borderRadius: '6px', fontSize: '13px' }}
                    >
                      {content.viewCaseStudy} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UN SDG 6 Alignment Banner */}
      <section
        style={{
          padding: '64px 24px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {content.sdgTag}
            </span>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: 'var(--color-heading)',
                marginBottom: '16px',
                lineHeight: 1.25,
              }}
            >
              {content.sdgTitle}
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              {content.sdgDesc}
            </p>
            <Link to="/about" className="ts-btn ts-btn-primary">
              {content.sdgButton} <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-primary-subtle)',
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h4
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--color-primary-dark)',
                marginBottom: '16px',
              }}
            >
              {content.principlesTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {content.principles.map((pr, pIdx) => (
                <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                    <strong>{pr.title}:</strong> {pr.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(7, 18, 30, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setSelectedProjectId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                maxWidth: '720px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-card-hover)',
                border: '1px solid var(--color-border)',
                padding: '36px',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setSelectedProjectId(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%',
                  color: 'var(--color-text-muted)',
                }}
                aria-label="Close modal"
              >
                <X size={22} />
              </button>

              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  marginBottom: '12px',
                }}
              >
                {selectedProject.category}
              </div>

              <h2
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: 'var(--color-heading)',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}
              >
                {selectedProject.title}
              </h2>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '24px',
                }}
              >
                <span>
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {selectedProject.location}
                </span>
                <span>
                  <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {selectedProject.date}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                    {content.objectiveLabel}
                  </h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                    {selectedProject.details.objective}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                    {content.methodLabel}
                  </h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                    {selectedProject.details.method}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>
                    {content.findingsLabel}
                  </h4>
                  <ul
                    style={{
                      listStyle: 'none',
                      paddingLeft: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {(selectedProject.details?.keyFindings || []).map((finding: string, idx: number) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '14px',
                          color: 'var(--color-text)',
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          color="var(--color-primary)"
                          style={{ flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.details.partner && (
                  <div
                    style={{
                      padding: '14px',
                      backgroundColor: 'var(--color-bg)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <strong>{content.partnerLabel}:</strong> {selectedProject.details.partner}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setSelectedProjectId(null)} className="ts-btn ts-btn-secondary">
                  {content.closeCaseStudy}
                </button>
                <Link to="/contact" className="ts-btn ts-btn-primary">
                  {content.inquireButton}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Footer */}
      <section
        style={{
          padding: '72px 24px',
          backgroundColor: 'var(--color-primary-dark)',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>
            {content.pilotTitle}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#94A9C0',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            {content.pilotDesc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="ts-btn ts-btn-primary ts-btn-lg">
              {content.pilotBtn1} <ArrowRight size={18} />
            </Link>
            <Link
              to="/technology"
              className="ts-btn ts-btn-secondary ts-btn-lg"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)' }}
            >
              {content.pilotBtn2}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurWorkPage;
