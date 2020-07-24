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
  const year = date.slice(0, 4);
  const month = monthNames[parseInt(date.slice(5, 7)) - 1];
  const day = date.slice(8, 10);
  const result = month + " " + day + ", " + year;
  return result;
};

export const parseDate1 = (date) => {
  const year = date.slice(11, 15);
  const month = date.slice(4, 7);
  const day = date.slice(8, 10);
  const result = month + " " + day + ", " + year;
  return result;
};

export const daysLeft = (date1, date2) => {
  if(!date1 || ! date2) {
    return 0;
  }
  const year1 = date1.slice(11, 15);
  const month1 = monthNames.indexOf(date1.slice(4, 7)) + 1;
  const day1 = date1.slice(8, 10);
  const year2 = date2.slice(0, 4);
  const month2 = parseInt(date2.slice(5, 7));
  const day2 = date2.slice(8, 10);
  return (year2 - year1) * 365 + (month2 - month1) * 30 + (day2 - day1);
};
