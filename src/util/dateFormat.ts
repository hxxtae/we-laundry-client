export const dateToString = (date?: string | Date) => {
  if (date) {
    const dateThis = new Date(date);
    return dateThis.getFullYear() + '-' + (dateThis.getMonth() + 1).toString().padStart(2, '0') + '-' + dateThis.getDate().toString().padStart(2, '0');
  }
  const dateObj = new Date();
  return dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1).toString().padStart(2, '0') + '-' + dateObj.getDate().toString().padStart(2, '0');
}
