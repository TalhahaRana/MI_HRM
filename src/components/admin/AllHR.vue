
//all hr
<template>
    <div class="table-container">
      <h2>All HR List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
            <td>Samia</td>
            <td>samia@gmail.com</td>
            <td>HR</td>
            <td>
              <button @click="editItem">Edit</button>
              <button @click="deleteItem">Delete</button>
            </td>
          </tr>
      
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HRTable',
    methods: {
      editItem() {
        
        console.log("Edit button clicked");
      },
      deleteItem() {
  
        console.log("Delete button clicked");
      }
    }
  }
  </script>
  
  <style scoped>
  .table-container {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  button {
    margin-right: 10px;
    padding: 5px 10px;
    background-color:var(--basic-button);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  

  </style>
  