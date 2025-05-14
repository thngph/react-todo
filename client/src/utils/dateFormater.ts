const addZero = (num: number) => {
  return `0${num}`.slice(-2);
};

export const dateFormater = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const [h, m, d, month] = [date.getHours(), date.getMinutes(), date.getDate(), date.getMonth() + 1].map(addZero);

  return `${h}:${m} ${d}-${month}-${date.getFullYear()}`;
};

export default dateFormater;
