import { Language } from '../i18n/types';

/**
 * Format monetary amount into Ethiopian Birr with localization support.
 * @param amount - The numeric price in Birr
 * @param language - Optional language code ('en' | 'am' | 'om' | 'ti')
 * @returns Localized currency string (e.g., '550.00 Birr' or '550.00 ብር')
 */
export function formatBirr(amount: number, language?: Language | string): string {
  const num = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  switch (language) {
    case 'am':
      return `${formatted} ብር`;
    case 'ti':
      return `${formatted} ቅርሺ`;
    case 'om':
      return `${formatted} Birr`;
    case 'en':
    default:
      return `${formatted} Birr`;
  }
}

// Convenient alias
export const formatPrice = formatBirr;
