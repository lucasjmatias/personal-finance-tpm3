const formatDateMonthYear = dateValue =>
  dateValue.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
  });

const compareDatesProperty = propName => (a, b) => {
  const aTime = a[propName] ? new Date(a[propName]).getTime() : 0;
  const bTime = a[propName] ? new Date(b[propName]).getTime() : 0;
  return aTime - bTime;
};

export { formatDateMonthYear, compareDatesProperty };
