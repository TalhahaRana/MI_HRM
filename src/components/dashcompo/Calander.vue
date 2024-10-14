<template>
  <div class="calendar">
    <div class="calendar__header">
      <button @click="prevMonth">«</button>
      <span>{{ monthNames[selectedMonth] }} {{ selectedYear }}</span>
      <button @click="nextMonth">»</button>
    </div>

    <div class="calendar__days">
      <div v-for="day in days" :key="day">{{ day }}</div>
    </div>

    <div class="calendar__dates">
      <div
        v-for="date in datesInMonth"
        :key="date.fullDate"
        :class="getDateClass(date)"
        @click="selectDate(date)"
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
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ],
    };
  },
  computed: {
    datesInMonth() {
      const dates = [];
      const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
      const totalDaysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

      // Get dates from the previous month to fill the calendar grid
      const daysInPrevMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        dates.push({
          day: daysInPrevMonth - i,
          fullDate: new Date(this.selectedYear, this.selectedMonth - 1, daysInPrevMonth - i),
          isCurrentMonth: false,
        });
      }

      // Get dates for the current month
      for (let i = 1; i <= totalDaysInMonth; i++) {
        dates.push({
          day: i,
          fullDate: new Date(this.selectedYear, this.selectedMonth, i),
          isCurrentMonth: true,
        });
      }

      // Fill in the remaining dates from the next month to complete the calendar grid
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
      const isToday =
        date.fullDate.toDateString() === this.currentDate.toDateString();
      const isSelected =
        this.selectedDate &&
        date.fullDate.toDateString() === this.selectedDate.toDateString();

      return {
        "calendar__date": true,
        "calendar__date--today": isToday,
        "calendar__date--selected": isSelected,
        "calendar__date--other-month": !date.isCurrentMonth,
      };
    },
  },
};
</script>

<style scoped>
button{
  border: none;
  width: 37px;
}
.calendar {
  padding: 10px;
    width: auto;
    background: #dae7ff;
    
    /* margin: 31px; */
    border-radius: 24px;
}

.calendar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #dae7ff;
  ;
  border-radius: 10px 10px 0 0;
}

.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #eee;
  /* padding: 6px 0px 6px 48px; */
}

.calendar__dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px 0;
}

.calendar__date {
  text-align: center;
  padding: 2px 0;
  /* margin: 5px; */
  cursor: pointer;
}

.calendar__date--other-month {
  color: #aaa;
}

.calendar__date--today {
  font-weight: bold;
  background-color: #ffe4e1;
  /* background-color: #f3f4f6; */
  padding: 1px 13px;
  border-radius: 13%;
  color: #ff0e38;

}

.calendar__date--selected {
  font-weight: bold;
  background-color: #b7e3ff;
    border-radius: 13%;
    color: #0000ff;
}
</style>
