<template>
  <div class="employee-perks-management">
    <h2 class="section-title">Employee Perks Management</h2>

    <!-- Pending Perks Table -->
    <div class="table-wrapper">
      <h3>Pending Perks</h3>
      <table class="employee-table">
        <thead>
          <tr>
            <th><i class="fa-solid fa-user me-1"></i>Employee Name</th>
            <th><i class="fa-solid fa-code-pull-request me-1"></i>Requested Perks</th>
            <th><i class="fa-solid fa-sack-dollar me-1"></i>Total Allowance</th>
            <th><i class="fas fa-cogs me-1"></i>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perk in pendingPerks" :key="perk.id">
            <td>{{ perk.employee_name }}</td>
            <td>
              <div class="perks-list-wrapper">
                <div class="perks-list" :class="{ 'collapsed': isCollapsed(perk.id) }">
                  <span v-for="item in perk.requested_perks" :key="item" class="perk-item">{{ item }}</span>
                </div>
                <button v-if="perk.requested_perks.length > maxPerksVisible" class="toggle-perks-btn"
                  @click="togglePerks(perk.id)">
                  {{ isCollapsed(perk.id) ? 'Show More' : 'Show Less' }}
                </button>
              </div>
            </td>
            <td>{{ perk.total_allowance }}</td>
            <td>
              <button class="btn-action btn-accept" @click="handlePerkAction(perk.id, 'approved')"><i class="fa-regular fa-circle-check"></i> Approve</button>
              <button class="btn-action btn-reject" @click="handlePerkAction(perk.id, 'rejected')"><i class="fa-regular fa-circle-xmark"></i> Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Accepted Perks Table -->
    <div class="table-wrapper">
      <h3>Accepted Perks</h3>
      <table class="employee-table">
        <thead>
          <tr>
            <th><i class="fa-solid fa-user me-1"></i>Employee Name</th>
            <th><i class="fa-solid fa-code-pull-request me-1"></i>Requested Perks</th>
            <th><i class="fa-solid fa-sack-dollar me-1"></i>Total Allowance</th>
            <th><i class="fa-solid fa-arrows-rotate me-1"></i>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perk in acceptedPerks" :key="perk.id">
            <td>{{ perk.employee_name }}</td>
            <td>
              <div class="perks-list-wrapper">
                <div class="perks-list">
                  <span v-for="item in perk.requested_perks" :key="item" class="perk-item">{{ item }}</span>
                </div>
              </div>
            </td>
            <td>{{ perk.total_allowance }}</td>
            <td>{{ perk.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Rejected Perks Table -->
    <div class="table-wrapper">
      <h3>Rejected Perks</h3>
      <table class="employee-table">
        <thead>
          <tr>
            <th><i class="fa-solid fa-user me-1"></i>Employee Name</th>
            <th><i class="fa-solid fa-code-pull-request me-1"></i>Requested Perks</th>
            <th><i class="fa-solid fa-sack-dollar me-1"></i>Total Allowance</th>
            <th><i class="fa-solid fa-arrows-rotate me-1"></i>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perk in rejectedPerks" :key="perk.id">
            <td>{{ perk.employee_name }}</td>
            <td>
              <div class="perks-list-wrapper">
                <div class="perks-list">
                  <span v-for="item in perk.requested_perks" :key="item" class="perk-item">{{ item }}</span>
                </div>
              </div>
            </td>
            <td>{{ perk.total_allowance }}</td>
            <td>{{ perk.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const pendingPerks = computed(() => store.getters['admin/getPendingPerks']);
const acceptedPerks = computed(() => store.getters['admin/getAcceptedPerks']);
const rejectedPerks = computed(() => store.getters['admin/getRejectedPerks']);

onMounted(() => {
  store.dispatch('admin/fetchPerks'); // Fetch perks data on mount
});
const handlePerkAction = async (perkRequestId, status) => {
  try {
    const response = await store.dispatch('admin/updatePerkStatus', {
      perk_request_id: perkRequestId,
      status: status,
    });

    if (response.message.includes("HR cannot approve/reject requests from other HR users")) {
      alert("HR cannot approve/reject requests from other HR users.");
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error('Error handling perk action:', error);
    alert('Failed to update perk status. Please try again.');
  }
};
const maxPerksVisible = 3;
const collapsedState = ref({});

const isCollapsed = (id) => collapsedState.value[id] ?? true;
const togglePerks = (id) => {
  collapsedState.value[id] = !isCollapsed(id);
};
</script>



<style scoped>
.employee-perks-management {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.table-wrapper {
  margin-bottom: 40px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
}

.employee-table th,
.employee-table td {
  padding: 16px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 16px;
}

.employee-table th {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 2;
}

.perks-list-wrapper {
  display: flex;
  flex-direction: column;
}

.perks-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.perk-item {
  background-color: #e0e7ff;
  color: #4b49ac;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
}

.perks-list.collapsed {
  max-height: 60px;
  overflow: hidden;
}

.toggle-perks-btn {
  background: none;
  border: none;
  color: #4b49ac;
  cursor: pointer;
  padding-top: 8px;
}

.btn-action {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-accept {
  background-color: #28a745;
  color: white;
}

.btn-reject {
  background-color: #dc3545;
  color: white;
}

.btn-action:hover {
  opacity: 0.85;
}
</style>
