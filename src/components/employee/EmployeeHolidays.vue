<template>
  <div>
    <div
      class="card custom-card ms-2 text-white"
      style="width: 493px; height: 140px; border-radius: 10px; margin-top: "
    >
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title">Upcoming Holidays</h5>
          <div class="holiday-info d-flex align-items-center">
            <i class="bi bi-calendar3 calendar-icon"></i>
            <div class="ml-2">
              <!-- Dynamically show holiday name and date -->
              <p class="mb-1 holiday-name">
                {{ holidayName || "No holiday available" }}
              </p>
              <p class="mb-0 holiday-date">
                {{ holidayDate || "Date unavailable" }}
              </p>
            </div>
          </div>
        </div>
        <button class="btn btn-outline-light">View All</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const holidayName = ref("");
    const holidayDate = ref("");

    const getHolidayData = async () => {
      try {
        const response = await axios.get(
          "https://calendarific.com/api/v2/holidays",
          {
            params: {
              api_key: "GbwTaQDNPpuPdv8wYvqEpEYfwRJOV5Uo", // Your API key
              country: "PK", // Country code for Pakistan
              year: 2024, // Year can be dynamic or fixed
            },
          }
        );

        const holidays = response.data.response.holidays;

        // Get today's date
        const today = new Date().toISOString().split("T")[0];

        // Filter for upcoming holidays
        const upcomingHolidays = holidays.filter(
          (holiday) => holiday.date.iso > today
        );

        if (upcomingHolidays.length > 0) {
          const nearestHoliday = upcomingHolidays[0]; // Assuming the first one is the nearest
          holidayName.value = nearestHoliday.name;
          holidayDate.value = nearestHoliday.date.iso;
        } else {
          holidayName.value = "No upcoming holidays";
          holidayDate.value = "N/A";
        }
      } catch (error) {
        console.error("Error fetching holiday data:", error.response || error);
        holidayName.value = "Error fetching data";
        holidayDate.value = "N/A";
      }
    };

    // Fetch the holiday data when the component is mounted
    onMounted(() => {
      getHolidayData();
    });

    return {
      holidayName,
      holidayDate,
    };
  },
};
</script>

<style scoped>
.custom-card {
  background: linear-gradient(90deg, #00b4ff 0%, #009bff 100%);
}
.holiday-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.calendar-icon {
  font-size: 24px;
}
.holiday-name {
  font-size: 16px;
  font-weight: 600;
}
.holiday-date {
  font-size: 14px;
}
@media (max-width: 576px) {
  .card-body {
    flex-direction: column;
    text-align: center;
  }
}
</style>
