<template>
    <div class="container my-5 ">
        <div class="card p-4 shadow-lg">
            <h3 class="text-center mb-4">Payroll Management System</h3>

            <!-- Employee Selection -->
            <div class="form-group mb-4">
                <label for="employeeSelect" class="form-label">Select Employee</label>
                <select id="employeeSelect" v-model="selectedEmployee" class="form-select">
                    <option disabled value="">Choose Employee</option>
                    <option v-for="employee in employees" :key="employee.id" :value="employee">
                        {{ employee.name }} - {{ employee.designation }}
                    </option>
                </select>
            </div>

            <!-- Salary Month -->
            <div class="form-group mb-4">
                <label for="salaryMonth" class="form-label">Salary Month</label>
                <input type="month" id="salaryMonth" v-model="salaryMonth" class="form-control"
                    :class="{ 'is-invalid': salaryMonthError }" />
                <div v-if="salaryMonthError" class="invalid-feedback">
                    Please select a valid salary month.
                </div>
            </div>

            <!-- Allowance and Bonus -->
            <div class="row mb-4">
                <div class="col-md-6">
                    <label for="bonus" class="form-label">Bonus</label>
                    <input type="number" id="bonus" v-model="bonus" class="form-control"
                        placeholder="Enter Bonus Amount" />
                </div>
                <div class="col-md-6">
                    <label for="allowance" class="form-label">Allowance</label>
                    <input type="number" id="allowance" v-model="allowance" class="form-control"
                        placeholder="Enter Allowance Amount" />
                </div>
            </div>

            <!-- Generate Payslip Button -->
            <button class="btn btn-primary w-100 mt-3" @click="generatePayslip">
                Generate Payslip
            </button>

            <!-- Payslip Display -->
            <div v-if="payslipGenerated" class="payslip-container mt-5">
                <div class="payslip p-4 bg-white shadow-sm">
                    <h5 class="text-center text-primary">Payslip for {{ selectedEmployee.name }}</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Designation:</strong> {{ selectedEmployee.designation }}</p>
                            <p><strong>Department:</strong> {{ selectedEmployee.department }}</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Salary Month:</strong> {{ formatMonth(salaryMonth) }}</p>
                            <p><strong>Basic Salary:</strong> ${{ formatCurrency(selectedEmployee.basic_salary) }}</p>
                        </div>
                    </div>
                    <hr />
                    <p><strong>Bonus:</strong> ${{ formatCurrency(bonus) }}</p>
                    <p><strong>Allowance:</strong> ${{ formatCurrency(allowance) }}</p>
                    <p><strong>Gross Salary:</strong> ${{ formatCurrency(grossSalary) }}</p>
                    <p><strong>Tax Deduction (10%):</strong> ${{ formatCurrency(taxDeduction) }}</p>
                    <p><strong>Net Salary:</strong> ${{ formatCurrency(netSalary) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        // Mock Data for Employees
        const employees = ref([
            { id: 1, name: 'Mujahid Nawaz', designation: 'Software Engineer', department: 'IT', basic_salary: 5000 },
            { id: 2, name: 'Qasim Ikram', designation: 'Project Manager', department: 'Operations', basic_salary: 7000 },
        ]);

        // Form Data
        const selectedEmployee = ref('');
        const salaryMonth = ref('');
        const bonus = ref(0);
        const allowance = ref(0);
        const payslipGenerated = ref(false);
        const salaryMonthError = ref(false);

        // Computed Properties
        const grossSalary = computed(() => {
            return selectedEmployee.value ? selectedEmployee.value.basic_salary + parseFloat(bonus.value) + parseFloat(allowance.value) : 0;
        });

        const taxDeduction = computed(() => {
            const taxRate = 0.1; // Example 10% tax
            return grossSalary.value * taxRate;
        });

        const netSalary = computed(() => {
            return grossSalary.value - taxDeduction.value;
        });

        // Generate Payslip
        const generatePayslip = () => {
            if (!selectedEmployee.value || !salaryMonth.value) {
                if (!salaryMonth.value) salaryMonthError.value = true;
                alert('Please select an employee and salary month.');
            } else {
                payslipGenerated.value = true;
                salaryMonthError.value = false;
            }
        };

        // Format Month
        const formatMonth = (month) => {
            const date = new Date(month);
            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        };

        // Format Currency
        const formatCurrency = (value) => {
            return parseFloat(value).toFixed(2);
        };

        return {
            employees,
            selectedEmployee,
            salaryMonth,
            bonus,
            allowance,
            grossSalary,
            taxDeduction,
            netSalary,
            payslipGenerated,
            salaryMonthError,
            generatePayslip,
            formatMonth,
            formatCurrency,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 700px;
}

.card {
    border-radius: 10px;
    border: none;
    background-color: #f8f9fa;
}

button {
    border-radius: 6px;
    background-color: var(--basic-button);
}
.text-primary{

    color: var(--basic-button) !important;
}
.payslip-container {
    border-top: 2px solid var(--basic-button);
}

.payslip {
    border-radius: 8px;
}

.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    color: #dc3545;
}
</style>