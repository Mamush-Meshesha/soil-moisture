import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Check,
  ChevronRight,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight,
  Droplets,
  Clock,
  Cpu,
  FileCheck2,
  Plane,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { WATER_PRODUCTS } from '../../data/waterProducts';
import { useCart } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatBirr } from '../../utils/currency';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'inquire'>('desc');

  const galleryImages = [
    { src: '/images/waterscope-kit-3-1.png', label: 'Complete Kit' },
    { src: '/images/incubator.jpg', label: 'Smart Incubator' },
    { src: '/images/waterscope-kit-in-box.jpeg', label: 'Field Carry Case' },
    { src: '/images/waterscope-kit-portrait.jpg', label: 'Testing Setup' },
  ];

  const [selectedImage, setSelectedImage] = useState<string>(galleryImages[0].src);

  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const data = await api.getProduct(slug || 'waterscope-portable-kit-basic');
        if (data && data.product) {
          setProduct(data.product);
        } else {
          setProduct(WATER_PRODUCTS[0]);
        }
      } catch (err) {
        setProduct(WATER_PRODUCTS[0]);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  const p = product || WATER_PRODUCTS[0];

  const handleAddToCart = () => {
    addToCart(p, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Breadcrumb Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            fontSize: '13.5px',
            color: '#64748B',
            gap: '8px',
          }}
        >
          <Link to="/" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 500 }}>
            {t('nav.home', 'Home')}
          </Link>
          <span style={{ color: '#94A3B8' }}>/</span>
          <Link to="/store" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 500 }}>
            {t('nav.store', 'Store')}
          </Link>
          <span style={{ color: '#94A3B8' }}>/</span>
          <span style={{ color: '#64748B' }}>Water Testing Kits</span>
          <span style={{ color: '#94A3B8' }}>/</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>{p.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section style={{ padding: '48px 24px 60px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Left: Gallery & Zoom Showcase */}
            <div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '420px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={selectedImage}
                  alt={p.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: 'all 300ms ease',
                  }}
                />
              </div>

              {/* Gallery Thumbnails */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '12px',
                  marginTop: '16px',
                }}
              >
                {galleryImages.map((img) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedImage(img.src)}
                    style={{
                      height: '84px',
                      backgroundColor: '#FFFFFF',
                      border: selectedImage === img.src ? '2px solid #132745' : '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      transition: 'border-color 200ms ease',
                      outline: 'none',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Purchase Summary - Faithful to WooCommerce */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '36px 32px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              <h1
                style={{
                  fontSize: '30px',
                  fontWeight: 800,
                  color: '#132745',
                  fontFamily: 'Montserrat, Inter, sans-serif',
                  marginBottom: '14px',
                  lineHeight: 1.25,
                }}
              >
                {p.name}
              </h1>

              {/* Price */}
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#132745',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                }}
              >
                <span>$149.00</span>
                {language !== 'en' && (
                  <span style={{ fontSize: '15px', color: '#64748B', fontWeight: 500 }}>
                    ({formatBirr(p.price, language)})
                  </span>
                )}
              </div>

              {/* Verbatim Short Description from waterscope.org */}
              <p
                style={{
                  fontSize: '15px',
                  color: '#475569',
                  lineHeight: 1.65,
                  marginBottom: '28px',
                }}
              >
                WaterScope is a rapid, simple, digital, bacterial testing kit for drinking water allowing anyone to conduct a test in any location.
              </p>

              {/* Quantity & Add to Cart */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      padding: '10px 16px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#475569',
                      fontWeight: 600,
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      padding: '0 12px',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#0F172A',
                      minWidth: '24px',
                      textAlign: 'center',
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      padding: '10px 16px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#475569',
                      fontWeight: 600,
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '12px 24px',
                    backgroundColor: added ? '#059669' : '#132745',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(19, 39, 69, 0.2)',
                    transition: 'all 200ms ease',
                  }}
                >
                  {added ? (
                    <>
                      <Check size={18} /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} /> Add to cart
                    </>
                  )}
                </button>
              </div>

              {/* Category & Status Meta */}
              <div
                style={{
                  paddingTop: '20px',
                  borderTop: '1px solid #E2E8F0',
                  fontSize: '13.5px',
                  color: '#64748B',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div>
                  <strong style={{ color: '#334155' }}>Category: </strong>
                  <span style={{ color: '#0284C7' }}>Water Testing Kits</span>
                </div>
                <div>
                  <strong style={{ color: '#334155' }}>Standards: </strong>
                  <span>ISO 9308-1 Membrane Filtration Standard</span>
                </div>
                <div>
                  <strong style={{ color: '#334155' }}>Availability: </strong>
                  <span style={{ color: '#059669', fontWeight: 600 }}>In stock for immediate dispatch</span>
                </div>
              </div>

              {/* Direct links */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Link
                  to="/checkout"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    textAlign: 'center',
                    textDecoration: 'none',
                  }}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/contact"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    textAlign: 'center',
                    textDecoration: 'none',
                  }}
                >
                  Request Bulk Quote
                </Link>
              </div>
            </div>
          </div>

          {/* WooCommerce Tabs: Description & Additional Information */}
          <div
            style={{
              marginTop: '56px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Tab Headers */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
              }}
            >
              <button
                onClick={() => setActiveTab('desc')}
                style={{
                  padding: '16px 28px',
                  border: 'none',
                  borderBottom: activeTab === 'desc' ? '3px solid #132745' : '3px solid transparent',
                  backgroundColor: activeTab === 'desc' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'desc' ? '#132745' : '#64748B',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, Inter, sans-serif',
                }}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                style={{
                  padding: '16px 28px',
                  border: 'none',
                  borderBottom: activeTab === 'specs' ? '3px solid #132745' : '3px solid transparent',
                  backgroundColor: activeTab === 'specs' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'specs' ? '#132745' : '#64748B',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, Inter, sans-serif',
                }}
              >
                Additional Information
              </button>

              <button
                onClick={() => setActiveTab('inquire')}
                style={{
                  padding: '16px 28px',
                  border: 'none',
                  borderBottom: activeTab === 'inquire' ? '3px solid #132745' : '3px solid transparent',
                  backgroundColor: activeTab === 'inquire' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'inquire' ? '#132745' : '#64748B',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, Inter, sans-serif',
                }}
              >
                Institutional Inquiries
              </button>
            </div>

            {/* Tab Content */}
            <div style={{ padding: '40px 36px' }}>
              {activeTab === 'desc' && (
                <div style={{ maxWidth: '900px' }}>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#132745',
                      marginBottom: '16px',
                    }}
                  >
                    Key features and benefits
                  </h3>

                  <ul
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '12px',
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 36px 0',
                    }}
                  >
                    {[
                      'Easy-to-use metal cartridge',
                      '5 E. coli sample cartridges included',
                      'Follows ISO 9308-1 Standard',
                      'Relative risk level after 8 hours',
                      'Fully quantitative after 24 hours',
                      'Automatic colony counting',
                      'Android App + web dashboard',
                      '8 kg with all consumables (<6 kg kit)',
                      'Complies with IATA carriage rules',
                    ].map((feature, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '14.5px',
                          color: '#334155',
                        }}
                      >
                        <Check size={16} color="#0284C7" style={{ flexShrink: 0 }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Lab in a Box Section */}
                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#132745', marginBottom: '8px' }}>
                      Lab in a box
                    </h4>
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                      The WaterScope system is low-cost, light, easily transportable (&lt;6 kg), and can be easily operated making it ideal for use in low and middle-income countries. The system features a patented cartridge technology, which allows for testing to be completed without knowledge in aseptic methods. The system follows the ISO 9308-1 standard and uses conventional method of using a membrane to filter the water to isolate the bacteria, and adding nutrient media to allow bacteria to grow.
                    </p>
                  </div>

                  {/* Automated Sample Analysis Section */}
                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#132745', marginBottom: '8px' }}>
                      Automated sample analysis
                    </h4>
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                      By using high resolution microscopy and image recognition software, the system can identify bacterial colonies. Automated counting and identification removes dependent skill sets of personnel making the test faster and more effective than current systems which use personnel to identify bacterial colonies by eye.
                    </p>
                  </div>

                  {/* Data Dissemination Section */}
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#132745', marginBottom: '8px' }}>
                      Data dissemination and connectivity
                    </h4>
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                      The data from the system is uploaded automatically to our dashboard for mapping and intervention, ensuring that the integrity of the water test results is maintained throughout all stages of the process. The dashboard allows institutions/governments/NGOs to monitor tests in particular areas, assign responsible people to take action and manage their assets.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div style={{ maxWidth: '800px' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '14.5px',
                    }}
                  >
                    <tbody>
                      {[
                        { label: 'Weight', value: '8 kg (with all consumables) / 5.8 kg (base kit)' },
                        { label: 'Dimensions', value: '42 × 32 × 18 cm (ruggedized carry case)' },
                        { label: 'Standard', value: 'ISO 9308-1 Membrane Filtration' },
                        { label: 'Target Microorganisms', value: 'Total Coliforms & E. coli (CFU/100mL)' },
                        { label: 'Testing Turnaround', value: 'Relative risk after 8 hours; quantitative in 24 hours' },
                        { label: 'Sample Cartridges', value: '5× reusable metal cartridges included' },
                        { label: 'Incubation Chamber', value: 'Smart internal incubator at 44.5°C ± 0.5°C' },
                        { label: 'Optical Reader', value: 'High-resolution digital camera with automated ML colony counter' },
                        { label: 'Power Source', value: 'Rechargeable Li-Ion battery (20+ tests/charge), USB-C, 12V DC' },
                        { label: 'Carriage Compliance', value: 'Complies with IATA aircraft baggage rules' },
                        { label: 'Manufacturing & Assembly', value: 'Bahir Dar University / BiT, Ethiopia & Cambridge, UK' },
                      ].map((item, idx) => (
                        <tr
                          key={idx}
                          style={{
                            borderBottom: '1px solid #E2E8F0',
                            backgroundColor: idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                          }}
                        >
                          <td style={{ padding: '14px 20px', fontWeight: 600, color: '#132745', width: '35%' }}>
                            {item.label}
                          </td>
                          <td style={{ padding: '14px 20px', color: '#475569' }}>
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'inquire' && (
                <div style={{ maxWidth: '700px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#132745', marginBottom: '8px' }}>
                    Institutional Procurement &amp; Humanitarian WASH
                  </h4>
                  <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                    We provide volume discounts, framework procurement agreements, and customized field deployment training for NGOs (such as Action Against Hunger, UNICEF, and Oxfam), national water ministries, and municipal water authorities.
                  </p>
                  <Link
                    to="/contact"
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
                    Contact WaterScope Team for Institutional Quote <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
