<template>
    <div class="container">
        <div class="dashboard-container">
        <h1 class="welcome-title">Welcome Samia</h1>

        <p class="welcome-message">
            All systems are running smoothly! You have 3 unread alerts!
        </p>
    </div>
    <div class="align-items-center justify-content-between container">
        <div class="row">
            <div class="tail col-7">
                <div class="weather-info">
                    <!-- Existing Image -->
                    <img src="../../assets/images/people.png" alt="Profile Image" />

                    <!-- Weather Information -->
                    <div class="d-flex align-items-center temprature">
                            <img v-if="weatherData"
                                :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`"
                                :alt="weatherData.weather[0].description" />
                            <div v-else>
                                <span>Error loading weather data</span>
                            </div>
                            <span class="temperaturee">{{ weatherData ? `${Math.round(weatherData.main.temp)}°C` :
                                'Loading...' }}</span>
                            <span class="location">{{ weatherData ? `${weatherData.name}, ${weatherData.sys.country}` :
                                '...' }}</span>
                        
                    </div>
                </div>
            </div>
            <div class="col-5">
                <!-- <Clock/> -->
    <Calander/>

            </div>

        </div>
        <div class="row mt-4 stats-section">
            <AdminDashCard/>
            <HrDashCard/>
            <EmpDashCard/>
        </div>
    </div>


    </div>

    

    
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Calander from "./Calander.vue";
import AdminDashCard from "./cards/admin/AdminDashCard.vue";
import HrDashCard from "./cards/hr/HrDashCard.vue";
import EmpDashCard from "./cards/emp/EmpDashCard.vue";
import Admin from "@/stores/Admin";

export default {
    components: {
    Calander
    ,AdminDashCard
    ,HrDashCard
    ,EmpDashCard
  },
    name: "Dashboard",
    setup() {
        const time = ref("");
        const weatherData = ref(null);

        const API_KEY = "8dc6d41710f44671e3d24314de9727fe";
        const LOCATION = "Lahore";

        // Function to fetch weather data
        const fetchWeather = async (location) => {
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`);
                if (!response.ok) throw new Error("No weather found.");
                const data = await response.json();
                weatherData.value = data; // Store fetched weather data
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        // Fetch weather data when the component is mounted
        onMounted(() => {
            fetchWeather(LOCATION);

            // Update time every second
            const updateTime = () => {
                const now = new Date();
                time.value = now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                });
            };

            updateTime(); // Set initial time
            const intervalId = setInterval(updateTime, 1000);

            onUnmounted(() => {
                clearInterval(intervalId); // Clear interval on unmount
            });
        });

        return {
            time,
            weatherData,
        };
    },
};
</script>


<style scoped>
.dashboard-container {
    background-color: #f8f9fa;

    padding: 26px 0px;
    

    border-radius: 10px;
}
.card-temprature img{
    width: 44px;
}

.temprature {
    position: absolute;
    top: -38px;
    right: 24px;
}

.welcome-section {
    margin-bottom: 20px;
}

.welcome-title {
    font-size: 2rem;

    font-weight: bold;
}

.welcome-message {
    font-size: 1.2rem;
}

.weather-info {
    margin-top: 59px;
    position: relative;
}

.tail {
    background-color: #DAE7FF;
    border-radius: 20px;

}

.weather-info img {
    width: 100%;
    border-radius: 25px;
}

.weather-icon {
    margin-right: 10px;
}

.temperature {
    font-size: 2.5rem;

    font-weight: bold;
}
.temprature img{
    width: 44px;
}

.location {
    font-size: 1.2rem;

    margin-left: 10px;
}

.date-info {
    font-size: 1.2rem;
}

.time-text {
    font-size: 4rem;
    /* Larger font size for time */

    font-weight: bold;

    color: #333;
    /* Dark color for better visibility */
}

.stats-section {
    margin-top: 20px;
}

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
