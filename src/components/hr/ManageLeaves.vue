<template>
    <div class="leaves-dashboard">
        <h2 class="dashboard-title">Leaves Dashboard</h2>

        <!-- Dashboard Stats -->
        <div class="dashboard-stats">
            <div class="stat-box" v-for="(stat, index) in stats" :key="index">
                <h3>{{ stat.title }}</h3>
                <p>{{ stat.value }}</p>
            </div>
        </div>

        <!-- Filters -->
        <div class="filter-section">
            <input type="text" v-model="filters.employeeName" placeholder="Search Employee Name" class="input-field" />
            <select v-model="filters.leaveType" class="input-select">
                <option value="">Select Leave Type</option>
                <option v-for="type in leaveTypes" :key="type">{{ type }}</option>
            </select>
            <input type="date" v-model="filters.fromDate" class="input-field" />
            <input type="date" v-model="filters.toDate" class="input-field" />
            <button @click="searchLeaves" class="btn-search">Search</button>
        </div>

        <!-- Pending Leaves Table -->
        <h3 class="section-title">Pending Leaves</h3>
        <div class="leave-table-wrapper">
            <table class="leave-table">
                <thead>
                    <tr>
                        <th><i class="fas fa-user"></i> Employee</th>
                        <th><i class="fas fa-calendar-alt"></i> Leave Type</th>
                        <th><i class="fas fa-calendar-day"></i> From</th>
                        <th><i class="fas fa-calendar-day"></i> To</th>
                        <th><i class="fas fa-comment-alt"></i> Reason</th>
                        <th><i class="fas fa-cogs"></i> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="leave in pendingLeaves" :key="leave.id">
                        <td>{{ leave.employee_name }}</td>
                        <td>{{ leave.leaveType }}</td>
                        <td>{{ leave.start_date }}</td>
                        <td>{{ leave.end_date }}</td>
                        <td>{{ leave.reason }}</td>
                        <td>
                            <button class="btn-action accept" @click="acceptLeave(leave.id)">Accept</button>
                            <button class="btn-action reject" @click="rejectLeave(leave.id)">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Accepted and Rejected Leaves -->
        <h3 class="section-title">Accepted Leaves</h3>
        <div class="leave-table-wrapper">
            <table class="leave-table">
                <thead>
                    <tr>
                        <th><i class="fas fa-user"></i> Employee</th>
                        <th><i class="fas fa-calendar-alt"></i> Leave Type</th>
                        <th><i class="fas fa-calendar-day"></i> From</th>
                        <th><i class="fas fa-calendar-day"></i> To</th>
                        <th><i class="fas fa-comment-alt"></i> Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="leave in acceptedLeaves" :key="leave.id">
                        <td>{{ leave.employee_name }}</td>
                        <td>{{ leave.leaveType }}</td>
                        <td>{{ leave.start_date }}</td>
                        <td>{{ leave.end_date }}</td>
                        <td>{{ leave.reason }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3 class="section-title">Rejected Leaves</h3>
        <div class="leave-table-wrapper">
            <table class="leave-table">
                <thead>
                    <tr>
                        <th><i class="fas fa-user"></i> Employee</th>
                        <th><i class="fas fa-calendar-alt"></i> Leave Type</th>
                        <th><i class="fas fa-calendar-day"></i> From</th>
                        <th><i class="fas fa-calendar-day"></i> To</th>
                        <th><i class="fas fa-comment-alt"></i> Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="leave in rejectedLeaves" :key="leave.id">
                        <td>{{ leave.employee_name }}</td>
                        <td>{{ leave.leaveType }}</td>
                        <td>{{ leave.start_date }}</td>
                        <td>{{ leave.end_date }}</td>
                        <td>{{ leave.reason }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<!-- <template>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
</template> -->

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const filters = ref({
    employeeName: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
});

const leaveTypes = ref(['Medical Leave', 'Casual Leave', 'Paternity Leave', 'Maternity Leave']);
store.dispatch('fetchLeaves');

const pendingLeaves = computed(() => store.getters.pendingLeaves);
const acceptedLeaves = computed(() => store.getters.acceptedLeaves);
const rejectedLeaves = computed(() => store.getters.rejectedLeaves);
const error = computed(() => store.state.error);

const successMessage = ref(''); // For success feedback

const acceptLeave = async (leaveId) => {
    await store.dispatch('acceptLeave', leaveId);
    successMessage.value = 'Leave request accepted successfully';
};

const rejectLeave = async (leaveId) => {
    await store.dispatch('rejectLeave', leaveId);
    successMessage.value = 'Leave request rejected successfully';
};

// Watch for changes in error and reset success message
watch(error, () => {
  if (error.value) {
    successMessage.value = ''; // Clear success message if there's an error
  }
});

const searchLeaves = () => {
    // Implement search functionality based on filters
};

const stats = ref([
    { title: 'Today Presents', value: '12 / 60' },
    { title: 'Planned Leaves', value: '8 Today' },
    { title: 'Unplanned Leaves', value: '0 Today' },
    { title: 'Pending Requests', value: `${pendingLeaves.value.length}` },
]);
</script>


<style scoped>
.leaves-dashboard {
    padding: 30px;
    max-width: 1200px;
    margin: auto;
    font-family: 'Inter', sans-serif;
}

.dashboard-title {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
}

.dashboard-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 30px;
}

.stat-box {
    background-color: #f5f8fa;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    flex: 1;
    min-width: 250px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-box h3 {
    font-size: 18px;
    color: #666;
}

.stat-box p {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.filter-section {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 30px;
}

.input-field,
.input-select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    flex: 1;
    min-width: 150px;
}

.input-field:focus,
.input-select:focus {
    outline: none;
    border-color: #4B49AC;
}

.btn-search {
    background-color: #4b49ac;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    flex: 1;
    transition: background-color 0.3s ease;
    min-width: 120px;
}

.btn-search:hover {
    background-color: #3e3a95;
}

.section-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
}

.leave-table-wrapper {
    overflow-x: auto;
    margin-bottom: 30px;
}

.leave-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.leave-table th,
.leave-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.leave-table th {
    background-color: #f4f6f9;
    color: #333;
}

.leave-table tr:hover {
    background-color: #f9f9f9;
}

.btn-action {
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 10px;
}

.btn-action.accept {
    background-color: #5cb85c;
    color: white;
}

.btn-action.reject {
    background-color: #d9534f;
    color: white;
}
</style>
