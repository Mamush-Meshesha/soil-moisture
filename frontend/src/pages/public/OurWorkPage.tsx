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
  Building2,
  Compass,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { ourWorkContent, LocalizedProject } from '../../data/ourWorkContent';
import { api } from '../../services/api';

type CategoryFilterKey = 'all' | 'field' | 'humanitarian' | 'research' | 'community';

export const OurWorkPage: React.FC = () => {
  const { language } = useLanguage();
  const content = ourWorkContent[language] || ourWorkContent.en;

  const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryFilterKey>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<LocalizedProject[]>(content.projects);
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
          const formatted: LocalizedProject[] = res.projects.map((p: any) => ({
            id: p.id,
            categoryKey: p.categoryKey || 'field',
            title: p.title,
            category: p.category,
            date: p.date,
            location: p.location,
            image: p.image,
            summary: p.summary,
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

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId || (p as any).slug === selectedProjectId) || null
    : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#081426',
          backgroundImage:
            'linear-gradient(135deg, rgba(8, 20, 38, 0.92) 0%, rgba(11, 37, 69, 0.94) 55%, rgba(6, 17, 33, 0.96) 100%), url("/images/field-testing-kenya.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 24px 60px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(14, 165, 233, 0.16)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Globe size={16} /> {content.badge}
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              marginBottom: '18px',
              lineHeight: 1.2,
              fontFamily: 'Montserrat, Inter, sans-serif',
            }}
          >
            {content.title}
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: '#CBD5E1',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              maxWidth: '920px',
              margin: '0 auto',
              padding: '24px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#38BDF8' }}>
                {content.metric1Val}
              </div>
              <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px' }}>
                {content.metric1Label}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#4ADE80' }}>
                {content.metric2Val}
              </div>
              <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px' }}>
                {content.metric2Label}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#FBBF24' }}>
                {content.metric3Val}
              </div>
              <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px' }}>
                {content.metric3Label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Cambridge Global Footprint Banner */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '28px 24px',
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(2, 132, 199, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Compass size={24} color="#0284C7" />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#0284C7',
                    letterSpacing: '0.05em',
                  }}
                >
                  {content.globalFootprintTitle}
                </span>
                <p style={{ margin: '2px 0 0', fontSize: '14.5px', color: '#334155', fontWeight: 500, lineHeight: 1.5 }}>
                  {content.globalFootprintText}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                '🇬🇧 UK',
                '🇪🇹 Ethiopia',
                '🇹🇿 Tanzania',
                '🇰🇪 Kenya',
                '🇮🇳 India',
                '🇧🇩 Bangladesh',
                '🇿🇦 South Africa',
                '🇨🇴 Colombia',
                '🇨🇭 Switzerland',
                '🇺🇸 USA',
              ].map((c) => (
                <span
                  key={c}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#475569',
                    backgroundColor: '#F1F5F9',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '36px 24px 16px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
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
                  color: '#64748B',
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
                  style={{
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '13.5px',
                    fontWeight: activeCategoryKey === tab.key ? 700 : 500,
                    border: activeCategoryKey === tab.key ? '1px solid #132745' : '1px solid #CBD5E1',
                    backgroundColor: activeCategoryKey === tab.key ? '#132745' : '#FFFFFF',
                    color: activeCategoryKey === tab.key ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 500 }}>
              {content.showingText(projects.length)}
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '24px 24px 80px', flex: 1 }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '30px',
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(19, 39, 69, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Image Header */}
                <div
                  style={{
                    position: 'relative',
                    height: '210px',
                    backgroundColor: '#0F172A',
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
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(11, 37, 69, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Body Content */}
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
                    {/* Meta location and date */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        fontSize: '12.5px',
                        color: '#64748B',
                        marginBottom: '10px',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="#0284C7" /> {project.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} color="#0284C7" /> {project.date}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#132745',
                        lineHeight: 1.35,
                        marginBottom: '10px',
                        fontFamily: 'Montserrat, Inter, sans-serif',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: '#475569',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                      }}
                    >
                      {project.summary}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#0284C7',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <ShieldCheck size={14} /> {content.verifiedBadge}
                    </span>

                    <button
                      onClick={() => setSelectedProjectId(project.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {content.viewCaseStudy} <ArrowRight size={13} />
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
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
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
                color: '#0284C7',
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
                color: '#132745',
                marginBottom: '16px',
                lineHeight: 1.25,
                fontFamily: 'Montserrat, Inter, sans-serif',
              }}
            >
              {content.sdgTitle}
            </h2>
            <p
              style={{
                fontSize: '15.5px',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              {content.sdgDesc}
            </p>
            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#132745',
                color: '#FFFFFF',
                borderRadius: '6px',
                fontSize: '14.5px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {content.sdgButton} <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              backgroundColor: '#F8FAFC',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#132745',
                marginBottom: '16px',
              }}
            >
              {content.principlesTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {content.principles.map((pr, pIdx) => (
                <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13.5px', color: '#334155' }}>
                    <strong>{pr.title}:</strong> {pr.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
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
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                maxWidth: '720px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.25)',
                border: '1px solid #E2E8F0',
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
                  color: '#64748B',
                }}
                aria-label="Close modal"
              >
                <X size={22} />
              </button>

              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(2, 132, 199, 0.1)',
                  color: '#0284C7',
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
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#132745',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                  fontFamily: 'Montserrat, Inter, sans-serif',
                }}
              >
                {selectedProject.title}
              </h2>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '13px',
                  color: '#64748B',
                  marginBottom: '24px',
                }}
              >
                <span>
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} color="#0284C7" />
                  {selectedProject.location}
                </span>
                <span>
                  <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} color="#0284C7" />
                  {selectedProject.date}
                </span>
              </div>

              {/* Modal Image */}
              <div
                style={{
                  height: '240px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '24px',
                  backgroundColor: '#0F172A',
                }}
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#132745', marginBottom: '6px' }}>
                    {content.objectiveLabel}
                  </h4>
                  <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                    {selectedProject.details.objective}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#132745', marginBottom: '6px' }}>
                    {content.methodLabel}
                  </h4>
                  <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                    {selectedProject.details.method}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#132745', marginBottom: '8px' }}>
                    {content.findingsLabel}
                  </h4>
                  <ul
                    style={{
                      listStyle: 'none',
                      paddingLeft: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      margin: 0,
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
                          color: '#334155',
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          color="#0284C7"
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
                      padding: '14px 18px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      fontSize: '13.5px',
                      color: '#475569',
                    }}
                  >
                    <strong style={{ color: '#132745' }}>{content.partnerLabel}: </strong>
                    <span>{selectedProject.details.partner}</span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  onClick={() => setSelectedProjectId(null)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {content.closeCaseStudy}
                </button>
                <Link
                  to="/contact"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px',
                    backgroundColor: '#132745',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {content.inquireButton} <ArrowRight size={15} />
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
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '34px',
              fontWeight: 800,
              marginBottom: '16px',
              fontFamily: 'Montserrat, Inter, sans-serif',
            }}
          >
            {content.pilotTitle}
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: '#94A3B8',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            {content.pilotDesc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                padding: '12px 24px',
                borderRadius: '6px',
                backgroundColor: '#0284C7',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {content.pilotBtn1} <ArrowRight size={17} />
            </Link>
            <Link
              to="/technology"
              style={{
                padding: '12px 24px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
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
