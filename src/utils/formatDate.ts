export function formatDate(date: Date) {
  // Get the day, month, and year from the date
  let day: number | string = date.getDate();
  let month: number | string = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  // Add leading zeros to day and month if needed
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  // Return the formatted date
  return month + "/" + day + "/" + year;
}
