<template>
    <div class="add-manager-container">
      <div class="add-manager">
        <h2>Add HR</h2>
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" required>
              <option disabled value="">Select a role</option>
              <option value="HR">HR</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <button type="submit">Add Manager</button>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  .add-manager-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    overflow: hidden;

  }
  
  .add-manager {
    padding: 20px;
    background-color: #ecf0f1;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    overflow: hidden;
  }
  
  .add-manager h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 95%; 
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    background-color:var(--basic-button);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
 
  
  p {
    margin-top: 10px;
    color: #2c3e50;
  }
  </style>
  