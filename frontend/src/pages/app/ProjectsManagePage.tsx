import React, { useState, useEffect } from 'react';
import {
  Globe,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  X,
  AlertCircle,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { api } from '../../services/api';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

const PRESET_IMAGES = [
  {
    name: 'AidEx Humanitarian Showcase',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Rural Water Well Testing',
    url: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Laboratory Microbiological Validation',
    url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Community WASH Training',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Emergency Water Station',
    url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
  },
];

const CATEGORIES = [
  { key: 'field', label: 'Field Testing' },
  { key: 'humanitarian', label: 'Humanitarian WASH' },
  { key: 'research', label: 'Research & Validation' },
  { key: 'community', label: 'Community Workshops' },
];

export const ProjectsManagePage: React.FC = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'translations'>('details');
  const [activeLangTab, setActiveLangTab] = useState<'am' | 'om' | 'ti'>('am');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryKey: 'field',
    category: 'Field Testing',
    date: '',
    location: '',
    image: PRESET_IMAGES[0].url,
    summary: '',
    objective: '',
    method: '',
    keyFindings: ['', ''],
    partner: '',
    order: 0,
    translations: {
      am: { title: '', category: '', summary: '', objective: '', method: '', keyFindings: [] as string[], partner: '' },
      om: { title: '', category: '', summary: '', objective: '', method: '', keyFindings: [] as string[], partner: '' },
      ti: { title: '', category: '', summary: '', objective: '', method: '', keyFindings: [] as string[], partner: '' },
    },
  });

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getProjects({ limit: 100 });
      setProjects(res.projects || []);
    } catch (err: any) {
      console.error('Failed to load projects:', err);
      setError(err.message || 'Failed to load projects from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      categoryKey: 'field',
      category: 'Field Testing',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      location: '',
      image: PRESET_IMAGES[0].url,
      summary: '',
      objective: '',
      method: '',
      keyFindings: ['', ''],
      partner: '',
      order: projects.length + 1,
      translations: {
        am: { title: '', category: '', summary: '', objective: '', method: '', keyFindings: [] as string[], partner: '' },
        om: { title: '', category: '', summary: '', objective: '', method: '', keyFindings: [] as string[], partner: '' },
        ti: { title: '', category: '', summary: '', objective: '', method: '', keyFindings: [] as string[], partner: '' },
      },
    });
    setActiveTab('details');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    const translations = p.translationsJson
      ? (typeof p.translationsJson === 'string' ? JSON.parse(p.translationsJson) : p.translationsJson)
      : {};

    setFormData({
      title: p.title || '',
      slug: p.slug || '',
      categoryKey: p.categoryKey || 'field',
      category: p.category || 'Field Testing',
      date: p.date || '',
      location: p.location || '',
      image: p.image || PRESET_IMAGES[0].url,
      summary: p.summary || '',
      objective: p.details?.objective || '',
      method: p.details?.method || '',
      keyFindings: p.details?.keyFindings && p.details.keyFindings.length > 0 ? p.details.keyFindings : ['', ''],
      partner: p.details?.partner || '',
      order: p.order || 0,
      translations: {
        am: {
          title: translations?.am?.title || '',
          category: translations?.am?.category || '',
          summary: translations?.am?.summary || '',
          objective: translations?.am?.objective || '',
          method: translations?.am?.method || '',
          keyFindings: translations?.am?.keyFindings || [],
          partner: translations?.am?.partner || '',
        },
        om: {
          title: translations?.om?.title || '',
          category: translations?.om?.category || '',
          summary: translations?.om?.summary || '',
          objective: translations?.om?.objective || '',
          method: translations?.om?.method || '',
          keyFindings: translations?.om?.keyFindings || [],
          partner: translations?.om?.partner || '',
        },
        ti: {
          title: translations?.ti?.title || '',
          category: translations?.ti?.category || '',
          summary: translations?.ti?.summary || '',
          objective: translations?.ti?.objective || '',
          method: translations?.ti?.method || '',
          keyFindings: translations?.ti?.keyFindings || [],
          partner: translations?.ti?.partner || '',
        },
      },
    });
    setActiveTab('details');
    setIsModalOpen(true);
  };

  const handleCategoryKeyChange = (catKey: string) => {
    const found = CATEGORIES.find((c) => c.key === catKey);
    setFormData((prev) => ({
      ...prev,
      categoryKey: catKey,
      category: found ? found.label : prev.category,
    }));
  };

  const handleKeyFindingChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.keyFindings];
      updated[index] = value;
      return { ...prev, keyFindings: updated };
    });
  };

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const res = await api.uploadImage(file, 'aquascope/initiatives');
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
        setSuccessMessage('Image successfully uploaded to Cloudinary!');
        setTimeout(() => setSuccessMessage(null), 3500);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload image to Cloudinary.');
    } finally {
      setUploading(false);
    }
  };

  const addKeyFinding = () => {
    setFormData((prev) => ({ ...prev, keyFindings: [...prev.keyFindings, ''] }));
  };

  const removeKeyFinding = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyFindings: prev.keyFindings.filter((_, i) => i !== index),
    }));
  };

  const handleTranslationChange = (lang: 'am' | 'om' | 'ti', field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) {
      alert('Title and Summary are required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        title: formData.title,
        slug: formData.slug || undefined,
        category: formData.category,
        categoryKey: formData.categoryKey,
        date: formData.date,
        location: formData.location,
        image: formData.image,
        summary: formData.summary,
        objective: formData.objective,
        method: formData.method,
        keyFindings: formData.keyFindings.filter((k) => k.trim().length > 0),
        partner: formData.partner,
        order: formData.order,
        translations: formData.translations,
      };

      if (editingProject) {
        await api.updateProject(editingProject.id, payload);
        setSuccessMessage(`Initiative "${formData.title}" updated successfully!`);
      } else {
        await api.createProject(payload);
        setSuccessMessage(`New initiative "${formData.title}" created successfully!`);
      }

      setIsModalOpen(false);
      await loadProjects();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Save failed:', err);
      setError(err.message || 'Failed to save initiative');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      setLoading(true);
      await api.deleteProject(id);
      setSuccessMessage(`Initiative deleted successfully.`);
      await loadProjects();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Delete failed:', err);
      setError(err.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.categoryKey === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.details?.partner?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '28px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              <Globe size={14} /> DYNAMIC POSTGRESQL PERSISTENCE
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)', margin: 0 }}>
            Field Initiatives & Our Work
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Manage public water testing projects, humanitarian WASH deployments, and case studies shown on{' '}
            <a href="/our-work" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              /our-work
            </a>{' '}
            and the homepage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={loadProjects}
            className="ts-btn ts-btn-secondary"
            title="Refresh database records"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <a
            href="/our-work"
            target="_blank"
            rel="noopener noreferrer"
            className="ts-btn ts-btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ExternalLink size={16} /> View Public Page
          </a>
          <button
            onClick={openCreateModal}
            className="ts-btn ts-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={18} /> Add New Initiative
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10B981',
            color: '#065F46',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #EF4444',
            color: '#991B1B',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} color="#EF4444" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div className="ts-card" style={{ padding: '18px 22px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Initiatives</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
            {projects.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Stored in PostgreSQL</div>
        </div>

        <div className="ts-card" style={{ padding: '18px 22px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Active Categories</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)', marginTop: '4px' }}>
            {new Set(projects.map((p) => p.categoryKey)).size}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Field, WASH, Research, Workshops</div>
        </div>

        <div className="ts-card" style={{ padding: '18px 22px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Multilingual Ready</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
            4 Languages
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>English, አማርኛ, Oromoo, ትግርኛ</div>
        </div>

        <div className="ts-card" style={{ padding: '18px 22px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Sync Status</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)', marginTop: '4px' }}>
            100%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Real-time API & Database</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="ts-card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '260px' }}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search by initiative title, location, or partner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: 'var(--color-text)',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ts-select"
            style={{ padding: '6px 12px', fontSize: '13px', borderRadius: 'var(--radius-sm)' }}
          >
            <option value="all">All Categories ({projects.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label} ({projects.filter((p) => p.categoryKey === cat.key).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects List */}
      {loading && projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div className="ts-skeleton" style={{ width: '180px', height: '24px', margin: '0 auto 16px' }} />
          <div className="ts-skeleton" style={{ width: '400px', height: '140px', margin: '0 auto' }} />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div
          className="ts-card"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
          }}
        >
          <Layers size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-heading)' }}>No Initiatives Found</h3>
          <p style={{ fontSize: '14px', marginTop: '6px' }}>
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your search query or category filter.'
              : 'Click "Add New Initiative" above to create your first water testing case study.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="ts-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                padding: '0',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ position: 'relative', height: '180px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(11, 37, 69, 0.85)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.9)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '6px',
                  }}
                >
                  Live in DB
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      fontSize: '12px',
                      color: 'var(--color-text-muted)',
                      marginBottom: '10px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="var(--color-primary)" /> {project.location || 'Global'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="var(--color-primary)" /> {project.date || 'Recent'}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: 'var(--color-heading)',
                      lineHeight: 1.4,
                      marginBottom: '10px',
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '13.5px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {project.summary}
                  </p>

                  {project.details?.partner && (
                    <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '14px' }}>
                      Partner: {project.details.partner}
                    </div>
                  )}
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
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                    /{project.slug}
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openEditModal(project)}
                      className="ts-btn ts-btn-secondary ts-btn-sm"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      title="Edit Initiative"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="ts-btn ts-btn-sm"
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                      }}
                      title="Delete Initiative"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Initiative Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 37, 69, 0.65)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '840px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-card-hover)',
              border: '1px solid var(--color-border)',
              padding: '32px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
              }}
            >
              <X size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="ts-badge ts-badge-primary">
                {editingProject ? 'Edit Initiative' : 'Create New Initiative'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                PostgreSQL Project Entity
              </span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '20px' }}>
              {editingProject ? `Edit: ${editingProject.title}` : 'Add New Water Field Initiative'}
            </h2>

            {/* Modal Top Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border)', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                style={{
                  padding: '10px 18px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'details' ? '2px solid var(--color-primary)' : '2px solid transparent',
                  color: activeTab === 'details' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: activeTab === 'details' ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                1. Main Details & Findings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('translations')}
                style={{
                  padding: '10px 18px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'translations' ? '2px solid var(--color-primary)' : '2px solid transparent',
                  color: activeTab === 'translations' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: activeTab === 'translations' ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} /> 2. Multilingual Overrides (Amharic, Oromo, Tigrinya)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {activeTab === 'details' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Title & Slug */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Initiative Title *
                      </label>
                      <input
                        type="text"
                        required
                        className="ts-input"
                        placeholder="e.g. Rapid Water Screening in Somali Region"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        URL Slug (Optional)
                      </label>
                      <input
                        type="text"
                        className="ts-input"
                        placeholder="somali-water-screening"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Category, Date & Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Category *
                      </label>
                      <select
                        className="ts-select"
                        value={formData.categoryKey}
                        onChange={(e) => handleCategoryKeyChange(e.target.value)}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        className="ts-input"
                        placeholder="e.g. Jijiga, Somali Region, Ethiopia"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Date *
                      </label>
                      <input
                        type="text"
                        required
                        className="ts-input"
                        placeholder="e.g. January 2024"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Partner */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Partner / Collaborator (Optional)
                    </label>
                    <input
                      type="text"
                      className="ts-input"
                      placeholder="e.g. Ministry of Water & Energy / UNICEF Ethiopia"
                      value={formData.partner}
                      onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
                    />
                  </div>

                  {/* Cloudinary Image Upload & Presets */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Feature Image (Cloudinary Upload or URL) *
                    </label>

                    {/* Cloudinary Upload Box */}
                    <div
                      style={{
                        border: '2px dashed var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        backgroundColor: 'var(--color-bg)',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--color-primary-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-primary)',
                          }}
                        >
                          <Upload size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-heading)' }}>
                            Upload to Cloudinary
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                            Supports PNG, JPG, WebP directly to your Cloudinary cloud (dmjtytstd)
                          </div>
                        </div>
                      </div>

                      <label
                        className="ts-btn ts-btn-primary ts-btn-sm"
                        style={{ cursor: uploading ? 'not-allowed' : 'pointer', margin: 0 }}
                      >
                        {uploading ? 'Uploading to Cloudinary...' : 'Choose File to Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCloudinaryUpload}
                          disabled={uploading}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      required
                      className="ts-input"
                      placeholder="https://res.cloudinary.com/..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />

                    {formData.image.includes('cloudinary.com') && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                        <CheckCircle2 size={14} /> Cloudinary Hosted Asset Verified
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Library Presets:</span>
                      {PRESET_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: img.url })}
                          style={{
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: formData.image === img.url ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                            backgroundColor: formData.image === img.url ? 'var(--color-primary-subtle)' : 'transparent',
                            color: formData.image === img.url ? 'var(--color-primary)' : 'var(--color-text)',
                            cursor: 'pointer',
                          }}
                        >
                          {img.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Executive Summary (Card snippet) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      className="ts-input"
                      placeholder="Concise 2-3 sentence summary displayed on cards..."
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    />
                  </div>

                  {/* Objective & Method */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Objective (Case Study Modal)
                      </label>
                      <textarea
                        rows={3}
                        className="ts-input"
                        placeholder="Detailed trial or project objectives..."
                        value={formData.objective}
                        onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Method & Protocol (Case Study Modal)
                      </label>
                      <textarea
                        rows={3}
                        className="ts-input"
                        placeholder="Testing protocol, membrane filtration and incubation method..."
                        value={formData.method}
                        onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Key Findings List */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600 }}>Key Findings & Measured Impacts</label>
                      <button
                        type="button"
                        onClick={addKeyFinding}
                        className="ts-btn ts-btn-secondary ts-btn-sm"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        + Add Finding Bullet
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {formData.keyFindings.map((finding, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input
                            type="text"
                            className="ts-input"
                            placeholder={`Finding #${idx + 1} (e.g. 100% concordance with reference membrane filtration)`}
                            value={finding}
                            onChange={(e) => handleKeyFindingChange(idx, e.target.value)}
                          />
                          {formData.keyFindings.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeKeyFinding(idx)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer',
                              }}
                              title="Remove"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: Multilingual Overrides */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      backgroundColor: 'var(--color-bg)',
                      padding: '6px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('am')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: activeLangTab === 'am' ? 700 : 500,
                        backgroundColor: activeLangTab === 'am' ? 'var(--color-surface)' : 'transparent',
                        color: activeLangTab === 'am' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        boxShadow: activeLangTab === 'am' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      🇪🇹 Amharic (አማርኛ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('om')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: activeLangTab === 'om' ? 700 : 500,
                        backgroundColor: activeLangTab === 'om' ? 'var(--color-surface)' : 'transparent',
                        color: activeLangTab === 'om' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        boxShadow: activeLangTab === 'om' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      Afaan Oromoo
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('ti')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: activeLangTab === 'ti' ? 700 : 500,
                        backgroundColor: activeLangTab === 'ti' ? 'var(--color-surface)' : 'transparent',
                        color: activeLangTab === 'ti' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        boxShadow: activeLangTab === 'ti' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      ትግርኛ (Tigrinya)
                    </button>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Localized Title ({activeLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      className="ts-input"
                      placeholder="Title in selected language..."
                      value={formData.translations[activeLangTab].title}
                      onChange={(e) => handleTranslationChange(activeLangTab, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Localized Category Badge ({activeLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      className="ts-input"
                      placeholder="e.g. የመስክ ምርመራ / Qorannoo Dirree / ናይ ሜዳ መርመራ"
                      value={formData.translations[activeLangTab].category}
                      onChange={(e) => handleTranslationChange(activeLangTab, 'category', e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Localized Summary ({activeLangTab.toUpperCase()})
                    </label>
                    <textarea
                      rows={3}
                      className="ts-input"
                      placeholder="Summary in selected language..."
                      value={formData.translations[activeLangTab].summary}
                      onChange={(e) => handleTranslationChange(activeLangTab, 'summary', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Localized Objective ({activeLangTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={3}
                        className="ts-input"
                        placeholder="Objective..."
                        value={formData.translations[activeLangTab].objective}
                        onChange={(e) => handleTranslationChange(activeLangTab, 'objective', e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Localized Method ({activeLangTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={3}
                        className="ts-input"
                        placeholder="Method..."
                        value={formData.translations[activeLangTab].method}
                        onChange={(e) => handleTranslationChange(activeLangTab, 'method', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div
                style={{
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ts-btn ts-btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="ts-btn ts-btn-primary" disabled={loading}>
                  {loading ? 'Saving to Database...' : editingProject ? 'Update Initiative' : 'Publish Initiative to DB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagePage;
