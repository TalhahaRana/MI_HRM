import { useStore } from 'vuex';
let RouteService = function routeGuard(permission, to) {
  const Store = useStore();
  const isAuthenticated = Store.getters['auth/isAuthenticated']; // Check if user is authenticated
  const hasPermission = Store.getters['role/hasPermission']; // Check for permissions in role module

 // if (isAuthenticated) {
  //   if (hasPermission(permission)) {
  //     return true; 
  //   } else {
  //     return false; 
  //   }
  // } else {
  //   return "/"; 
  // }
  return true;


};

export default RouteService;
