export const formatMoney = (amountInCents) => {
  return `$${(amountInCents / 100).toFixed(2)}`;
};
