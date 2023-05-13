export const toDateHHMMSS = (date: string) => {
  const tempTime = date.split(':');
  const dt = new Date();

  dt.setHours(Number(tempTime[0]));
  dt.setMinutes(Number(tempTime[1]));
  dt.setSeconds(Number(tempTime[2]));

  return dt;
};

export const toStringDateHHMM = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
};
