const useFormatter = () => {
  const currencyFormatter = (number, decimal, type = 'USD') => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: type,
      maximumSignificantDigits: decimal,
    }).format(number);
    return formatted;
  };
  const percentageFormatter = (number) => {
    const formattedPercent = parseFloat(number).toFixed(2) + '%';
    return formattedPercent;
  };
  const numberFormatter = (number, digit = 12) => {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: digit,
    }).format(number);
    return formatted;
  };

  return {
    currencyFormatter,
    percentageFormatter,
    numberFormatter,
  };
};

export default useFormatter;
