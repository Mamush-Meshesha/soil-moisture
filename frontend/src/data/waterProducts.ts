import { Product } from '../types';

export const WATER_PRODUCTS: Product[] = [
  {
    id: 'prod-waterscope-basic',
    slug: 'waterscope-portable-kit-basic',
    name: 'WaterScope Portable Kit – Basic',
    category: 'Testing Kits',
    price: 149.0,
    description:
      'WaterScope is a rapid, simple, digital, bacterial testing kit for drinking water allowing anyone to conduct a test in any location.',
    specs: {
      standard: 'ISO 9308-1 Membrane Filtration',
      target: 'Total Coliforms & E. coli directly (CFU/100mL)',
      speed: 'Relative risk level after 8 hours; fully quantitative after 24 hours',
      cartridges: '5 E. coli sample cartridges included',
      technology: 'Patented easy-to-use metal cartridge (no aseptic training needed)',
      analysis: 'High-resolution digital microscope with automated ML colony counting',
      connectivity: 'Android App + Web mapping and intervention dashboard',
      weight: '8 kg with all consumables (<6 kg portable kit)',
      carriage: 'Complies with IATA carriage rules',
      power: 'Rechargeable Li-ion battery buffer + USB-C fast charge / 12V DC input',
      origin: 'Designed by Cambridge Engineers / Manufactured at Bahir Dar, Ethiopia',
    },
    image_url: '/images/waterscope-kit-3-1.png',
    image: '/images/waterscope-kit-3-1.png',
    inStock: true,
    stock_qty: 50,
  },
];
