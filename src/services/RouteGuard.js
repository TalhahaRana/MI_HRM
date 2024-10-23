import store from '@/stores';

let RouteService = function routeGuard(permission, roles = []) {
  return (to, from, next) => {
    // Get the user role and permission check from Vuex
    const userRole = store.getters['roles/userRole'];
    const hasPermission = store.getters['roles/hasPermission'](permission); // Checking if the user has the required permission
      console.log("roless array",roles);
    console.log("User Role: ", userRole);
    console.log("Has Permission: ", hasPermission);

    // Check if the user has the required role
    const hasRole = roles.includes(userRole);

    console.log("Has Role: ", hasRole);

    if (roles.length > 0) {
      if (hasPermission && hasRole) {
        console.log("Access granted");
        next(); // Allow access to the route
      } else {
        console.log("Access denied");
        next('/'); // Redirect to home if access is denied
      }
    } else {
      if (hasPermission) {
        console.log("Access granted");
        next(); // Allow access if only permission is needed
      } else {
        console.log("Access denied");
        next('/'); // Redirect to home if access is denied
      }
    }
  };
};

export default RouteService;
