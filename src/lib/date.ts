export const toStringDateHHMM = (date: Date) => {
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return `${hours}:${minutes}`;
};
