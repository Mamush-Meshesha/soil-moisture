import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  X,
  AlertCircle,
  Package,
  Layers,
  DollarSign,
  Droplets,
  RefreshCw,
  Upload,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { formatBirr } from '../../utils/currency';

const PRESET_PRODUCT_IMAGES = [
  {
    name: 'Portable Kit System',
    url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Digital Incubator Chamber',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Membrane Filtration Unit',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Coliform Growth Media (100-Pack)',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Sterile Sampling Vessels',
    url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80',
  },
];

const STORE_CATEGORIES = ['Testing Kits', 'Equipment', 'Consumables', 'Accessories'];

export const StoreManagePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Testing Kits',
    price: 680,
    stockQty: 30,
    inStock: true,
    imageUrl: PRESET_PRODUCT_IMAGES[0].url,
    description: '',
    specs: [
      { key: 'Incubation Temperature', value: '37°C or 44.5°C ±0.5°C' },
      { key: 'Detection Benchmark', value: '1 CFU per 100 mL (ISO 9308-1)' },
      { key: 'Battery Capacity', value: '12 Hours (Solar / LiFePO4)' },
    ],
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getProducts();
      setProducts(res.products || []);
    } catch (err: any) {
      console.error('Failed to load products:', err);
      setError(err.message || 'Failed to load catalog from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      category: 'Testing Kits',
      price: 450,
      stockQty: 25,
      inStock: true,
      imageUrl: PRESET_PRODUCT_IMAGES[0].url,
      description: '',
      specs: [
        { key: 'Standard Protocol', value: 'ISO 9308-1 Compliant' },
        { key: 'Testing Capacity', value: 'Up to 50 samples / day' },
      ],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    const specsArray: Array<{ key: string; value: string }> = [];
    if (p.specs && typeof p.specs === 'object') {
      Object.entries(p.specs).forEach(([k, v]) => {
        specsArray.push({ key: k, value: String(v) });
      });
    }

    setFormData({
      name: p.name || '',
      slug: p.slug || '',
      category: p.category || 'Testing Kits',
      price: p.price || 0,
      stockQty: p.stockQty || 0,
      inStock: p.inStock ?? true,
      imageUrl: p.imageUrl || PRESET_PRODUCT_IMAGES[0].url,
      description: p.description || '',
      specs: specsArray.length > 0 ? specsArray : [{ key: 'Specification', value: 'Standard Value' }],
    });
    setIsModalOpen(true);
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    setFormData((prev) => {
      const updated = [...prev.specs];
      updated[index][field] = val;
      return { ...prev, specs: updated };
    });
  };

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const res = await api.uploadImage(file, 'aquascope/products');
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, imageUrl: res.url }));
        setSuccessMessage('Product image successfully uploaded to Cloudinary!');
        setTimeout(() => setSuccessMessage(null), 3500);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload product image to Cloudinary.');
    } finally {
      setUploading(false);
    }
  };

  const addSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }],
    }));
  };

  const removeSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Product name is required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert specs array to object
      const specsObj: Record<string, string> = {};
      formData.specs.forEach((s) => {
        if (s.key.trim() && s.value.trim()) {
          specsObj[s.key.trim()] = s.value.trim();
        }
      });

      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        category: formData.category,
        price: Number(formData.price),
        stockQty: Number(formData.stockQty),
        inStock: formData.inStock ? 1 : 0,
        imageUrl: formData.imageUrl,
        description: formData.description,
        specs: specsObj,
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
        setSuccessMessage(`Product "${formData.name}" updated successfully!`);
      } else {
        await api.createProduct(payload);
        setSuccessMessage(`Product "${formData.name}" added to catalog!`);
      }

      setIsModalOpen(false);
      await loadProducts();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Save failed:', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      return;
    }

    try {
      setLoading(true);
      await api.deleteProduct(id);
      setSuccessMessage(`Product removed from catalog.`);
      await loadProducts();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Delete failed:', err);
      setError(err.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalInventoryCount = products.reduce((sum, p) => sum + (p.stockQty || 0), 0);

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
              <ShoppingBag size={14} /> DYNAMIC POSTGRESQL CATALOG
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)', margin: 0 }}>
            Store Catalog & Equipment Inventory
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Manage water testing kits, membrane incubators, cartridges, and field equipment dynamically displayed on{' '}
            <a href="/store" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              /store
            </a>{' '}
            and{' '}
            <a href="/products" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              /products
            </a>
            .
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={loadProducts}
            className="ts-btn ts-btn-secondary"
            title="Refresh database records"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <a
            href="/store"
            target="_blank"
            rel="noopener noreferrer"
            className="ts-btn ts-btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ExternalLink size={16} /> View Public Store
          </a>
          <button
            onClick={openCreateModal}
            className="ts-btn ts-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={18} /> Add New Product
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
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Active Catalog Products</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
            {products.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Saved in PostgreSQL</div>
        </div>

        <div className="ts-card" style={{ padding: '18px 22px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Warehouse Stock</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)', marginTop: '4px' }}>
            {totalInventoryCount} units
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Kits, units & consumables</div>
        </div>

        <div className="ts-card" style={{ padding: '18px 22px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Catalog Categories</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
            {STORE_CATEGORIES.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Kits, Equipment, Consumables</div>
        </div>

        <div className="ts-card" style={{ padding: '18px 22px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Currency Engine</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-heading)', marginTop: '4px' }}>
            USD & ETB
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Dynamic currency conversion</div>
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
            placeholder="Search by product name or description..."
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
            <option value="ALL">All Categories ({products.length})</option>
            {STORE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({products.filter((p) => p.category === cat).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      {loading && products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div className="ts-skeleton" style={{ width: '180px', height: '24px', margin: '0 auto 16px' }} />
          <div className="ts-skeleton" style={{ width: '400px', height: '140px', margin: '0 auto' }} />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div
          className="ts-card"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
          }}
        >
          <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-heading)' }}>No Products Found</h3>
          <p style={{ fontSize: '14px', marginTop: '6px' }}>
            {searchTerm || selectedCategory !== 'ALL'
              ? 'Try adjusting your search query or category filter.'
              : 'Click "Add New Product" above to populate your water hardware catalog.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
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
              <div style={{ position: 'relative', height: '190px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PRESET_PRODUCT_IMAGES[0].url;
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
                  {product.category}
                </span>

                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: product.stockQty && product.stockQty > 0 ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {product.stockQty && product.stockQty > 0 ? `${product.stockQty} in stock` : 'Out of stock'}
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-primary)' }}>
                      ${product.price}
                      <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 500, marginLeft: '6px' }}>
                        (~{formatBirr(product.price * 125)})
                      </span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: 'var(--color-heading)',
                      lineHeight: 1.4,
                      marginBottom: '8px',
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '13.5px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '14px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Specifications Preview */}
                  {product.specs && typeof product.specs === 'object' && Object.keys(product.specs).length > 0 && (
                    <div
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        marginBottom: '16px',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>{k}:</span>
                          <span style={{ fontWeight: 600, color: 'var(--color-heading)' }}>{String(v)}</span>
                        </div>
                      ))}
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
                  <a
                    href={`/products/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600,
                    }}
                  >
                    Preview <ExternalLink size={12} />
                  </a>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openEditModal(product)}
                      className="ts-btn ts-btn-secondary ts-btn-sm"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      title="Edit Product"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="ts-btn ts-btn-sm"
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                      }}
                      title="Delete Product"
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

      {/* Add / Edit Product Modal */}
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
              maxWidth: '780px',
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
                {editingProduct ? 'Edit Catalog Product' : 'Add New Hardware Product'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                PostgreSQL Product Entity
              </span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '20px' }}>
              {editingProduct ? `Edit: ${editingProduct.name}` : 'Create New Water Testing Product'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Name & Slug */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="ts-input"
                    placeholder="e.g. AquaScope Digital Dual-Chamber Incubator"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    URL Slug (Optional)
                  </label>
                  <input
                    type="text"
                    className="ts-input"
                    placeholder="digital-dual-incubator"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>

              {/* Category, Price, Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Category *
                  </label>
                  <select
                    className="ts-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {STORE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="ts-input"
                    placeholder="e.g. 680"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Warehouse Stock Qty
                  </label>
                  <input
                    type="number"
                    className="ts-input"
                    placeholder="e.g. 30"
                    value={formData.stockQty}
                    onChange={(e) => setFormData({ ...formData, stockQty: Number(e.target.value) })}
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload & Presets */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Product Image (Cloudinary Upload or URL) *
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
                        Upload Product to Cloudinary
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        Upload product photography directly to Cloudinary (dmjtytstd)
                      </div>
                    </div>
                  </div>

                  <label
                    className="ts-btn ts-btn-primary ts-btn-sm"
                    style={{ cursor: uploading ? 'not-allowed' : 'pointer', margin: 0 }}
                  >
                    {uploading ? 'Uploading to Cloudinary...' : 'Choose Product Photo'}
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
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />

                {formData.imageUrl.includes('cloudinary.com') && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                    <CheckCircle2 size={14} /> Cloudinary Hosted Asset Verified
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Catalog Presets:</span>
                  {PRESET_PRODUCT_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: formData.imageUrl === img.url ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: formData.imageUrl === img.url ? 'var(--color-primary-subtle)' : 'transparent',
                        color: formData.imageUrl === img.url ? 'var(--color-primary)' : 'var(--color-text)',
                        cursor: 'pointer',
                      }}
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Product Description *
                </label>
                <textarea
                  required
                  rows={3}
                  className="ts-input"
                  placeholder="Detailed specifications, field benefits, and equipment capabilities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Technical Specifications */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600 }}>Technical Specifications & Benchmarks</label>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="ts-btn ts-btn-secondary ts-btn-sm"
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                  >
                    + Add Specification
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {formData.specs.map((spec, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr auto', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="ts-input"
                        placeholder="Spec Key (e.g. Battery Life)"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                      />
                      <input
                        type="text"
                        className="ts-input"
                        placeholder="Spec Value (e.g. 14 Hours Continuous)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                      />
                      {formData.specs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecRow(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                          }}
                          title="Remove specification"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Status Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                />
                <label htmlFor="inStockCheck" style={{ fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>
                  Available in Store (Active & Purchasable)
                </label>
              </div>

              {/* Form Action Buttons */}
              <div
                style={{
                  marginTop: '16px',
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
                  {loading ? 'Saving to Database...' : editingProduct ? 'Update Product' : 'Add Product to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreManagePage;
