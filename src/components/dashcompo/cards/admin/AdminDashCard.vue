<template>
<div class="col-md-6 mb-4">
                <div class="card text-center shadow-sm card-today-bookings">
                    <div class="card-body">
                        <h5 class="card-title">Total Employees</h5>
                        <p class="card-text display-4">4006</p>
                        <p class="text-muted">Last 30 days</p>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <div class="card text-center shadow-sm card-total-bookings">
                    <div class="card-body">
                        <h5 class="card-title">Total Hr's</h5>
                        <p class="card-text display-4">13</p>
                        <p class="text-muted">Last 30 days</p>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <div class="card text-center shadow-sm card-number-meetings">
                    <div class="card-body">
                        <h5 class="card-title">Total Departments</h5>
                        <p class="card-text display-4">24</p>
                        <p class="text-muted">2.00% (Increase)</p>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <div class="card text-center shadow-sm card-number-clients">
                    <div class="card-body">
                        <h5 class="card-title">Total Ongoing Projects</h5>
                        <p class="card-text display-4">55</p>
                        <p class="text-muted">0.22% (Increase)</p>
                    </div>
                </div>
            </div>
</template>

<script>
</script>
<style scoped>

.card {
    border-radius: 15px;
    color: white;
    background-color: #ffffff;
    box-shadow: 0px 5px 21px -5px #CDD1E1;
}

.card-today-bookings {
    background-color: #7DA0FA;
}

.card-total-bookings {
    background-color: #4747A1;
}

.card-number-meetings {
    background-color: #7978E9;
}

.card-number-clients {
    background-color: #F3797E;
}

.card-title {
    font-weight: bold;
}

.card-text {
    font-size: 1.5rem;
}

.clock {

    width: 300px;

    height: 250px;

    display: flex;

    justify-content: center;

    align-items: center;

    font-size: 48px;

    background-color: cornflowerblue;

    border: 2px solid #007bff;

    border-radius: 10px;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

}
</style>