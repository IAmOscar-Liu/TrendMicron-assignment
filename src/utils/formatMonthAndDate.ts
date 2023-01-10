export const formatMonthAndDate = (value: number) => {
  if (value >= 10) return value + "";
  return "0" + value;
};
