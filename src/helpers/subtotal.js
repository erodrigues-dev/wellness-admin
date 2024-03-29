import { currency } from './intl';
import { number } from './sanitize';

export function subtotalCalc(
  price,
  discountType,
  discountValue,
  quantity,
  tip
) {
  let subtotal;

  if (price === undefined) {
    subtotal = 0;
  } else if (discountType === undefined) {
    subtotal = price * quantity;
  } else if (discountType === 'amount') {
    subtotal = (price - discountValue) * quantity;
  } else if (discountType === 'percent') {
    subtotal = (price - (discountValue / 100) * price) * quantity;
  }

  if (tip || tip !== undefined) {
    subtotal += number(tip);
  }

  return currency.format(subtotal);
}

export function handleDiscount(type, value) {
  let discount = `$0.00`;

  if (type === 'percent') {
    discount = `${value}%`;
  } else if (type === 'amount') {
    discount = `${currency.format(value)}`;
  }

  return discount;
}
