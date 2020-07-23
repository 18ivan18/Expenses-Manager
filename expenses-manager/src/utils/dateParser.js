const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const parseDate = (date) => {
  let year = date.slice(0, 4);
  let month = monthNames[parseInt(date.slice(5, 7)) - 1];
  let day = date.slice(8, 10);
  const result = month + " " + day + ", " + year;
  return result;
};

export const parseDate1 = (date) => {
  let year = date.slice(11, 15);
  let month = date.slice(4, 7);
  let day = date.slice(8, 10);
  const result = month + " " + day + ", " + year;
  return result;
};
