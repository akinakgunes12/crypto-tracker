const useFormatter = () => {
  const currencyFormatter = (number, decimal) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: decimal,
    }).format(number);
    return formatted;
  };
  const percentageFormatter = (number) => {
    const formattedPercent = parseFloat(number).toFixed(2) + '%';
    return formattedPercent;
  };
  const numberFormatter = (number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 12,
    }).format(number);
    return formatted;
  };
  const numberFourFormatter = (number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 12,
    }).format(number);
    return formatted;
  };

  return {
    currencyFormatter,
    percentageFormatter,
    numberFormatter,
    numberFourFormatter,
  };
};

export default useFormatter;
