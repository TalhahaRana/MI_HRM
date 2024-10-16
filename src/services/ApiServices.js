import axios from 'axios';

const baseURL = 'http://192.168.15.115:8000/api'; // sameer Set your base URL
//const baseURL = 'http://192.168.15.44:8000/api';

const ApiServices = {
  // Initialize the Axios defaults
  init() {
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
  },
  // Helper method to get the authorization header
  getAuthHeader() {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  },

  // Method for GET requests with async/await
  async GetRequest(url) {
    try {
      const headers = {
        ...this.getAuthHeader(),
        'Content-Type': 'application/json', // Add custom header
      };
      const response = await axios.get(url, { headers });
      alert(response.data.message); // Show a message alert on success
      return response.data; // Return the response data for further processing
    } catch (error) {
      console.error('GET request failed:', error);
      alert('An error occurred. Please try again later.'); // Alert on error
      throw error; // Rethrow the error for further handling if needed
    }
  },

  async GetRequestWorkingHours(url, params = {}) {

    try {
    
    const headers = {
    
    ...this.getAuthHeader(),
    
    "Content-Type": "application/json", // Add custom header
    
    };
    
    const response = await axios.get(url, { headers, params }); // Include params here
    
    alert(response.data.message); // Show a message alert on success
    
    return response.data; // Return the response data for further processing
    
    } catch (error) {
    
    console.error("GET request failed:", error);
    
    alert("An error occurred. Please try again later."); // Alert on error
    
    throw error; // Rethrow the error for further handling if needed
    
    }
    
    },  

  // Method for POST requests with async/await
  async PostRequest(url, data) {
    try {
      console.log(`POST request to: ${baseURL}${url}`); // Add this line to log URL
      const response = await axios.post(url,data);
      // alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  },
  async PostRequestHeader(url, data) {
    try {
      const headers = {
        ...this.getAuthHeader(),
        'Content-Type': 'application/json', // Add custom header
      };

      console.log(`POST request to: ${baseURL}${url}`); 
      const response = await axios.post(url, data, { headers });
      // alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error('POST request with header failed:', error);
      throw error;
    }
  },
  async PutRequest(url, data) {

    try {

        const headers = {

            ...this.getAuthHeader(),

            'Content-Type': 'application/json', // Add custom header

        };
        console.log(`PUT request to: ${baseURL}${url}`);

        const response = await axios.put(url, data, { headers });

        // alert(response.data.message); // Show a message alert on success

        return response.data; // Return the response data for further processing

    } catch (error) {

        console.error('PUT request failed:', error);

        // alert('An error occurred. Please try again later.'); // Alert on error

        throw error; // Rethrow the error for further handling if needed

    }

},



// Method for DELETE requests with async/await

async DeleteRequest(url) {

    try {

        const headers = {

            ...this.getAuthHeader(),

            'Content-Type': 'application/json', // Add custom header

        };

        const response = await axios.delete(`${url}`, { headers });

        alert(response.data.message); // Show a message alert on success

        return response.data; // Return the response data for further processing

    } catch (error) {

        console.error('DELETE request failed:', error);

        alert('An error occurred. Please try again later.'); // Alert on error

        throw error; // Rethrow the error for further handling if needed

    }

}
};

export default ApiServices;
