import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Globe as GlobeIcon,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Droplets,
  Microscope,
  CheckCircle2,
  Radio,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PartnerLocation {
  id: string;
  name: string;
  country: string;
  flag: string;
  region: string;
  lat: number;
  lng: number;
  partnerOrg: string;
  initiative: string;
  sitesCount: number;
  category: 'FIELD_TRIAL' | 'VALIDATION_HUB' | 'TECH_ACCELERATOR' | 'HUMANITARIAN_RAPID';
  complianceRate: string;
  standard: string;
  pinColor: string;
  badgeBg: string;
  badgeColor: string;
  summary: string;
}

export const PARTNER_LOCATIONS: PartnerLocation[] = [
  {
    id: 'kenya-tanzania',
    name: 'East Africa WASH Surveillance Initiative',
    country: 'Kenya & Tanzania',
    flag: '🇰🇪 🇹🇿',
    region: 'Rift Valley & Lake Victoria Basin',
    lat: -0.3031,
    lng: 36.0800,
    partnerOrg: 'Oxfam WASH, Rift Valley Water District & Siaya County',
    initiative: 'Rural Community Water Point Bacterial Surveillance',
    sitesCount: 65,
    category: 'FIELD_TRIAL',
    complianceRate: '99.2% WHO Potable',
    standard: 'ISO 9308-1 Rapid Coliform (8-21 hrs)',
    pinColor: '#10B981', // Emerald
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeColor: '#10B981',
    summary:
      'Field trials evaluating portable testing kits across 65 rural water points, including deep boreholes, gravity spring catchments, and community tapstands.',
  },
  {
    id: 'ethiopia',
    name: 'High-Elevation Spring & WASH Network',
    country: 'Ethiopia',
    flag: '🇪🇹',
    region: 'Oromia & Amhara Regional States',
    lat: 9.0320,
    lng: 38.7480,
    partnerOrg: 'UNICEF Ethiopia, WaterAid & Regional Water Bureaus',
    initiative: 'High-Elevation Protected Spring & Gravity Scheme Monitoring',
    sitesCount: 42,
    category: 'FIELD_TRIAL',
    complianceRate: '98.6% WHO Potable',
    standard: 'Zero Cold-Chain Ambient Stable Media',
    pinColor: '#0EA5E9', // Cyan
    badgeBg: 'rgba(14, 165, 233, 0.12)',
    badgeColor: '#0EA5E9',
    summary:
      'Deploying water testing in rugged, off-grid mountainous highlands where conventional lab transport takes days. Demonstrating zero cold-chain incubation.',
  },
  {
    id: 'geneva',
    name: 'WHO Global Validation & Standards Hub',
    country: 'Switzerland',
    flag: '🇨🇭',
    region: 'Geneva',
    lat: 46.2044,
    lng: 6.1432,
    partnerOrg: 'WHO Global WASH Working Group & AidEx Humanitarian Forum',
    initiative: 'ISO 9308-1 International Microbial Detection Benchmarking',
    sitesCount: 1,
    category: 'VALIDATION_HUB',
    complianceRate: '100% Laboratory Benchmark',
    standard: '1 CFU / 100mL ISO Benchmark',
    pinColor: '#6366F1', // Indigo
    badgeBg: 'rgba(99, 102, 241, 0.12)',
    badgeColor: '#6366F1',
    summary:
      'Reference laboratory performing peer-reviewed validation against standard membrane filtration methods and international drinking water directives.',
  },
  {
    id: 'uk-cambridge',
    name: 'Biotech & Sensor Engineering Center',
    country: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Cambridge & London',
    lat: 52.2053,
    lng: 0.1218,
    partnerOrg: 'University of Cambridge Biotech Accelerator & Health Labs',
    initiative: 'Automated Optical Colony Detection & Handheld Scanner Engineering',
    sitesCount: 1,
    category: 'TECH_ACCELERATOR',
    complianceRate: 'Hardware Tier 1',
    standard: 'High-Res Optical Scanner Calibration',
    pinColor: '#A855F7', // Purple
    badgeBg: 'rgba(168, 85, 247, 0.12)',
    badgeColor: '#A855F7',
    summary:
      'Core technology research unit advancing digital colony counting algorithms, incubator hardware, and cloud telemetry integration.',
  },
  {
    id: 'bangladesh',
    name: 'Monsoonal Crisis & Refugee WASH Hub',
    country: 'Bangladesh',
    flag: '🇧🇩',
    region: "Cox's Bazar & Meghna Delta",
    lat: 21.4272,
    lng: 92.0058,
    partnerOrg: 'UNHCR Emergency WASH Response & BRAC Bangladesh',
    initiative: 'Rapid Coliform Surveillance in Flood Zones & Dense Settlements',
    sitesCount: 88,
    category: 'HUMANITARIAN_RAPID',
    complianceRate: '96.4% Potable (Emergency Mode)',
    standard: 'Rapid Presence/Absence in 8 hrs',
    pinColor: '#F59E0B', // Amber
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    badgeColor: '#F59E0B',
    summary:
      'Emergency rapid bacterial detection for flood-affected shallow tubewells and high-density displaced communities vulnerable to waterborne outbreaks.',
  },
  {
    id: 'colombia',
    name: 'Indigenous Community River Basin Protection',
    country: 'Colombia',
    flag: '🇨🇴',
    region: 'Chocó & La Guajira',
    lat: 5.6922,
    lng: -76.6582,
    partnerOrg: 'Cruz Roja Colombiana (Red Cross) & Community Aqueducts',
    initiative: 'Indigenous River Water Quality & Solar Chlorination Monitoring',
    sitesCount: 34,
    category: 'FIELD_TRIAL',
    complianceRate: '97.8% Treated Potable',
    standard: 'Surface Water Turbidity & E. coli',
    pinColor: '#10B981', // Emerald
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeColor: '#10B981',
    summary:
      'Community-led monitoring verifying gravity-fed aqueducts and solar chlorine dosers for remote rainforest communities along the Atrato River basin.',
  },
  {
    id: 'jordan',
    name: 'Arid Aquifer & Deep Well Safety Program',
    country: 'Jordan',
    flag: '🇯🇴',
    region: 'Zaatari & Azraq Basins',
    lat: 32.2968,
    lng: 36.3268,
    partnerOrg: 'UNICEF MENA & ACTED Jordan',
    initiative: 'Deep Groundwater Salinity & Microbiological Security in Arid Zones',
    sitesCount: 28,
    category: 'HUMANITARIAN_RAPID',
    complianceRate: '99.0% Potable',
    standard: 'Thermal Stability to 42°C',
    pinColor: '#0EA5E9', // Cyan
    badgeBg: 'rgba(14, 165, 233, 0.12)',
    badgeColor: '#0EA5E9',
    summary:
      'Surveillance testing across deep aquifer boreholes and piped desalination networks in high ambient heat arid environments.',
  },
];

// Simplified high-resolution continental polygon data points [lat, lng]
const CONTINENTS: [number, number][][] = [
  // Africa
  [
    [37.3, 9.8], [36.8, 11.0], [32.0, 20.0], [31.5, 25.0], [31.3, 31.5], [29.9, 32.5],
    [27.5, 34.0], [22.0, 36.8], [15.5, 41.5], [11.8, 43.5], [11.8, 51.2], [5.0, 48.5],
    [-0.5, 42.5], [-4.5, 39.5], [-11.0, 40.5], [-16.0, 40.0], [-25.0, 35.0], [-28.5, 32.5],
    [-34.0, 25.5], [-34.8, 20.0], [-33.0, 18.0], [-28.5, 16.5], [-17.0, 11.8], [-12.5, 13.5],
    [-5.0, 12.0], [4.5, 9.0], [4.5, 1.0], [5.5, -3.0], [4.8, -7.0], [7.0, -12.5],
    [11.5, -16.0], [14.8, -17.2], [21.0, -17.0], [28.0, -12.5], [33.5, -7.5], [35.8, -5.5],
    [36.0, -1.0], [37.3, 9.8]
  ],
  // Eurasia (Europe + Asia)
  [
    [36.0, -5.5], [43.5, -9.0], [47.5, -3.0], [51.0, 1.5], [54.0, 8.5], [57.5, 8.5],
    [59.0, 10.5], [62.0, 5.0], [68.0, 14.0], [71.0, 28.0], [70.0, 40.0], [67.0, 50.0],
    [69.0, 60.0], [73.0, 70.0], [73.0, 80.0], [76.0, 95.0], [77.5, 105.0], [74.0, 135.0],
    [71.0, 150.0], [66.0, 170.0], [60.0, 165.0], [52.0, 158.0], [45.0, 142.0], [40.0, 128.0],
    [36.0, 120.0], [30.0, 122.0], [22.0, 114.0], [21.0, 108.0], [10.0, 104.0], [1.5, 103.5],
    [10.0, 98.0], [16.0, 96.0], [22.0, 90.0], [20.0, 85.0], [13.0, 80.0], [8.0, 77.5],
    [15.0, 74.0], [23.0, 69.0], [25.0, 61.0], [25.5, 57.0], [27.0, 50.0], [30.0, 48.0],
    [31.5, 35.0], [36.5, 36.0], [36.5, 32.0], [41.0, 29.0], [45.0, 30.0], [46.5, 30.5],
    [40.0, 23.0], [38.0, 24.0], [36.5, 22.0], [41.0, 15.0], [44.0, 12.0], [38.0, 15.5],
    [37.0, 14.0], [41.5, 9.0], [43.5, 4.0], [41.0, 1.0], [36.0, -5.5]
  ],
  // North America
  [
    [71.0, -156.0], [65.0, -168.0], [59.0, -160.0], [55.0, -164.0], [58.0, -150.0],
    [54.0, -133.0], [48.0, -124.0], [37.5, -122.5], [32.5, -117.0], [23.0, -110.0],
    [19.0, -105.0], [14.5, -92.0], [8.5, -78.0], [9.5, -83.0], [16.0, -88.0],
    [21.5, -97.0], [26.0, -97.0], [29.5, -94.0], [29.0, -89.0], [25.0, -80.5],
    [31.0, -81.5], [36.0, -75.5], [41.0, -71.5], [44.0, -68.0], [47.0, -65.0],
    [47.0, -53.0], [52.0, -56.0], [58.0, -62.0], [60.0, -65.0], [62.0, -75.0],
    [55.0, -80.0], [58.0, -94.0], [64.0, -88.0], [68.0, -108.0], [70.0, -130.0],
    [71.0, -156.0]
  ],
  // South America
  [
    [12.0, -72.0], [10.5, -62.0], [6.0, -55.0], [-1.0, -48.0], [-5.0, -35.0],
    [-13.0, -38.5], [-23.0, -43.0], [-30.0, -50.0], [-35.0, -55.0], [-40.0, -62.0],
    [-52.0, -68.0], [-55.0, -67.0], [-53.0, -73.0], [-45.0, -75.0], [-35.0, -72.5],
    [-20.0, -70.0], [-12.0, -77.0], [-4.0, -81.0], [1.0, -79.0], [8.0, -77.0],
    [11.5, -74.5], [12.0, -72.0]
  ],
  // Australia
  [
    [-11.5, 142.5], [-15.0, 145.0], [-24.0, 153.0], [-32.0, 152.5], [-38.0, 146.0],
    [-38.5, 142.0], [-35.0, 137.0], [-32.0, 132.0], [-34.5, 120.0], [-34.0, 115.0],
    [-26.0, 113.0], [-20.0, 118.0], [-15.0, 124.0], [-12.0, 131.0], [-12.0, 136.0],
    [-16.0, 139.0], [-11.5, 142.5]
  ],
  // United Kingdom & Ireland
  [
    [50.0, -5.5], [52.0, -4.5], [55.0, -5.5], [58.5, -5.0], [58.0, -3.0],
    [55.0, -1.5], [52.5, 1.5], [51.0, 1.0], [50.5, -2.0], [50.0, -5.5]
  ],
];

// Connecting telemetry communication arcs between global hubs
const TELEMETRY_ARCS = [
  { fromId: 'geneva', toId: 'kenya-tanzania', color: '#10B981' },
  { fromId: 'uk-cambridge', toId: 'ethiopia', color: '#0EA5E9' },
  { fromId: 'geneva', toId: 'bangladesh', color: '#F59E0B' },
  { fromId: 'kenya-tanzania', toId: 'colombia', color: '#10B981' },
  { fromId: 'kenya-tanzania', toId: 'jordan', color: '#0EA5E9' },
];

export const GlobalPartnerGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

  const [activePartner, setActivePartner] = useState<PartnerLocation>(PARTNER_LOCATIONS[0]);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hoveredPartner, setHoveredPartner] = useState<PartnerLocation | null>(null);

  // Rotation angles (degrees)
  // rotY is longitude rotation, rotX is latitude tilt
  const rotYRef = useRef<number>(-36); // Center on East Africa initially
  const rotXRef = useRef<number>(10);
  const targetRotYRef = useRef<number>(-36);
  const targetRotXRef = useRef<number>(10);
  const autoRotateRef = useRef<boolean>(true);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Center on a selected partner
  const handleSelectPartner = useCallback((partner: PartnerLocation) => {
    setActivePartner(partner);
    // Point the camera towards the partner's lat/lng
    targetRotYRef.current = -partner.lng;
    targetRotXRef.current = Math.max(-30, Math.min(30, partner.lat * 0.6));
  }, []);

  // 3D Orthographic Projection function
  const project = useCallback(
    (lat: number, lng: number, radius: number, cx: number, cy: number, rY: number, rX: number) => {
      const phi = (lat * Math.PI) / 180;
      const lambda = ((lng + rY) * Math.PI) / 180;
      const theta = (rX * Math.PI) / 180;

      // 3D vector on unit sphere
      const x = Math.cos(phi) * Math.sin(lambda);
      const y = Math.sin(phi);
      const z = Math.cos(phi) * Math.cos(lambda);

      // Tilt around X axis by theta
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const yRot = y * cosT - z * sinT;
      const zRot = y * sinT + z * cosT;

      return {
        screenX: cx + x * radius,
        screenY: cy - yRot * radius,
        isVisible: zRot > 0.05,
        depth: zRot,
      };
    },
    []
  );

  // Main Canvas Render Loop
  useEffect(() => {
    let animId: number;
    let pulseAngle = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle auto-rotation
      if (autoRotateRef.current && !isDraggingRef.current) {
        targetRotYRef.current -= 0.28;
      }

      // Smooth camera interpolation
      rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.08;
      rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.08;

      pulseAngle += 0.05;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Atmospheric Outer Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.88, cx, cy, radius * 1.14);
      glowGrad.addColorStop(0, 'rgba(14, 165, 233, 0.22)');
      glowGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.10)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.14, 0, Math.PI * 2);
      ctx.fill();

      // 2. Deep Ocean Sphere (Base)
      const oceanGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
      oceanGrad.addColorStop(0, '#0E284A');
      oceanGrad.addColorStop(0.5, '#081B33');
      oceanGrad.addColorStop(0.85, '#051224');
      oceanGrad.addColorStop(1, '#020914');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // 3. Latitude & Longitude Graticule Lines
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip(); // Keep graticules inside the sphere

      // Parallels (Latitudes)
      const parallels = [-60, -30, 0, 30, 60];
      parallels.forEach((lat) => {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 4) {
          const p = project(lat, lng, radius, cx, cy, rotYRef.current, rotXRef.current);
          if (p.isVisible) {
            if (first) {
              ctx.moveTo(p.screenX, p.screenY);
              first = false;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = lat === 0 ? 'rgba(14, 165, 233, 0.28)' : 'rgba(14, 165, 233, 0.10)';
        ctx.lineWidth = lat === 0 ? 1.2 : 0.7;
        ctx.stroke();
      });

      // Meridians (Longitudes)
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 4) {
          const p = project(lat, lng, radius, cx, cy, rotYRef.current, rotXRef.current);
          if (p.isVisible) {
            if (first) {
              ctx.moveTo(p.screenX, p.screenY);
              first = false;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.10)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // 4. Render Continents & Landmass Polygons
      CONTINENTS.forEach((poly) => {
        ctx.beginPath();
        let first = true;
        let drawnPoints = 0;

        poly.forEach(([lat, lng]) => {
          const p = project(lat, lng, radius, cx, cy, rotYRef.current, rotXRef.current);
          if (p.isVisible) {
            if (first) {
              ctx.moveTo(p.screenX, p.screenY);
              first = false;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
            drawnPoints++;
          } else {
            first = true;
          }
        });

        if (drawnPoints > 2) {
          ctx.fillStyle = 'rgba(14, 165, 233, 0.14)';
          ctx.fill();
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      });

      // 5. Render Great-Circle Telemetry Arcs between hubs
      TELEMETRY_ARCS.forEach((arc) => {
        const fromLoc = PARTNER_LOCATIONS.find((p) => p.id === arc.fromId);
        const toLoc = PARTNER_LOCATIONS.find((p) => p.id === arc.toId);
        if (!fromLoc || !toLoc) return;

        const pFrom = project(fromLoc.lat, fromLoc.lng, radius, cx, cy, rotYRef.current, rotXRef.current);
        const pTo = project(toLoc.lat, toLoc.lng, radius, cx, cy, rotYRef.current, rotXRef.current);

        // Draw arc if at least one hub is facing the camera
        if (pFrom.depth > -0.2 || pTo.depth > -0.2) {
          // Compute elevated 3D midpoint for the arch
          const midLat = (fromLoc.lat + toLoc.lat) / 2;
          const midLng = (fromLoc.lng + toLoc.lng) / 2;
          const arcElevation = 1.18; // 18% lift above surface
          const pMid = project(midLat, midLng, radius * arcElevation, cx, cy, rotYRef.current, rotXRef.current);

          ctx.beginPath();
          ctx.moveTo(pFrom.screenX, pFrom.screenY);
          ctx.quadraticCurveTo(pMid.screenX, pMid.screenY, pTo.screenX, pTo.screenY);
          ctx.strokeStyle = arc.color + '60';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated moving telemetry photon along the arc
          const t = (Math.sin(pulseAngle * 1.5 + fromLoc.lat) + 1) / 2;
          const qx = (1 - t) * (1 - t) * pFrom.screenX + 2 * (1 - t) * t * pMid.screenX + t * t * pTo.screenX;
          const qy = (1 - t) * (1 - t) * pFrom.screenY + 2 * (1 - t) * t * pMid.screenY + t * t * pTo.screenY;

          ctx.beginPath();
          ctx.arc(qx, qy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = arc.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      ctx.restore(); // Restore clip

      // 6. 3D Globe Edge Specular Rim Highlight
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 7. Render Partner Beacon Pins & Labels
      PARTNER_LOCATIONS.forEach((partner) => {
        const p = project(partner.lat, partner.lng, radius, cx, cy, rotYRef.current, rotXRef.current);
        if (!p.isVisible) return;

        const isSelected = activePartner.id === partner.id;
        const isHovered = hoveredPartner?.id === partner.id;
        const pinSize = isSelected ? 8 : 5.5;

        // Dynamic depth fading for nodes on the curved rim
        const alpha = Math.max(0.2, Math.min(1, p.depth * 1.4));
        ctx.globalAlpha = alpha;

        // Animated Beacon Pulse Ring
        const ringRadius = pinSize + 4 + Math.sin(pulseAngle * 2 + partner.lat) * 3;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, ringRadius, 0, Math.PI * 2);
        ctx.fillStyle = partner.pinColor + '30';
        ctx.fill();

        // Pin Core Dot
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, pinSize, 0, Math.PI * 2);
        ctx.fillStyle = partner.pinColor;
        ctx.shadowColor = partner.pinColor;
        ctx.shadowBlur = isSelected ? 14 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // White Center Core
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, pinSize * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Label Tag (Selected or Prominent Nodes)
        if (isSelected || isHovered || partner.id === 'kenya-tanzania' || partner.id === 'geneva') {
          const labelText = `${partner.flag} ${partner.country}`;
          ctx.font = 'bold 11px Inter, system-ui, sans-serif';
          const textWidth = ctx.measureText(labelText).width;
          const boxPadding = 6;
          const boxWidth = textWidth + boxPadding * 2;
          const boxHeight = 20;
          const boxX = p.screenX - boxWidth / 2;
          const boxY = p.screenY - pinSize - 22;

          // Box Background
          ctx.fillStyle = 'rgba(7, 18, 30, 0.88)';
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 4);
          ctx.fill();
          ctx.strokeStyle = isSelected ? partner.pinColor : 'rgba(56, 189, 248, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Text
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(labelText, boxX + boxPadding, boxY + 14);

          // Indicator Line to Pin
          ctx.beginPath();
          ctx.moveTo(p.screenX, boxY + boxHeight);
          ctx.lineTo(p.screenX, p.screenY - pinSize - 1);
          ctx.strokeStyle = partner.pinColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    // Initialize Canvas Dimensions with DPR
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, 560);

      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [project, activePartner, hoveredPartner]);

  // Pointer Interaction Handlers for Dragging to Rotate
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Hit-testing pins on hover
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.42;

    let found: PartnerLocation | null = null;
    PARTNER_LOCATIONS.forEach((partner) => {
      const p = project(partner.lat, partner.lng, radius, cx, cy, rotYRef.current, rotXRef.current);
      if (p.isVisible) {
        const dist = Math.hypot(p.screenX - mouseX, p.screenY - mouseY);
        if (dist < 18) {
          found = partner;
        }
      }
    });
    setHoveredPartner(found);

    // Drag-to-rotate handling
    if (isDraggingRef.current && lastMousePosRef.current) {
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;

      targetRotYRef.current += deltaX * 0.5;
      targetRotXRef.current = Math.max(-45, Math.min(45, targetRotXRef.current - deltaY * 0.4));

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    // If clicked on a hovered pin, select it
    if (hoveredPartner) {
      handleSelectPartner(hoveredPartner);
    }
  };

  return (
    <div className="ts-smart-card" style={{ padding: '26px', position: 'relative', overflow: 'hidden' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              className="ts-telemetry-badge ts-telemetry-badge-safe"
              style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Radio size={13} className="pulse-indicator" color="#10B981" />
              GLOBAL SURVEILLANCE NETWORK
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {PARTNER_LOCATIONS.length} Active International Deployments & Research Hubs
            </span>
          </div>

          <h2
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--color-heading)',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <GlobeIcon size={22} color="var(--color-primary)" />
            Global Partner Deployments & Field Trial Locations
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px', maxWidth: '780px' }}>
            Interactive 3D geospatial surveillance displaying community water testing nodes, ISO 9308-1 validation hubs, and humanitarian WASH deployments. Click any location pin or drag to spin the globe.
          </p>
        </div>

        {/* Globe Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="ts-btn ts-btn-secondary ts-btn-sm"
            style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            title={autoRotate ? 'Pause Rotation' : 'Resume Auto-Rotate'}
          >
            {autoRotate ? <Pause size={14} /> : <Play size={14} />}
            <span>{autoRotate ? 'Pause Spin' : 'Auto Rotate'}</span>
          </button>

          <button
            onClick={() => handleSelectPartner(PARTNER_LOCATIONS[0])}
            className="ts-btn ts-btn-outline ts-btn-sm"
            style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            title="Reset focus to East Africa Hub"
          >
            <RotateCcw size={13} />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Deck: 3D Interactive Canvas Globe (Left) + Partner Directory & Selected Hub Card (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 1fr)',
          gap: '26px',
          alignItems: 'center',
        }}
      >
        {/* Left: 3D Canvas Globe with Interactive Pointer Controls */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            aspectRatio: '1 / 1',
            margin: '0 auto',
            borderRadius: '50%',
            cursor: hoveredPartner ? 'pointer' : 'grab',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* HTML5 Canvas Element */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              display: 'block',
              borderRadius: '50%',
              touchAction: 'none',
            }}
          />

          {/* Drag & Interact Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '3px 12px',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-sm)',
              pointerEvents: 'none',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="ts-live-pulse-dot" style={{ width: '5px', height: '5px' }} />
            Drag Globe • Click Location Pins
          </div>
        </div>

        {/* Right: Partner Deployment Directory & Selected Hub Detail Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Active Partner Focal Card */}
          <div
            style={{
              padding: '22px',
              backgroundColor: 'var(--color-surface-sunken)',
              border: `1px solid ${activePartner.badgeColor}`,
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all var(--transition-fast)',
            }}
          >
            {/* Top Row: Category Pill & Compliance Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activePartner.badgeBg,
                  color: activePartner.badgeColor,
                  border: `1px solid ${activePartner.badgeColor}40`,
                }}
              >
                {activePartner.category.replace('_', ' ')}
              </span>

              <span
                className="ts-badge ts-badge-success"
                style={{ fontSize: '11px', padding: '3px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <CheckCircle2 size={12} />
                {activePartner.complianceRate}
              </span>
            </div>

            {/* Hub Title & Location */}
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '4px' }}>
              {activePartner.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '12px' }}>
              <MapPin size={15} />
              <span>{activePartner.region}, {activePartner.country} ({activePartner.flag})</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              {activePartner.summary}
            </p>

            {/* 3 Metric Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                padding: '12px',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
                marginBottom: '16px',
                fontSize: '11px',
              }}
            >
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Field Nodes</span>
                <strong style={{ fontSize: '13px', color: 'var(--color-text)' }}>
                  {activePartner.sitesCount} {activePartner.sitesCount === 1 ? 'Site' : 'Points'}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Detection Method</span>
                <strong style={{ fontSize: '12px', color: 'var(--color-text)' }}>47mm Filter</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Key Partner</span>
                <strong
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text)',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activePartner.partnerOrg.split(',')[0]}
                </strong>
              </div>
            </div>

            {/* Action Links */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Validation: <strong>{activePartner.standard}</strong>
              </span>

              <Link
                to="/our-work"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                }}
              >
                Case Study Dossier <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          {/* Quick Hub Selector Strip */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
              Select Deployment Region:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {PARTNER_LOCATIONS.map((p) => {
                const isSelected = activePartner.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPartner(p)}
                    style={{
                      padding: '6px 11px',
                      fontSize: '12px',
                      fontWeight: isSelected ? 800 : 600,
                      borderRadius: '6px',
                      border: `1px solid ${isSelected ? p.badgeColor : 'var(--color-border)'}`,
                      backgroundColor: isSelected ? p.badgeBg : 'var(--color-surface)',
                      color: isSelected ? p.badgeColor : 'var(--color-text)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <span>{p.flag}</span>
                    <span>{p.country}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
