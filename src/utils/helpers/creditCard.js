export const formatCardNumber = value => {
  let formattedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = formattedValue.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    formattedValue = parts.join(' ');
  }
  //   setCardNumber(formattedValue);
  return formattedValue;
};

export const formatExpiryDate = value => {
  let formattedValue = value.replace(/\s/g, '');
  if (formattedValue.length > 2 && !formattedValue.includes('/')) {
    formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
  }
  //   setExpiryDate(formattedValue);
  return formattedValue;
};

export const validateExpiryDate = expiryDate => {
  const [expiryMonth, expiryYear] = expiryDate.split('/').map(Number);
  const currentYear = new Date().getFullYear() - 2000;
  const currentMonth = new Date().getMonth() + 1; // add 1 to get 1-indexed month

  // console.log(currentYear, currentMonth);

  if (expiryMonth < 1 || expiryMonth > 12) {
    return 'Invalid date';
  }

  if (
    expiryYear < currentYear ||
    (expiryYear === currentYear && expiryMonth < currentMonth)
  ) {
    return 'Card is expired';
  }
};
