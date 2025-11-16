/**
 * Calculate 2nd and 4th Sunday of current month for Weekend Meditation
 */

function calculate2ndAnd4thSunday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Get first day of the month
  const firstDay = new Date(year, month, 1);

  // Find the first Sunday
  let firstSunday = 1;
  while (new Date(year, month, firstSunday).getDay() !== 0) {
    firstSunday++;
  }

  // Calculate 2nd and 4th Sunday
  const secondSunday = firstSunday + 7;
  const fourthSunday = firstSunday + 21;

  // Format dates
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = monthNames[month];

  // Create date objects
  const date2nd = new Date(year, month, secondSunday);
  const date4th = new Date(year, month, fourthSunday);

  // Check if 4th Sunday exists in current month
  const nextMonth = new Date(year, month + 1, 1);
  const isFourthSundayValid = date4th < nextMonth;

  if (isFourthSundayValid) {
    return `${secondSunday} ${currentMonth} & ${fourthSunday} ${currentMonth}`;
  } else {
    return `${secondSunday} ${currentMonth} only`;
  }
}

// Update the meditation dates on page load
document.addEventListener('DOMContentLoaded', () => {
  const meditationDatesElement = document.getElementById('meditation-dates');

  if (meditationDatesElement) {
    const dates = calculate2ndAnd4thSunday();
    meditationDatesElement.textContent = dates;
  }
});
