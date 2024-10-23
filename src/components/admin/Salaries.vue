<template>
  <div class="salary-container">
    <h2>Employee Salary Viewer</h2>

    <!-- Form Section -->
    <div class="form-section">
      <div class="form-group">
        <label for="employeeSelect">Select Employee:</label>
        <select v-model="selectedEmployee" id="employeeSelect" class="form-control" required>
          <option disabled value="">Select Employee</option>
          <option v-for="employee in employees" :key="employee.id" :value="employee">
            {{ employee.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="monthYearSelect">Select Month-Year:</label>
        <select v-model="selectedMonthYear" id="monthYearSelect" class="form-control" required>
          <option disabled value="">Select Month-Year</option>
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>

      <button @click="checkSalary" class="btn-check-salary" :disabled="!selectedEmployee || !selectedMonthYear">
        Check Salary
      </button>
    </div>

    <!-- Salary Info Display -->
    <div v-if="salaryDetails" class="salary-details">
      <h3>Salary Information for {{ selectedEmployee.name }} ({{ selectedMonthYear }})</h3>
      <div class="salary-info">
        <p><span>Working Hours:</span> {{ salaryDetails.total_working_hours }}</p>
        <p><span>Salary:</span> {{ salaryDetails.salary }}</p>
        <p><span>Status:</span> {{ salaryDetails.status }}</p>
        <p><span>Paid Date:</span> {{ salaryDetails.paid_date }}</p>
        <p><span>Position:</span> {{ salaryDetails.employee_position }}</p>
        <p><span>Department:</span> {{ salaryDetails.employee_department }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; // Import the CSS for toasts
import dayjs from 'dayjs'; // Import dayjs for date manipulation

// Initialize store
const store = useStore();

// Employee and month-year state
const selectedEmployee = ref('');
const selectedMonthYear = ref('');

// Fetch employees from the store
const employees = ref([]);
onMounted(async () => {
  await store.dispatch('admin/fetchAllEmployees');
  employees.value = store.getters['admin/getEmployees'];
});

// Available months for selection
const months = ref([
  'January 2024',
  'February 2024',
  'March 2024',
  'April 2024',
  'May 2024',
  'June 2024',
  'July 2024',
  'August 2024',
  'September 2024',
  'October 2024',
]);

// Salary data ref
const salaryDetails = ref(null);

// Function to check and fetch salary details
const checkSalary = async () => {
  if (selectedEmployee.value && selectedMonthYear.value) {
    try {
      const employeeId = selectedEmployee.value.id;
      // Format the selectedMonthYear value into 'YYYY-MM' using dayjs
      const selectedMonth = dayjs(selectedMonthYear.value).format('YYYY-MM');

      await store.dispatch('admin/fetchSalaryByEmployeeAndMonth', {
        employee_id: employeeId,
        month: selectedMonth,
      });

      salaryDetails.value = store.getters['admin/getSalaryDetails'];

      if (salaryDetails.value) {
        toast.success('Salary details fetched successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error('No salary details found for the selected month.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error('Error fetching salary details:', error);
      toast.error('Failed to fetch salary details. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } else {
    toast.error('Please select both an employee and a month-year.', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
</script>


  <style scoped>
  /* Base Styles */
  .salary-container {
    padding: 30px;
    max-width: 700px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
    transition: box-shadow 0.3s ease-in-out;
  }

  .salary-container:hover {
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  }

  h2 {
    text-align: center;
    color: #343a40;
    font-weight: 600;
    margin-bottom: 25px;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #495057;
  }

  .form-control {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ced4da;
    font-size: 16px;
    background: #f9fafb;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .form-control:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  /* Button Styling */
  .btn-check-salary {
    padding: 12px 18px;
    background-color: #4b49ac;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .btn-check-salary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  .btn-check-salary:hover:not(:disabled) {
    background-color: #3a3793;
    transform: translateY(-2px);
  }

  /* Salary Details Section */
  .salary-details {
    margin-top: 30px;
    padding: 25px;
    border-radius: 12px;
    background: #f9fafb;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  .salary-details h3 {
    margin-bottom: 20px;
    color: #495057;
    font-weight: 600;
  }

  .salary-info p {
    font-size: 16px;
    margin-bottom: 12px;
    color: #343a40;
    line-height: 1.5;
  }

  .salary-info span {
    font-weight: 700;
    color: #007bff;
  }

  .salary-info p:last-child {
    margin-bottom: 0;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .salary-container {
      padding: 20px;
    }

    .form-control {
      font-size: 14px;
      padding: 10px;
    }

    .btn-check-salary {
      font-size: 14px;
      padding: 10px 16px;
    }

    .salary-info p {
      font-size: 14px;
    }
  }
  </style>