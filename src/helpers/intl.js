const locale = 'en';

export const currency = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: 'USD',
});

export const decimal = new Intl.NumberFormat(locale, {
  minimumFractionDigits: 2,
});
