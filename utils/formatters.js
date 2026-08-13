/**
 * Utility functions for date, currency, and text formatting across Rovea.
 */

/**
 * Format a number as currency string.
 * @param {number} amount
 * @param {string} currencyCode - e.g. 'USD', 'JPY', 'EUR', 'IDR'
 * @returns {string}
 */
export const formatCurrency = (amount, currencyCode = 'USD') => {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';

  try {
    switch (currencyCode.toUpperCase()) {
      case 'JPY':
        return `¥${Math.round(amount).toLocaleString()}`;
      case 'EUR':
        return `€${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
      case 'IDR':
        return `Rp ${Math.round(amount).toLocaleString()}`;
      case 'USD':
      default:
        return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }
  } catch (err) {
    return `$${amount}`;
  }
};

/**
 * Format date range into a readable string (e.g., "Oct 12 – Oct 18, 2026").
 * @param {string} startDate
 * @param {string} endDate
 * @param {string|number} year
 * @returns {string}
 */
export const formatDateRange = (startDate, endDate, year) => {
  if (!startDate) return '';
  if (!endDate) return `${startDate}${year ? `, ${year}` : ''}`;
  return `${startDate} – ${endDate}${year ? `, ${year}` : ''}`;
};

/**
 * Truncate a string to a specified max length with an ellipsis.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 60) => {
  if (!text || text.length <= maxLength) return text || '';
  return `${text.slice(0, maxLength).trim()}...`;
};

/**
 * Capitalize the first letter of each word in a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
