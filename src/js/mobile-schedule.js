/**
 * Mobile Schedule with Swipeable Day Tabs
 * Provides day-by-day schedule view for mobile devices with touch/swipe navigation
 */

class MobileSchedule {
  constructor() {
    this.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    this.dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.currentDayIndex = this.getTodayIndex();
    this.scheduleData = {};
    this.touchStartX = 0;
    this.touchEndX = 0;

    // Initialize only on mobile
    if (window.innerWidth <= 768) {
      this.init();
    }
  }

  /**
   * Get today's day index in IST timezone
   */
  getTodayIndex() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long'
    });
    const today = formatter.format(new Date()).toLowerCase();
    const index = this.days.indexOf(today);
    return index >= 0 ? index : 0; // Default to Monday if not found
  }

  /**
   * Initialize the mobile schedule interface
   */
  init() {
    // Parse schedule data from the existing table
    this.parseScheduleFromTable();

    // Render the tabs
    this.renderTabs();

    // Render the initial day schedule
    this.renderDaySchedule(this.currentDayIndex);

    // Setup touch/swipe events
    this.setupTouchEvents();

    // Highlight today's tab
    this.highlightTodayTab();

    // Update meditation dates
    this.updateMeditationDates();
  }

  /**
   * Parse schedule data from the HTML table
   */
  parseScheduleFromTable() {
    const table = document.querySelector('.schedule-table');
    if (!table) return;

    // Initialize schedule data structure
    this.days.forEach(day => {
      this.scheduleData[day] = [];
    });

    // Get all rows (skip header row)
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const batchNameCell = row.querySelector('.batch-name');
      if (!batchNameCell) return;

      // Extract only the batch name text, excluding the badge span
      const batchName = Array.from(batchNameCell.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent.trim())
        .filter(text => text.length > 0)
        .join(' ')
        .trim();

      const isSpecialProgram = row.classList.contains('special-program-row');

      // Get all time cells (skip first column which is batch name)
      const timeCells = row.querySelectorAll('td:not(.batch-name)');

      timeCells.forEach((cell, index) => {
        if (index >= this.days.length) return;

        const day = this.days[index];
        const isActive = cell.classList.contains('active');

        if (isActive) {
          let time;

          // Special handling for meditation-dates cells
          if (cell.classList.contains('meditation-dates')) {
            // Extract only the direct text nodes, excluding <small> content
            time = Array.from(cell.childNodes)
              .filter(node => node.nodeType === Node.TEXT_NODE)
              .map(node => node.textContent.trim())
              .filter(text => text.length > 0)
              .join(' ') // Join multiple text nodes with space
              .trim();

            // Fallback: if no text nodes found, try split on newline
            if (!time) {
              const timeText = cell.textContent.trim();
              time = timeText.split('\n')[0].trim();
            }
          } else {
            // Regular cells: just get the text content directly
            time = cell.textContent.trim();
          }

          this.scheduleData[day].push({
            batch: batchName,
            time: time,
            isSpecial: isSpecialProgram
          });
        }
      });
    });
  }

  /**
   * Render day navigation tabs
   */
  renderTabs() {
    const tabsContainer = document.querySelector('.day-tabs');
    if (!tabsContainer) return;

    // Clear existing tabs
    tabsContainer.innerHTML = '';

    // Create tab for each day
    this.days.forEach((day, index) => {
      const button = document.createElement('button');
      button.className = 'day-tab';
      button.setAttribute('data-day', day);
      button.textContent = this.dayLabels[index];

      // Mark active day
      if (index === this.currentDayIndex) {
        button.classList.add('active');
      }

      // Click handler
      button.addEventListener('click', () => {
        this.goToDay(index);
      });

      tabsContainer.appendChild(button);
    });
  }

  /**
   * Calculate next Weekend Meditation date (2nd or 4th Sunday)
   */
  getNextMeditationDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Find the first Sunday
    let firstSunday = 1;
    while (new Date(year, month, firstSunday).getDay() !== 0) {
      firstSunday++;
    }

    // Calculate 2nd and 4th Sunday
    const secondSunday = firstSunday + 7;
    const fourthSunday = firstSunday + 21;

    const date2nd = new Date(year, month, secondSunday);
    const date4th = new Date(year, month, fourthSunday);
    const nextMonth = new Date(year, month + 1, 1);

    // Check if 4th Sunday exists in current month
    const isFourthSundayValid = date4th < nextMonth;

    // Format month name
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = monthNames[month];

    // Determine which is the next upcoming date
    if (today <= date2nd) {
      return `${secondSunday} ${currentMonth}`;
    } else if (isFourthSundayValid && today <= date4th) {
      return `${fourthSunday} ${currentMonth}`;
    } else {
      // Both dates passed, get next month's 2nd Sunday
      const nextMonthDate = new Date(year, month + 1, 1);
      let nextFirstSunday = 1;
      while (new Date(year, month + 1, nextFirstSunday).getDay() !== 0) {
        nextFirstSunday++;
      }
      const nextSecondSunday = nextFirstSunday + 7;
      const nextMonthName = monthNames[month + 1] || monthNames[0]; // Handle December -> January
      return `${nextSecondSunday} ${nextMonthName}`;
    }
  }

  /**
   * Check if batch is available online
   */
  isOnlineBatch(batchName) {
    // Use global scheduleConfig if available, otherwise fallback to hardcoded list
    if (window.scheduleConfig && window.scheduleConfig.batches) {
      const batch = window.scheduleConfig.batches.find(b => b.name === batchName);
      return batch ? batch.onlineAvailable : false;
    }

    // Fallback for special programs
    if (window.scheduleConfig && window.scheduleConfig.specialPrograms) {
      const program = window.scheduleConfig.specialPrograms.find(p => p.name === batchName);
      if (program) return program.onlineAvailable;
    }

    return false;
  }

  /**
   * Render schedule for a specific day
   */
  renderDaySchedule(dayIndex, direction = 'next') {
    const contentContainer = document.querySelector('.day-schedule-content');
    if (!contentContainer) return;

    const day = this.days[dayIndex];
    const batches = this.scheduleData[day] || [];

    // Add slide animation
    contentContainer.classList.remove('slide-left', 'slide-right');
    void contentContainer.offsetWidth; // Force reflow
    contentContainer.classList.add(direction === 'next' ? 'slide-right' : 'slide-left');

    // Clear current content
    contentContainer.innerHTML = '';

    if (batches.length === 0) {
      // Show empty state
      const emptyState = document.createElement('div');
      emptyState.className = 'no-classes';
      emptyState.innerHTML = '<p>No classes scheduled for this day</p>';
      contentContainer.appendChild(emptyState);
    } else {
      // Render batch cards
      batches.forEach(batch => {
        const batchCard = document.createElement('div');
        batchCard.className = 'batch-item';
        if (batch.isSpecial) {
          batchCard.classList.add('special-batch');
        }

        // Determine online availability and badge
        const isOnlineAvailable = this.isOnlineBatch(batch.batch);

        // Build badge HTML - show both tags when both are available
        let badgesHTML = '';
        if (isOnlineAvailable) {
          badgesHTML = `
            <span class="batch-availability-badge online-available">Online Available</span>
            <span class="batch-availability-badge in-studio">In-Studio</span>
          `;
        } else {
          badgesHTML = `<span class="batch-availability-badge in-studio">In-Studio</span>`;
        }

        // For Weekend Meditation on Sunday, show next class date
        let timeDisplay = batch.time;
        if (batch.batch === 'Weekend Meditation' && day === 'sunday') {
          const nextDate = this.getNextMeditationDate();
          timeDisplay = `${batch.time} on ${nextDate}`;
        }

        batchCard.innerHTML = `
          <div class="batch-badges">
            ${badgesHTML}
          </div>
          <div class="batch-name">${batch.batch}</div>
          <div class="batch-time">${timeDisplay}</div>
        `;

        contentContainer.appendChild(batchCard);
      });
    }
  }

  /**
   * Setup touch and swipe event handlers
   */
  setupTouchEvents() {
    const container = document.querySelector('.day-schedule-container');
    if (!container) return;

    const swipeThreshold = 50; // Minimum swipe distance in pixels

    container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  /**
   * Handle swipe gesture
   */
  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > 50) { // Minimum swipe threshold
      if (diff > 0) {
        // Swiped left - go to next day
        this.nextDay();
      } else {
        // Swiped right - go to previous day
        this.prevDay();
      }
    }
  }

  /**
   * Highlight today's tab
   */
  highlightTodayTab() {
    const todayIndex = this.getTodayIndex();
    const tabs = document.querySelectorAll('.day-tab');
    tabs.forEach((tab, index) => {
      if (index === todayIndex) {
        tab.classList.add('today');
      }
    });
  }

  /**
   * Update meditation dates (2nd & 4th Sunday)
   */
  updateMeditationDates() {
    const datesElement = document.getElementById('mobile-meditation-dates');
    if (datesElement && typeof calculate2ndAnd4thSunday === 'function') {
      datesElement.textContent = calculate2ndAnd4thSunday();
    }
  }

  /**
   * Navigate to previous day
   */
  prevDay() {
    if (this.currentDayIndex > 0) {
      this.currentDayIndex--;
      this.renderDaySchedule(this.currentDayIndex, 'prev');
      this.updateActiveTab();
    }
  }

  /**
   * Navigate to next day
   */
  nextDay() {
    if (this.currentDayIndex < this.days.length - 1) {
      this.currentDayIndex++;
      this.renderDaySchedule(this.currentDayIndex, 'next');
      this.updateActiveTab();
    }
  }

  /**
   * Navigate to specific day
   */
  goToDay(dayIndex) {
    const direction = dayIndex > this.currentDayIndex ? 'next' : 'prev';
    this.currentDayIndex = dayIndex;
    this.renderDaySchedule(this.currentDayIndex, direction);
    this.updateActiveTab();
  }

  /**
   * Update active tab styling
   */
  updateActiveTab() {
    const tabs = document.querySelectorAll('.day-tab');
    tabs.forEach((tab, index) => {
      if (index === this.currentDayIndex) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    new MobileSchedule();
  }
});
