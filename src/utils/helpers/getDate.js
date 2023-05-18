export const getDate = (date, isAddMonth) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + isAddMonth ? 2 : 1;
  const day = d.getDate();
  return `${day}/${month}/${year}`;
};
