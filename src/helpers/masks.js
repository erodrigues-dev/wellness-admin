import { decimal } from './intl';

const masks = {
  price(e) {
    let value = e.target.value.replace(/[^0-9]/g, '').replace(/^0*/, '');
    if (value) {
      if (value.length < 3) {
        value = value.padStart(3, '0');
      }
      const chars = value.split('');
      chars.splice(-2, 0, '.');
      value = chars.join('');
      value = decimal.format(value);
    }

    return value;
  },

  duration(e) {
    const value = e.target.value.replace(/\D/g, '');

    return value;
  },

  capitalize(value) {
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return value;
  },

  onlyNumbers(e) {
    const { value } = e.target;
    e.target.value = value.replace(/[^0-9]/g, '');
    return e;
  },
};

export default masks;
