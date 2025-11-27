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

/**
 * Get current day of week in IST timezone
 * Returns day name in lowercase (e.g., "monday", "tuesday")
 */
function getCurrentDayIST() {
  // Create formatter for IST timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long'
  });

  const today = new Date();
  const dayName = formatter.format(today).toLowerCase();

  return dayName;
}

/**
 * Highlight the current day's column in the schedule
 */
function highlightTodayColumn() {
  const currentDay = getCurrentDayIST();

  // Highlight table columns (headers and cells)
  const elementsWithDay = document.querySelectorAll(`[data-day="${currentDay}"]`);
  elementsWithDay.forEach(element => {
    element.classList.add('today');
  });

  // Highlight mobile cards that operate on current day
  const mobileCards = document.querySelectorAll('.schedule-mobile-card');
  mobileCards.forEach(card => {
    const days = card.getAttribute('data-days');
    if (days && days.split(',').includes(currentDay)) {
      card.classList.add('today');
    }
  });
}

// Update the meditation dates and highlight today's column on page load
document.addEventListener('DOMContentLoaded', () => {
  const meditationDatesElement = document.getElementById('meditation-dates');

  if (meditationDatesElement) {
    const dates = calculate2ndAnd4thSunday();
    meditationDatesElement.textContent = dates;
  }

  // Highlight today's column
  highlightTodayColumn();
});
