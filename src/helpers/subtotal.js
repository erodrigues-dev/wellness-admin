import { currency } from './intl';

export default function subtotal(price, discount, quantity) {
  // ALGO ERRADO, CORRIGIR DEPOIS
  let finalValue;

  if (price === undefined) {
    finalValue = 0;
  } else if (discount === null) {
    finalValue = price * quantity;
  } else if (discount === 'amount') {
    finalValue = (price - discount) * quantity;
  } else if (discount === 'percent') {
    finalValue = (price - (discount / 100) * price) * quantity;
  }

  return currency.format(finalValue);
}
