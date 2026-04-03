/**
 * Mobile Schedule with Swipeable Day Tabs
 * Provides day-by-day schedule view for mobile devices with touch/swipe navigation
 */

class MobileSchedule {
  constructor() {
    this.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    this.dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.scheduleData = {};
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    // Initialize schedule data first, then get day to highlight
    this.initializeScheduleData();
    this.currentDayIndex = this.getDayToHighlightIndex();

    // Initialize only on mobile
    if (window.innerWidth <= 768) {
      this.init();
    }
  }
  
  /**
   * Initialize empty schedule data structure
   */
  initializeScheduleData() {
    this.days.forEach(day => {
      this.scheduleData[day] = [];
    });
  }

  /**
   * Get current date/time in IST
   */
  getCurrentDateIST() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    
    const parts = formatter.formatToParts(new Date());
    const date = {};
    parts.forEach(part => {
      if (part.type !== 'literal') {
        date[part.type] = parseInt(part.value, 10);
      }
    });
    
    return {
      dayName: parts.find(p => p.type === 'weekday').value.toLowerCase(),
      hour: date.hour,
      minute: date.minute,
      time: date.hour + date.minute / 60
    };
  }

  /**
   * Parse time string to get end time in decimal hours
   */
  parseEndTime(timeStr) {
    if (!timeStr) return null;
    const match = timeStr.match(/-\s*(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;
    
    let hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    
    if (period === 'PM' && hour !== 12) hour += 12;
    else if (period === 'AM' && hour === 12) hour = 0;
    
    return hour + minute / 60;
  }

  /**
   * Get the last class end time for a specific day
   */
  getLastClassEndTime(dayName) {
    const dayBatches = this.scheduleData[dayName] || [];
    let lastEndTime = 0;
    
    dayBatches.forEach(batch => {
      const endTime = this.parseEndTime(batch.time);
      if (endTime !== null && endTime > lastEndTime) {
        lastEndTime = endTime;
      }
    });
    
    return lastEndTime;
  }

  /**
   * Find the next day that has classes
   */
  getNextDayWithClasses(currentDayIndex) {
    for (let i = 1; i <= 7; i++) {
      const nextIndex = (currentDayIndex + i) % 7;
      const nextDay = this.days[nextIndex];
      const lastClassTime = this.getLastClassEndTime(nextDay);
      if (lastClassTime > 0) {
        return nextIndex;
      }
    }
    return currentDayIndex;
  }

  /**
   * Determine which day to highlight based on current time
   */
  getDayToHighlightIndex() {
    // First get today's index
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long'
    });
    const today = formatter.format(new Date()).toLowerCase();
    const todayIndex = this.days.indexOf(today);
    
    // Parse schedule first so we can check class times
    this.parseScheduleFromTable();
    
    const current = this.getCurrentDateIST();
    const lastClassEndTime = this.getLastClassEndTime(today);
    
    // If no classes today or all classes have ended, show next day
    if (lastClassEndTime === 0 || current.time >= lastClassEndTime) {
      return this.getNextDayWithClasses(todayIndex);
    }
    
    return todayIndex;
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
  }

  /**
   * Parse schedule data from the HTML table
   */
  parseScheduleFromTable() {
    const table = document.querySelector('.schedule-table');
    if (!table) return;

    // Reset schedule data structure
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
          const time = cell.textContent.trim();

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

    tabsContainer.innerHTML = '';

    this.days.forEach((day, index) => {
      const button = document.createElement('button');
      button.className = 'day-tab';
      button.setAttribute('data-day', day);
      button.textContent = this.dayLabels[index];

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

        batchCard.innerHTML = `
          <div class="batch-badges">
            ${badgesHTML}
          </div>
          <div class="batch-name">${batch.batch}</div>
          <div class="batch-time">${batch.time}</div>
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
   * Highlight today's tab and scroll it into view
   */
  highlightTodayTab() {
    const tabs = document.querySelectorAll('.day-tab');
    tabs.forEach((tab, index) => {
      if (index === this.currentDayIndex) {
        tab.classList.add('today');
        // Scroll the highlighted tab into view
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
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
   * Update active tab styling and scroll into view
   */
  updateActiveTab() {
    const tabs = document.querySelectorAll('.day-tab');
    tabs.forEach((tab, index) => {
      const isActive = index === this.currentDayIndex;
      tab.classList.toggle('active', isActive);
      // Scroll active tab into view
      if (isActive) {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }
}

// Initialize mobile schedule when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileSchedule();
});
