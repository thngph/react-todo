export const dateFormmater = (date: string | Date) => {
  const d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()} ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};

export default dateFormmater;
