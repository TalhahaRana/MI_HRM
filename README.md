
Introduction:
This project aims to develop a comprehensive Human Resource Management (HRM) system designed to streamline the management of employee records, leave requests, and attendance tracking. The system will feature role-based access controls to ensure that different user types (HR personnel, employees, and administrators) have appropriate permissions. Additionally, the system will include a robust check-in/check-out functionality to track employee attendance in real-time, providing detailed reports for HR personnel.

Git Repository URL:
•	Admin Dashboard
TalhahaRana/MI_HRM at dev (github.com)

•	Landing Page
TalhahaRana/hrm-Landing at dev (github.com)
Team Members:
Frontend Members Name:
Salman Ali (Team Lead)
Talha Asif
Talha 
Arham 
Mujahid
Qasim
Samia 
Backend Members Name:
Talha Yousuf (Team Lead)
Ahmad Ali
Samir

Project Structure
1. Installation
To install the project, run the following command:
npm install
2. Running the Project
To run the project locally:
npm run dev
1. Root Directory
The root directory includes basic project setup files, dependencies, and the starting point for the application.
•	node_modules/: Contains all the project dependencies and packages installed via npm or yarn.
•	public/: Houses static assets and the main index.html, which serves as the entry point for the web app.
o	index.html: This file is used by the Vue application to load the necessary JavaScript and render content dynamically.
________________________________________
2. src (Source) Directory
The source directory is the core of the application, containing all the main logic, components, and assets that power the MI_HRM platform.
2.1 Assets
•	assets/: Stores all static assets used across the app, like images, icons, and other media files.
o	images/: A subdirectory specifically for storing image files used within the application.
2.2 Components
The components directory is divided into subfolders that correspond to different system roles—Admin, Employee, and HR. Each role has its own set of dedicated components for managing tasks specific to its function in the system.
a. Admin Components
Admin users have the highest level of access and manage overall HR functions. They handle employee management, attendance tracking, and leave approvals.
•	AddEmployee.Vue: A form component that allows the admin to add new employees into the system.
•	AdminDashboard.Vue: The admin's main dashboard, where they can get an overview of important HR statistics and key data such as employee performance, attendance records, and project assignments.
•	EmployeeAttendance.js: JavaScript logic to handle the backend processes for tracking and managing employee attendance.
•	EmployeeManagement.Vue: A central hub for managing all employee-related data, such as personal details, performance records, and job roles.
•	ManageLeaves.js: This module manages the logic behind the leave management system, helping the admin approve, reject, or track leave requests.
b. Employee Components
Employees have their own set of views and components to manage their day-to-day activities. These include attendance tracking, project assignments, holiday management, and personal dashboard views.
•	AllAssignedProjects.vue: Displays a list of all projects assigned to the employee. Employees can track their progress and view details about each project.
•	AllEmployees.Vue: A shared component that displays a list of all employees within the organization. Can be accessed by employees, admins, and HR.
•	AttendenceEmployee.vue: Shows individual employee attendance records, allowing employees to view their check-in/check-out history and monthly attendance reports.
•	AttendenceEmployeeChart.Vue: Visual representation (charts/graphs) of employee attendance data, providing insights into their performance.
•	checkout.Vue: Allows employees to record their check-ins and check-outs for attendance tracking purposes.
•	DepartmentManagement.Vue: Allows employees to view department structures and related data.
•	EmployeeDashboard.Vue: Employee-specific dashboard that displays relevant information, such as assigned tasks, holidays, and working hours.
•	EmployeeHolidays.Vue: Displays the employee's approved holidays and leave history.
•	EmployeeJoining.Vue: Shows the employee's joining date and other related information.
•	EmployeeProjects.Vue: Employees can manage their current project assignments and track their progress.
•	EmpWorkingHours.Vue: Displays the number of hours an employee has worked within a given period.
•	Leaves.Vue: Employees can view and request leaves using this component, as well as track their leave balance.
•	Salaries.Vue: Employees can view their salary information, including deductions, bonuses, and other payroll details.
c. HR Components
HR users have access to additional features related to human resources management, such as assigning projects to employees, managing employee attendance, and handling department-level operations.
•	AssignProjectEmployee.Vue: HR users can assign projects to employees, track their assignments, and monitor the progress of each employee on different projects.
•	AttendenceEmployee.vue: Displays detailed attendance information for all employees, which the HR team can track and manage.
•	AttendenceEmployeeChart.Vue: Visualizes attendance data for HR to get a clear picture of employee punctuality and attendance trends.
•	checkout.Vue: Allows HR to oversee check-in and check-out times of employees.
•	DepartmentManagement.Vue: HR can manage departments, add new departments, and assign employees to different departments.
•	EmployeeDashboard.Vue: HR’s overview dashboard that includes detailed metrics and KPIs related to employee performance, attendance, and departmental goals.
•	EmployeeHolidays.Vue: HR users can manage holidays for the entire organization or specific employees.
•	EmployeeJoining.Vue: HR users can track employee joining dates and onboarding status.
•	EmployeeProjects.Vue: HR manages the projects assigned to employees and tracks progress.
•	EmpWorkingHours.Vue: HR views and manages the working hours of employees, ensuring proper time tracking.
•	Leaves.Vue: HR oversees employee leave requests, can approve or reject leave, and maintains a leave balance for each employee.
•	Salaries.Vue: HR handles salary distribution and can view payroll information for all employees.
________________________________________
2.3 Services
The services folder holds JavaScript files that manage the interaction between the front-end and the back-end API services. These files are responsible for making HTTP requests to retrieve or send data and handle processes like authentication, employee management, and more.
•	AuthService.js: Handles user login, registration, token management, and authentication processes.
•	DepartmentService.js: Interacts with department-related APIs for adding, updating, or removing department data.
•	EmployeeService.js: Communicates with the back-end to manage employee data (e.g., creating, updating, and deleting employee records).
•	LeaveService.js: Handles leave-related API interactions, such as submitting leave requests and tracking approval status.
•	ProjectService.js: Manages project-related data, assigning projects to employees, and updating project statuses.
•	SalaryService.js: Handles payroll and salary-related data, including retrieving salary information for each employee.
2.4 Views
The views folder contains high-level page components that represent different pages in the application. These components are routed to Vue Router, allowing users to navigate between different sections of the app.
•	Dashboard.Vue: Acts as a central hub for both employees and admins, displaying role-specific information and KPIs based on user roles.
•	EditProfile.Vue: Allows users to update their personal information, including changing passwords and profile details.
•	ForgotPassword.Vue: The page where users can request a password reset.
•	Login.Vue: User login interface where users enter their credentials to access the app.
•	SetPassword.Vue: Page for setting or resetting a user’s password after the reset process.
________________________________________
2.5 App. vue
This is the root component of the application that wraps all other components and sets the overall layout and structure of the web app. It initializes the layout and serves as the base where all other components are rendered.
2.6 main.js
This file is the main entry point of the application. It initializes Vue, sets up the routing (using router.js), and mounts the app to the DOM. It also imports global configurations such as services, stores, and third-party libraries.
2.7 router.js
This file defines the routes used for navigation in the application. Each route is mapped to a specific component or view, enabling users to move between pages such as the dashboard, employee management, leave requests, etc.
________________________________________
Summary of Roles and Dashboards:
•	Admin:
o	The admin dashboard is the most comprehensive, offering an overview of all employee activities, leave management, attendance tracking, and project assignments.
•	Employee:
o	Employees have a simplified dashboard focusing on their assigned tasks, attendance records, and leave requests.
•	HR:
o	HR users have their dashboard for managing employee projects, holidays, department management, and detailed attendance views

Screenshots of all dashboards:

Admin Dashboard:
 
 
HR Dashboard:
 
 
 
Employee Dashboard:
 

 





