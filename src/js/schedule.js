/**
 * Get current date/time in IST timezone
 */
function getCurrentDateIST() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  
  const parts = formatter.formatToParts(new Date());
  const date = {};
  parts.forEach(part => {
    date[part.type] = parseInt(part.value, 10);
  });
  
  return {
    dayName: parts.find(p => p.type === 'weekday').value.toLowerCase(),
    hour: date.hour,
    minute: date.minute,
    date: new Date(date.year, date.month - 1, date.day, date.hour, date.minute)
  };
}

/**
 * Parse time string (e.g., "7:15 - 8:15 AM") to end hour in 24h format
 */
function parseEndTime(timeStr) {
  if (!timeStr) return null;
  
  // Extract end time part (after " - ")
  const match = timeStr.match(/-\s*(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }
  
  return hour + minute / 60;
}

/**
 * Get the schedule data from the page
 * This should match the schedule.json structure
 */
function getScheduleData() {
  return {
    batches: [
      { name: "Morning Batch 1", schedule: { monday: "7:15 - 8:15 AM", tuesday: null, wednesday: "7:15 - 8:15 AM", thursday: "7:15 - 8:15 AM", friday: null, saturday: null, sunday: null } },
      { name: "Morning Batch 2", schedule: { monday: null, tuesday: "8:00 - 9:00 AM", wednesday: null, thursday: "8:15 - 9:15 AM", friday: "8:00 - 9:00 AM", saturday: null, sunday: null } },
      { name: "Afternoon Batch", schedule: { monday: null, tuesday: "12:00 - 1:00 PM", wednesday: null, thursday: "12:00 - 1:00 PM", friday: null, saturday: "12:00 - 1:00 PM", sunday: null } },
      { name: "Evening Batch", schedule: { monday: "6:00 - 7:00 PM", tuesday: "6:00 - 7:00 PM", wednesday: null, thursday: "6:00 - 7:00 PM", friday: null, saturday: null, sunday: null } }
    ],
    specialPrograms: [
      { name: "Kids Yoga", schedule: { saturday: "11:00 AM - 12:00 PM", sunday: "11:00 AM - 12:00 PM" } },
      { name: "Breathwork & Meditation", schedule: { tuesday: "9:15 - 10:00 AM" } }
    ]
  };
}

/**
 * Find the last class end time for a given day
 */
function getLastClassEndTime(dayName) {
  const schedule = getScheduleData();
  const allItems = [...schedule.batches, ...schedule.specialPrograms];
  
  let lastEndTime = 0;
  
  allItems.forEach(item => {
    const timeStr = item.schedule[dayName];
    if (timeStr) {
      const endTime = parseEndTime(timeStr);
      if (endTime !== null && endTime > lastEndTime) {
        lastEndTime = endTime;
      }
    }
  });
  
  return lastEndTime;
}

/**
 * Get the next day that has classes
 */
function getNextDayWithClasses(currentDay) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentIndex = days.indexOf(currentDay);
  
  // Check next 7 days
  for (let i = 1; i <= 7; i++) {
    const nextIndex = (currentIndex + i) % 7;
    const nextDay = days[nextIndex];
    const lastClassTime = getLastClassEndTime(nextDay);
    if (lastClassTime > 0) {
      return nextDay;
    }
  }
  
  return currentDay; // Fallback to current day
}

/**
 * Determine which day to highlight based on current time
 * If last class of current day has passed, highlight next day with classes
 */
function getDayToHighlight() {
  const current = getCurrentDateIST();
  const currentDay = current.dayName;
  const currentTime = current.hour + current.minute / 60;
  
  // Get last class end time for current day
  const lastClassEndTime = getLastClassEndTime(currentDay);
  
  // If no classes today or all classes have ended, highlight next day
  if (lastClassEndTime === 0 || currentTime >= lastClassEndTime) {
    return getNextDayWithClasses(currentDay);
  }
  
  return currentDay;
}

/**
 * Highlight the appropriate day's column in the schedule
 */
function highlightTodayColumn() {
  const dayToHighlight = getDayToHighlight();
  
  // Highlight table columns (headers and cells)
  const elementsWithDay = document.querySelectorAll(`[data-day="${dayToHighlight}"]`);
  elementsWithDay.forEach(element => {
    element.classList.add('today');
  });

  // Highlight mobile cards that operate on that day
  const mobileCards = document.querySelectorAll('.schedule-mobile-card');
  mobileCards.forEach(card => {
    const days = card.getAttribute('data-days');
    if (days && days.split(',').includes(dayToHighlight.substring(0, 3))) {
      card.classList.add('today');
    }
  });

  // Highlight mobile day tabs
  const dayTabs = document.querySelectorAll('.day-tab');
  dayTabs.forEach(tab => {
    const tabDay = tab.getAttribute('data-day');
    if (tabDay === dayToHighlight) {
      tab.classList.add('today');
    }
  });
}

// Highlight the appropriate day's column on page load
document.addEventListener('DOMContentLoaded', () => {
  highlightTodayColumn();
});
