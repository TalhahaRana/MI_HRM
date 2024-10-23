<template>
  <div class="calendar">
    <div class="calendar__header">
      <button @click="prevMonth" class="calendar__nav-btn">«</button>
      <span class="calendar__month-year">{{ monthNames[selectedMonth] }} {{ selectedYear }}</span>
      <button @click="nextMonth" class="calendar__nav-btn">»</button>
    </div>

    <div class="calendar__days">
      <div v-for="day in days" :key="day" class="calendar__day">{{ day }}</div>
    </div>

    <div class="calendar__dates">
      <div
        v-for="date in datesInMonth"
        :key="date.fullDate"
        :class="getDateClass(date)"
        @click="selectDate(date)"
        class="calendar__date"
      >
        {{ date.day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: null,
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December",
      ],
    };
  },
  computed: {
    datesInMonth() {
      const dates = [];
      const firstDayOfMonth = new Date(
        this.selectedYear, this.selectedMonth, 1
      ).getDay();
      const totalDaysInMonth = new Date(
        this.selectedYear, this.selectedMonth + 1, 0
      ).getDate();

      const daysInPrevMonth = new Date(
        this.selectedYear, this.selectedMonth, 0
      ).getDate();
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        dates.push({
          day: daysInPrevMonth - i,
          fullDate: new Date(this.selectedYear, this.selectedMonth - 1, daysInPrevMonth - i),
          isCurrentMonth: false,
        });
      }

      for (let i = 1; i <= totalDaysInMonth; i++) {
        dates.push({
          day: i,
          fullDate: new Date(this.selectedYear, this.selectedMonth, i),
          isCurrentMonth: true,
        });
      }

      const remainingDates = 42 - dates.length;
      for (let i = 1; i <= remainingDates; i++) {
        dates.push({
          day: i,
          fullDate: new Date(this.selectedYear, this.selectedMonth + 1, i),
          isCurrentMonth: false,
        });
      }

      return dates;
    },
  },
  methods: {
    prevMonth() {
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11;
        this.selectedYear--;
      } else {
        this.selectedMonth--;
      }
    },
    nextMonth() {
      if (this.selectedMonth === 11) {
        this.selectedMonth = 0;
        this.selectedYear++;
      } else {
        this.selectedMonth++;
      }
    },
    selectDate(date) {
      this.selectedDate = date.fullDate;
      console.log("Selected Date:", this.selectedDate);
    },
    getDateClass(date) {
      const isToday = date.fullDate.toDateString() === this.currentDate.toDateString();
      const isSelected = this.selectedDate && date.fullDate.toDateString() === this.selectedDate.toDateString();

      return {
        "calendar__date--today": isToday,
        "calendar__date--selected": isSelected,
        "calendar__date--other-month": !date.isCurrentMonth,
      };
    },
  },
};
</script>

<style scoped>
/* Main Calendar Styles */
.calendar {
  padding: 20px;
  background: linear-gradient(135deg, #cfe2ff, #dae7ff);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 350px;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;
}

.calendar:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

/* Calendar Header */
.calendar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.calendar__nav-btn {
  background: #4d91ff;
  border: none;
  color: white;
  font-size: 19px;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.calendar__nav-btn:hover {
  background: #0056b3;
}

.calendar__month-year {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* Days of the Week */
.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #666;
  margin-bottom: 10px;
}

.calendar__day {
  font-weight: bold;
  padding: 5px 0;
}

/* Dates */
/* Dates */
.calendar__dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px; /* Gap ko kam kar diya */
}

.calendar__date {
  background-color: #f9f9f9;
  border-radius: 8px; /* Border radius ko thoda kam kar diya */
  padding: 5px; /* Padding ko kam kar diya taake box chhota ho jaye */
  text-align: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #333;
}

.calendar__date:hover {
  background-color: #cfe2ff;
  transform: scale(1.05);
}

/* Styles for Special Dates */
.calendar__date--today {
  background-color: #ffe4e1;
  color: #ff0e38;
  font-weight: bold;
}

.calendar__date--selected {
  background-color: #b7e3ff;
  color: #0000ff;
  border: 2px solid #007bff;
  transform: scale(1.1);
}

.calendar__date--other-month {
  color: #aaa;
  background-color: #f3f3f3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .calendar {
    width: 100%;
    height: auto;
    padding: 15px;
  }
}
</style>
