import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  CheckCircle2,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Folder,
  Trash2,
  AlertCircle,
  Eye,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Layers,
  Plus,
  Filter,
  Search,
  Globe,
  ShoppingBag,
  FileText,
  Check,
  Maximize2,
  Clock,
  Building,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../services/api';
import { Project } from '../../types';

type PublisherMode = 'initiative' | 'product' | 'media';

const PRESET_EAST_AFRICA_TEMPLATE = {
  title: 'Rural Community Water Point Bacterial Surveillance',
  categoryKey: 'field',
  category: 'Field Testing',
  location: 'East Africa (Tanzania & Kenya)',
  date: 'March – June 2023',
  verifiedBadge: 'Verified Field Record',
  summary: 'Rural Community Water Point Bacterial Surveillance',
  description:
    'Field trials evaluating the portable testing kit across 65 rural water points, including boreholes, gravity-fed spring systems, and rainwater harvesting cisterns.',
  objective:
    'Validate rapid coliform and E. coli optical quantification against standard membrane filtration in remote, non-electrified community water distribution nodes across rural Tanzania and Kenya.',
  method:
    'Water samples (100mL) collected directly from borehole outlets, spring taps, and gravity-fed headers. Filtered through 0.45µm membrane cartridges, incubated with selective chromogenic media at 37°C/44°C using battery-powered field incubators, and quantified optically via the digital scanner.',
  partner: 'East Africa WASH Monitoring Consortium & Ministry of Water',
  keyFindings: [
    '65 rural water points tested with 100% field kit deployment success',
    '8 to 21 hours optical coliform detection vs 24+ hour conventional cultures',
    'Zero cold-chain media transport enabled remote off-grid testing across 12 districts',
  ],
  imageUrl: '/images/portable-kit-system.jpg',
};

export const UploadsManagePage: React.FC = () => {
  // Mode Selection
  const [publisherMode, setPublisherMode] = useState<PublisherMode>('initiative');

  // Initiatives Stream
  const [publishedProjects, setPublishedProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Staged Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(PRESET_EAST_AFRICA_TEMPLATE.imageUrl);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>(PRESET_EAST_AFRICA_TEMPLATE.imageUrl);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Field Initiative Form State
  const [initiativeData, setInitiativeData] = useState({
    title: PRESET_EAST_AFRICA_TEMPLATE.title,
    categoryKey: PRESET_EAST_AFRICA_TEMPLATE.categoryKey,
    category: PRESET_EAST_AFRICA_TEMPLATE.category,
    location: PRESET_EAST_AFRICA_TEMPLATE.location,
    date: PRESET_EAST_AFRICA_TEMPLATE.date,
    verifiedBadge: PRESET_EAST_AFRICA_TEMPLATE.verifiedBadge,
    summary: PRESET_EAST_AFRICA_TEMPLATE.summary,
    description: PRESET_EAST_AFRICA_TEMPLATE.description,
    objective: PRESET_EAST_AFRICA_TEMPLATE.objective,
    method: PRESET_EAST_AFRICA_TEMPLATE.method,
    partner: PRESET_EAST_AFRICA_TEMPLATE.partner,
    keyFindings: PRESET_EAST_AFRICA_TEMPLATE.keyFindings,
  });

  // Store Product Form State
  const [productData, setProductData] = useState({
    name: 'Portable Microbiological Testing Kit Pro',
    category: 'Testing Kits',
    price: 349.0,
    description: 'Complete field system for rapid bacterial water testing with battery incubator and optical colony scanner.',
    stockQty: 25,
    specsJson: JSON.stringify({ 'Detection Speed': '8 - 21 hours', 'Sensitivity': '1 CFU / 100mL', 'Incubation': 'Battery / Solar' }),
  });

  // General Media Upload State
  const [generalFolder, setGeneralFolder] = useState('aquascope/general');
  const [mediaUploadedList, setMediaUploadedList] = useState<Array<{ url: string; name: string; publicId: string; folder: string; date: string }>>([]);

  // UI Feedback
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewCaseStudyModal, setPreviewCaseStudyModal] = useState<Project | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load published projects from backend
  const loadPublishedProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await api.getProjects({ limit: 100 });
      setPublishedProjects(res.projects || []);
    } catch (err: any) {
      console.error('Failed to load published projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    loadPublishedProjects();
  }, []);

  // Handle Drag & Drop / File Selection
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 10MB limit.');
      return;
    }

    setErrorMessage(null);
    setImageFile(file);

    // Create instant local object URL for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Auto-upload to Cloudinary immediately for professional workflow
    uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      setUploadingImage(true);
      setUploadProgress(20);

      const folder =
        publisherMode === 'initiative'
          ? 'aquascope/initiatives'
          : publisherMode === 'product'
          ? 'aquascope/products'
          : generalFolder;

      const timer = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 15 : prev));
      }, 150);

      const res = await api.uploadImage(file, folder);
      clearInterval(timer);
      setUploadProgress(100);

      setCloudinaryUrl(res.url);

      // Add to general media list
      setMediaUploadedList((prev) => [
        {
          url: res.url,
          name: file.name,
          publicId: res.publicId,
          folder,
          date: 'Just now',
        },
        ...prev,
      ]);

      return res.url;
    } catch (err: any) {
      console.error('Cloudinary upload failed:', err);
      setErrorMessage(`Failed to upload to Cloudinary: ${err.message || 'Network error'}`);
      throw err;
    } finally {
      setUploadingImage(false);
    }
  };

  // Copy to clipboard helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Quick fill with user's exact East Africa Template
  const handleAutofillTemplate = () => {
    setInitiativeData({
      title: PRESET_EAST_AFRICA_TEMPLATE.title,
      categoryKey: PRESET_EAST_AFRICA_TEMPLATE.categoryKey,
      category: PRESET_EAST_AFRICA_TEMPLATE.category,
      location: PRESET_EAST_AFRICA_TEMPLATE.location,
      date: PRESET_EAST_AFRICA_TEMPLATE.date,
      verifiedBadge: PRESET_EAST_AFRICA_TEMPLATE.verifiedBadge,
      summary: PRESET_EAST_AFRICA_TEMPLATE.summary,
      description: PRESET_EAST_AFRICA_TEMPLATE.description,
      objective: PRESET_EAST_AFRICA_TEMPLATE.objective,
      method: PRESET_EAST_AFRICA_TEMPLATE.method,
      partner: PRESET_EAST_AFRICA_TEMPLATE.partner,
      keyFindings: [...PRESET_EAST_AFRICA_TEMPLATE.keyFindings],
    });
    setImagePreview(PRESET_EAST_AFRICA_TEMPLATE.imageUrl);
    setCloudinaryUrl(PRESET_EAST_AFRICA_TEMPLATE.imageUrl);
    setImageFile(null);
    setErrorMessage(null);
    setPublishSuccess(null);
  };

  // Publish Initiative to PostgreSQL and Our Work page
  const handlePublishInitiative = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeData.title.trim()) {
      setErrorMessage('Please enter an initiative title.');
      return;
    }

    try {
      setPublishing(true);
      setErrorMessage(null);

      let finalImageUrl = cloudinaryUrl;

      // If user selected a file but it hasn't uploaded yet, upload now
      if (imageFile && (!finalImageUrl || finalImageUrl.startsWith('blob:'))) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      if (!finalImageUrl) {
        finalImageUrl = PRESET_EAST_AFRICA_TEMPLATE.imageUrl;
      }

      // Generate slug
      const slug = initiativeData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') +
        '-' +
        Math.floor(100 + Math.random() * 900);

      const payload = {
        title: initiativeData.title,
        slug,
        category: initiativeData.category,
        categoryKey: initiativeData.categoryKey,
        date: initiativeData.date,
        location: initiativeData.location,
        image: finalImageUrl,
        summary: initiativeData.summary || initiativeData.title,
        objective: initiativeData.objective || initiativeData.description,
        method: initiativeData.method,
        keyFindings: initiativeData.keyFindings.filter((k) => k.trim().length > 0),
        partner: initiativeData.partner,
        order: 1,
      };

      const res = await api.createProject(payload);

      setPublishSuccess(`Initiative "${res.project?.title || initiativeData.title}" successfully published to live website!`);
      loadPublishedProjects();
    } catch (err: any) {
      console.error('Publishing failed:', err);
      setErrorMessage(err.message || 'Failed to publish initiative to database');
    } finally {
      setPublishing(false);
    }
  };

  // Publish Store Product
  const handlePublishProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPublishing(true);
      setErrorMessage(null);

      let finalImageUrl = cloudinaryUrl;
      if (imageFile && (!finalImageUrl || finalImageUrl.startsWith('blob:'))) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      let parsedSpecs = {};
      try {
        parsedSpecs = JSON.parse(productData.specsJson);
      } catch {
        parsedSpecs = { 'Standard': 'WHO Calibrated' };
      }

      await api.createProduct({
        name: productData.name,
        category: productData.category,
        price: Number(productData.price),
        description: productData.description,
        specs: parsedSpecs,
        imageUrl: finalImageUrl || PRESET_EAST_AFRICA_TEMPLATE.imageUrl,
        inStock: true,
        stockQty: Number(productData.stockQty),
      });

      setPublishSuccess(`Product "${productData.name}" published to live store catalog!`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to publish store product');
    } finally {
      setPublishing(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete initiative "${title}" from the live website?`)) {
      return;
    }
    try {
      await api.deleteProject(id);
      loadPublishedProjects();
    } catch (err: any) {
      alert(`Failed to delete initiative: ${err.message}`);
    }
  };

  // Add Key Finding pill
  const handleAddFinding = () => {
    setInitiativeData((prev) => ({
      ...prev,
      keyFindings: [...prev.keyFindings, ''],
    }));
  };

  const handleUpdateFinding = (index: number, val: string) => {
    const next = [...initiativeData.keyFindings];
    next[index] = val;
    setInitiativeData((prev) => ({ ...prev, keyFindings: next }));
  };

  const handleRemoveFinding = (index: number) => {
    setInitiativeData((prev) => ({
      ...prev,
      keyFindings: prev.keyFindings.filter((_, i) => i !== index),
    }));
  };

  // Filtered list
  const filteredProjects = publishedProjects.filter((p) => {
    const matchesSearch =
      projectSearch === '' ||
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.summary.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'all' || p.categoryKey === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '80px' }}>
      {/* Top Header Banner */}
      <div
        className="ts-card"
        style={{
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-sunken) 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <UploadCloud size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-heading)', margin: 0, letterSpacing: '-0.02em' }}>
                  Water Quality Content & Field Initiative Publisher
                </h1>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
                  Publish verified water surveillance records, humanitarian WASH case studies, and field kits directly to the live site.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: '#10B981',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <CheckCircle2 size={13} /> Cloudinary Cloud: dmjtytstd
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <ShieldCheck size={13} color="var(--color-primary)" /> Global WASH ISO 9308-1 Compliant
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Layers size={13} color="var(--color-primary)" /> PostgreSQL Database Dynamic Sync
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/our-work"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-btn ts-btn-secondary ts-btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Globe size={15} /> View Live Our Work Page <ExternalLink size={13} />
            </Link>
            <Link
              to="/store"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-btn ts-btn-secondary ts-btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ShoppingBag size={15} /> View Live Store <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '24px',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setPublisherMode('initiative')}
            style={{
              padding: '10px 18px',
              fontSize: '13.5px',
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: publisherMode === 'initiative' ? 'var(--color-primary)' : 'transparent',
              color: publisherMode === 'initiative' ? '#FFFFFF' : 'var(--color-text)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <FileText size={16} /> Field Initiative & Case Study Publisher
            <span
              style={{
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: publisherMode === 'initiative' ? 'rgba(255,255,255,0.25)' : 'var(--color-primary-subtle)',
                color: publisherMode === 'initiative' ? '#FFFFFF' : 'var(--color-primary)',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              Production Grade
            </span>
          </button>

          <button
            onClick={() => setPublisherMode('product')}
            style={{
              padding: '10px 18px',
              fontSize: '13.5px',
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: publisherMode === 'product' ? 'var(--color-primary)' : 'transparent',
              color: publisherMode === 'product' ? '#FFFFFF' : 'var(--color-text)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <ShoppingBag size={16} /> Store Product & Hardware Publisher
          </button>

          <button
            onClick={() => setPublisherMode('media')}
            style={{
              padding: '10px 18px',
              fontSize: '13.5px',
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: publisherMode === 'media' ? 'var(--color-primary)' : 'transparent',
              color: publisherMode === 'media' ? '#FFFFFF' : 'var(--color-text)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <ImageIcon size={16} /> Fast Cloudinary Media Uploader
          </button>
        </div>
      </div>

      {/* Success Alert Banner */}
      {publishSuccess && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '10px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
            <CheckCircle2 size={18} />
            <span>{publishSuccess}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/our-work" target="_blank" className="ts-btn ts-btn-sm ts-btn-primary" style={{ padding: '4px 10px', fontSize: '12px' }}>
              Inspect Live on Site <ArrowRight size={13} />
            </Link>
            <button onClick={() => setPublishSuccess(null)} style={{ background: 'none', border: 'none', color: '#10B981', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Error Alert Banner */}
      {errorMessage && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '10px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* MODE 1: PROFESSIONAL FIELD INITIATIVE & CASE STUDY PUBLISHER */}
      {publisherMode === 'initiative' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px', alignItems: 'start' }}>
          {/* Left Form: Field Initiative Details */}
          <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--color-heading)' }}>
                  Initiative Metadata & Field Photography
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
                  Fill in the surveillance metrics. Photography will be uploaded directly to Cloudinary and optimized for the global CDN.
                </p>
              </div>

              {/* Quick Template Autofill */}
              <button
                type="button"
                onClick={handleAutofillTemplate}
                className="ts-btn ts-btn-secondary ts-btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-primary)',
                  fontWeight: 700,
                }}
              >
                <Sparkles size={14} /> Quick-Fill: East Africa Surveillance
              </button>
            </div>

            <form onSubmit={handlePublishInitiative} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Image Upload Zone */}
              <div className="ts-form-group">
                <label className="ts-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>High-Resolution Field Photography (Cloudinary) *</span>
                  {uploadingImage && <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Uploading ({uploadProgress}%)...</span>}
                </label>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileSelect(e.dataTransfer.files[0]);
                    }
                  }}
                  style={{
                    border: '2px dashed var(--color-border)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: 'var(--color-surface-sunken)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                  />

                  {imagePreview ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '100%',
                          height: '180px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          backgroundColor: '#000',
                        }}
                      >
                        <img
                          src={imagePreview}
                          alt="Staged Preview"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/portable-kit-system.jpg';
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(4px)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            color: '#FFF',
                            fontWeight: 600,
                          }}
                        >
                          Click to Change Photo
                        </div>
                      </div>

                      {cloudinaryUrl && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '8px 12px',
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            fontSize: '12px',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '320px', color: 'var(--color-text-muted)' }}>
                            {cloudinaryUrl}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(cloudinaryUrl)}
                            className="ts-btn ts-btn-secondary ts-btn-sm"
                            style={{ padding: '3px 8px', fontSize: '11px' }}
                          >
                            {copiedUrl === cloudinaryUrl ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                            {copiedUrl === cloudinaryUrl ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ padding: '20px 0' }}>
                      <UploadCloud size={36} color="var(--color-primary)" style={{ margin: '0 auto 10px' }} />
                      <div style={{ fontWeight: 700, fontSize: '15px' }}>Drag & Drop Photography Here, or Browse</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Supports PNG, JPG, JPEG, WebP, SVG up to 10MB
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="ts-form-group">
                <label className="ts-label">Initiative Title / Headline *</label>
                <input
                  type="text"
                  required
                  value={initiativeData.title}
                  onChange={(e) => setInitiativeData({ ...initiativeData, title: e.target.value })}
                  placeholder="e.g. Rural Community Water Point Bacterial Surveillance"
                  className="ts-input"
                  style={{ fontSize: '15px', fontWeight: 600 }}
                />
              </div>

              {/* Category & Badge */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="ts-form-group">
                  <label className="ts-label">Category / Initiative Pillar *</label>
                  <select
                    value={initiativeData.categoryKey}
                    onChange={(e) => {
                      const key = e.target.value;
                      const catName =
                        key === 'field'
                          ? 'Field Testing'
                          : key === 'humanitarian'
                          ? 'Humanitarian WASH'
                          : key === 'research'
                          ? 'Research & Validation'
                          : key === 'community'
                          ? 'Community Workshops'
                          : 'Emergency Response';
                      setInitiativeData({ ...initiativeData, categoryKey: key, category: catName });
                    }}
                    className="ts-select"
                  >
                    <option value="field">Field Testing</option>
                    <option value="humanitarian">Humanitarian WASH</option>
                    <option value="research">Research & Validation</option>
                    <option value="community">Community Workshops</option>
                    <option value="emergency">Emergency Response</option>
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Verification Credential / Badge *</label>
                  <select
                    value={initiativeData.verifiedBadge}
                    onChange={(e) => setInitiativeData({ ...initiativeData, verifiedBadge: e.target.value })}
                    className="ts-select"
                  >
                    <option value="Verified Field Record">Verified Field Record</option>
                    <option value="ISO 9308-1 Laboratory Validated">ISO 9308-1 Laboratory Validated</option>
                    <option value="WHO Risk Tier 1 Certified">WHO Risk Tier 1 Certified</option>
                    <option value="Peer-Reviewed Case Study">Peer-Reviewed Case Study</option>
                    <option value="Humanitarian Emergency Record">Humanitarian Emergency Record</option>
                  </select>
                </div>
              </div>

              {/* Location & Timeframe */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="ts-form-group">
                  <label className="ts-label">Geographic Location / Region *</label>
                  <input
                    type="text"
                    required
                    value={initiativeData.location}
                    onChange={(e) => setInitiativeData({ ...initiativeData, location: e.target.value })}
                    placeholder="e.g. East Africa (Tanzania & Kenya)"
                    className="ts-input"
                  />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Field Testing Timeframe / Date *</label>
                  <input
                    type="text"
                    required
                    value={initiativeData.date}
                    onChange={(e) => setInitiativeData({ ...initiativeData, date: e.target.value })}
                    placeholder="e.g. March – June 2023"
                    className="ts-input"
                  />
                </div>
              </div>

              {/* Summary / Headline Description */}
              <div className="ts-form-group">
                <label className="ts-label">Card Summary / Headline Description *</label>
                <textarea
                  rows={2}
                  required
                  value={initiativeData.summary}
                  onChange={(e) => setInitiativeData({ ...initiativeData, summary: e.target.value })}
                  placeholder="Short engaging description for cards and public search"
                  className="ts-textarea"
                />
              </div>

              {/* Detailed Field Scope */}
              <div className="ts-form-group">
                <label className="ts-label">Detailed Scope & Methodology *</label>
                <textarea
                  rows={3}
                  required
                  value={initiativeData.description}
                  onChange={(e) => setInitiativeData({ ...initiativeData, description: e.target.value })}
                  placeholder="Field trials evaluating the portable testing kit across 65 rural water points, including boreholes..."
                  className="ts-textarea"
                />
              </div>

              {/* Partner */}
              <div className="ts-form-group">
                <label className="ts-label">Implementing Partner / Organization</label>
                <input
                  type="text"
                  value={initiativeData.partner}
                  onChange={(e) => setInitiativeData({ ...initiativeData, partner: e.target.value })}
                  placeholder="e.g. East Africa WASH Consortium & Ministry of Water"
                  className="ts-input"
                />
              </div>

              {/* Key Findings Pills */}
              <div className="ts-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="ts-label" style={{ margin: 0 }}>Key Findings & Validated Metrics</label>
                  <button
                    type="button"
                    onClick={handleAddFinding}
                    className="ts-btn ts-btn-secondary ts-btn-sm"
                    style={{ fontSize: '11px', padding: '2px 8px' }}
                  >
                    <Plus size={12} /> Add Metric
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {initiativeData.keyFindings.map((finding, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={finding}
                        onChange={(e) => handleUpdateFinding(idx, e.target.value)}
                        placeholder={`Metric ${idx + 1}: e.g. 65 rural water points tested`}
                        className="ts-input"
                        style={{ fontSize: '13px' }}
                      />
                      {initiativeData.keyFindings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFinding(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                <button
                  type="submit"
                  disabled={publishing}
                  className="ts-btn ts-btn-primary"
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {publishing ? (
                    <>
                      <RefreshCw size={18} className="spin" /> Publishing to Live Site...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} /> Publish to Live "Our Work" Page
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleAutofillTemplate}
                  className="ts-btn ts-btn-secondary"
                  style={{ padding: '12px 18px', fontWeight: 600 }}
                >
                  Reset Template
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Interactive WYSIWYG Preview */}
          <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: 'var(--color-surface)',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                <Eye size={16} color="var(--color-primary)" />
                <span>Live Website Preview</span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                }}
              >
                Exact Public Card
              </span>
            </div>

            {/* Render Public Card */}
            <div
              className="ts-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                overflow: 'hidden',
                borderRadius: '14px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Image & Category Pill */}
              <div
                style={{
                  position: 'relative',
                  height: '220px',
                  backgroundColor: 'var(--color-surface-sunken)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={imagePreview || PRESET_EAST_AFRICA_TEMPLATE.imageUrl}
                  alt={initiativeData.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/portable-kit-system.jpg';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(11, 37, 69, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    letterSpacing: '0.03em',
                  }}
                >
                  {initiativeData.category}
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Meta location & date */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    fontSize: '12.5px',
                    color: 'var(--color-text-muted)',
                    marginBottom: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="var(--color-primary)" /> {initiativeData.location || 'Location'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="var(--color-primary)" /> {initiativeData.date || 'Date'}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    color: 'var(--color-heading)',
                    lineHeight: 1.35,
                    marginBottom: '10px',
                  }}
                >
                  {initiativeData.title || 'Initiative Title'}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {initiativeData.description || 'Description of the field trial and water surveillance scope...'}
                </p>

                {/* Card Footer */}
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
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <ShieldCheck size={14} /> {initiativeData.verifiedBadge}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setPreviewCaseStudyModal({
                        id: 'preview-id',
                        slug: 'preview',
                        title: initiativeData.title,
                        category: initiativeData.category,
                        categoryKey: initiativeData.categoryKey,
                        location: initiativeData.location,
                        date: initiativeData.date,
                        image: imagePreview || PRESET_EAST_AFRICA_TEMPLATE.imageUrl,
                        summary: initiativeData.summary,
                        objective: initiativeData.objective,
                        method: initiativeData.method,
                        keyFindings: initiativeData.keyFindings,
                        partner: initiativeData.partner,
                      } as any);
                    }}
                    className="ts-btn ts-btn-secondary ts-btn-sm"
                    style={{ borderRadius: '6px', fontSize: '12px' }}
                  >
                    View Case Study <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: STORE PRODUCT PUBLISHER */}
      {publisherMode === 'product' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px', alignItems: 'start' }}>
          <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Publish Water Testing Kit to Store</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
              Add a new hardware test kit, replacement filters, or incubator to the dynamic store catalog.
            </p>

            <form onSubmit={handlePublishProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="ts-form-group">
                <label className="ts-label">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productData.name}
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  className="ts-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="ts-form-group">
                  <label className="ts-label">Category</label>
                  <select
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                    className="ts-select"
                  >
                    <option>Testing Kits</option>
                    <option>Consumables & Cartridges</option>
                    <option>Incubation Hardware</option>
                    <option>Calibration Standards</option>
                  </select>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Price (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) || 0 })}
                    className="ts-input"
                  />
                </div>
              </div>

              <div className="ts-form-group">
                <label className="ts-label">Product Description</label>
                <textarea
                  rows={3}
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  className="ts-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={publishing}
                className="ts-btn ts-btn-primary"
                style={{ padding: '12px 20px', fontWeight: 700 }}
              >
                {publishing ? 'Publishing Product...' : 'Publish to Store Catalog'}
              </button>
            </form>
          </div>

          {/* Product Preview Card */}
          <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Store Catalog Card Preview</h3>
            <div style={{ borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
              <div style={{ height: '180px', backgroundColor: 'var(--color-surface-sunken)', overflow: 'hidden' }}>
                <img
                  src={imagePreview || 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80'}
                  alt={productData.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '16px' }}>
                <span className="ts-badge ts-badge-neutral">{productData.category}</span>
                <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '8px 0 4px' }}>{productData.name}</h4>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '8px' }}>
                  ${productData.price.toFixed(2)}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>{productData.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: DIRECT CLOUDINARY FAST MEDIA UPLOADER */}
      {publisherMode === 'media' && (
        <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Fast Cloudinary Asset Uploader</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
              Drag and drop any water testing image or diagram to generate an immediate, optimized Cloudinary CDN URL.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <label className="ts-label" style={{ margin: 0 }}>Target Bucket Folder:</label>
            <select
              value={generalFolder}
              onChange={(e) => setGeneralFolder(e.target.value)}
              className="ts-select"
              style={{ maxWidth: '260px' }}
            >
              <option value="aquascope/initiatives">aquascope/initiatives</option>
              <option value="aquascope/products">aquascope/products</option>
              <option value="aquascope/general">aquascope/general</option>
            </select>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileSelect(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed var(--color-border)',
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--color-surface-sunken)',
              cursor: 'pointer',
            }}
          >
            <UploadCloud size={44} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '16px', fontWeight: 700 }}>Click or Drop Images to Upload to Cloudinary</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Auto-optimized for web with HTTPS CDN delivery
            </div>
          </div>
        </div>
      )}

      {/* PUBLISHED INITIATIVES & LIVE MEDIA FEED */}
      <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--color-heading)' }}>
              Published Field Initiatives ({publishedProjects.length})
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
              Live dynamic initiatives served from PostgreSQL to the public website (/our-work and homepage).
            </p>
          </div>

          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search initiatives..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="ts-input"
                style={{ paddingLeft: '32px', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {(['all', 'field', 'humanitarian', 'research'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`ts-btn ts-btn-sm ${selectedCategoryFilter === cat ? 'ts-btn-primary' : 'ts-btn-secondary'}`}
                  style={{ textTransform: 'capitalize', fontSize: '12px', padding: '4px 10px' }}
                >
                  {cat === 'all' ? 'All Initiatives' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Initiatives Grid */}
        {loadingProjects ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div className="ts-skeleton" style={{ width: '80%', height: '140px', margin: '0 auto' }} />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No initiatives match the filter. Use the form above to publish your first field record.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="ts-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ position: 'relative', height: '160px', backgroundColor: '#000', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(11, 37, 69, 0.85)',
                      color: '#FFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {p.category}
                  </div>
                </div>

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="var(--color-primary)" /> {p.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} color="var(--color-primary)" /> {p.date}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-heading)' }}>
                      {p.title}
                    </h4>

                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
                      {p.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleCopy(p.image)}
                        className="ts-btn ts-btn-secondary ts-btn-sm"
                        style={{ fontSize: '11px', padding: '3px 8px' }}
                        title="Copy Cloudinary Image URL"
                      >
                        {copiedUrl === p.image ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                        {copiedUrl === p.image ? 'Copied' : 'CDN URL'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPreviewCaseStudyModal(p)}
                        className="ts-btn ts-btn-secondary ts-btn-sm"
                        style={{ fontSize: '11px', padding: '3px 8px' }}
                      >
                        <Eye size={12} /> Case Study
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteProject(p.id, p.title)}
                      className="ts-btn ts-btn-secondary ts-btn-sm"
                      style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '3px 8px' }}
                      title="Delete from Database"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Case Study Lightbox / Modal */}
      {previewCaseStudyModal && (
        <div
          className="ts-modal-backdrop"
          onClick={() => setPreviewCaseStudyModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px',
          }}
        >
          <div
            className="ts-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '720px',
              width: '100%',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header image */}
            <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
              <img
                src={previewCaseStudyModal.image}
                alt={previewCaseStudyModal.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setPreviewCaseStudyModal(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  border: 'none',
                  color: '#FFF',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(11, 37, 69, 0.9)',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '6px',
                }}
              >
                {previewCaseStudyModal.category}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="var(--color-primary)" /> {previewCaseStudyModal.location}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} color="var(--color-primary)" /> {previewCaseStudyModal.date}
                  </span>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--color-heading)' }}>
                  {previewCaseStudyModal.title}
                </h2>
              </div>

              <div>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '6px' }}>
                  Surveillance Scope & Objective
                </h4>
                <p style={{ fontSize: '14.5px', color: 'var(--color-text)', lineHeight: 1.6, margin: 0 }}>
                  {previewCaseStudyModal.objective || previewCaseStudyModal.summary}
                </p>
              </div>

              {previewCaseStudyModal.method && (
                <div>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '6px' }}>
                    Testing Methodology & Assay
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {previewCaseStudyModal.method}
                  </p>
                </div>
              )}

              {previewCaseStudyModal.keyFindings && previewCaseStudyModal.keyFindings.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '8px' }}>
                    Validated Field Metrics & Outcomes
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {previewCaseStudyModal.keyFindings.map((finding, idx) => (
                      <li key={idx} style={{ fontSize: '13.5px', color: 'var(--color-text)', lineHeight: 1.5 }}>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {previewCaseStudyModal.partner && (
                <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-surface-sunken)', borderRadius: '8px', fontSize: '13px' }}>
                  <strong style={{ color: 'var(--color-heading)' }}>Implementing Partner: </strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>{previewCaseStudyModal.partner}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                <Link
                  to="/our-work"
                  target="_blank"
                  className="ts-btn ts-btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Globe size={15} /> View on Public Website <ExternalLink size={13} />
                </Link>
                <button
                  type="button"
                  onClick={() => setPreviewCaseStudyModal(null)}
                  className="ts-btn ts-btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
