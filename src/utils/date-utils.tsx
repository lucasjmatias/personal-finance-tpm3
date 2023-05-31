export const formatDateMonthYear = (dateValue: Date) =>
  dateValue.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
  });

export const compareDatesProperty =
  (propName: any) => (a: string, b: string) => {
    const aTime = a[propName] ? new Date(a[propName]).getTime() : 0;
    const bTime = a[propName] ? new Date(b[propName]).getTime() : 0;
    return aTime - bTime;
  };

export const yearMonthISO = (year: number, month: number) => {
  return `${year}-${month.toString().padStart(2, '0')}`;
};
