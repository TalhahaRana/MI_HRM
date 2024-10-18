<!-- <template>
    <div class="progress-bar-container">
      <div class="progress-bar">
        <div
          class="progress"
          :style="{ width: progressPercentage + '%', background: progressGradient }"
          :class="getProgressClass"
        ></div>
      </div>
      <div class="progress-label">{{ progressPercentage }}%</div>
      <div class="status-label">{{ statusText }}</div>
    </div>
  </template>

  <script>
  export default {
    props: {
      status: {
        type: String,
        required: true,
      },
    },
    computed: {
      progressPercentage() {
        switch (this.status) {
          case 'pending':
            return 10; // 10% filled for pending
          case 'in_progress':
            return 50; // 50% filled for in progress
          case 'completed':
            return 100; // Fully filled for completed
          default:
            return 0; // Default to no progress
        }
      },
      getProgressClass() {
        if (this.status === 'completed') {
          return 'completed';
        } else if (this.status === 'in_progress') {
          return 'in-progress';
        } else {
          return 'pending';
        }
      },
      progressGradient() {
        switch (this.status) {
          case 'pending':
            return 'linear-gradient(90deg, #f44336 0%, #e57373 100%)'; // Red gradient
          case 'in_progress':
            return 'linear-gradient(90deg, #ff9800 0%, #ffcc80 100%)'; // Orange gradient
          case 'completed':
            return 'linear-gradient(90deg, #4caf50 0%, #81c784 100%)'; // Green gradient
          default:
            return 'transparent'; // Default to no gradient
        }
      },
      statusText() {
        switch (this.status) {
          case 'pending':
            return 'Pending';
          case 'in_progress':
            return 'In Progress';
          case 'completed':
            return 'Completed';
          default:
            return 'Unknown Status';
        }
      },
    },
  }
  </script>

  <style scoped>
  .progress-bar-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px; /* Space between progress bars */
  }

  .progress-bar {
    background-color: #e0e0e0;
    border-radius: 25px; /* Round edges */
    height: 25px; /* Height of the bar */
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Add shadow */
    overflow: hidden; /* Clip child elements */
    position: relative;
  }

  .progress {
    height: 100%;
    border-radius: 25px; /* Match parent rounded edges */
    transition: width 0.4s ease; /* Smooth transition */
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.15); /* Inner shadow */
  }

  .progress-label {
    font-weight: bold;
    margin-top: 5px;
  }

  .status-label {
    font-size: 14px;
    margin-top: 2px;
    color: #555;
  }
  </style> -->



  <template>
    <div class="progress-bar-container">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          :aria-valuenow="progressPercentage"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: progressPercentage + '%', backgroundColor: getProgressColor }"
        ></div>
      </div>
      <div class="progress-label">{{ progressPercentage }}%</div>
      <div class="status-label">{{ statusText }}</div>
    </div>
  </template>

  <script>
  export default {
    props: {
      status: {
        type: String,
        required: true,
      },
    },
    computed: {
      progressPercentage() {
        switch (this.status) {
          case 'pending':
            return 10; // 10% filled for pending
          case 'in_progress':
            return 50; // 50% filled for in progress
          case 'completed':
            return 100; // Fully filled for completed
          default:
            return 0; // Default to no progress
        }
      },
      getProgressColor() {
        switch (this.status) {
          case 'pending':
            return '#f44336'; // Red for pending
          case 'in_progress':
            return '#ff9800'; // Orange for in progress
          case 'completed':
            return '#4caf50'; // Green for completed
          default:
            return '#007bff'; // Default to blue
        }
      },
      statusText() {
        switch (this.status) {
          case 'pending':
            return 'Pending';
          case 'in_progress':
            return 'In Progress';
          case 'completed':
            return 'Completed';
          default:
            return 'Unknown Status';
        }
      },
    },
  };
  </script>

  <style scoped>
  .progress-bar-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px; /* Space between progress bars */
  }

  .progress {
    background-color: rgba(127, 127, 127, 0.25);
    border-radius: 6px;
    height: 25px; /* Height of the bar */
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Add shadow */
    overflow: hidden; /* Clip child elements */
  }

  .progress-label {
    font-weight: bold;
    margin-top: 5px;
  }

  .status-label {
    font-size: 14px;
    margin-top: 2px;
    color: #656565;
  }
  </style>
