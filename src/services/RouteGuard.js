import store from '@/stores';
let RouteService = function routeGuard(permission, roles = []) {
  // const store = useStore();
  const userRole = localStorage.getItem("roles");
  const perm=JSON.parse(localStorage.getItem("permissions"));
  console.log("salman ali.......",userRole,"permission",perm);
  const userPermissions = Array.isArray(perm) ? perm.includes(permission) : false;
  console.log("User Permission ",userPermissions);
  // const userRole =  store.getters['roles/userRole'];
  // User Role
  return (to, from, next) => {
    // const hasPermission = userPermissions.includes(permission);
    const hasRole = roles.includes(userRole);
    console.log("Has Role",hasRole);
    console.log("Permission",userPermissions);
      if (roles.length > 0) {
        if (userPermissions && hasRole) {
          console.log("here");
          next(); 
        } else {
          console.log("here salman");
          next('/'); 
        }
      } else {
        if (userPermissions) {
          console.log("here s");
          next();
        } else {
          console.log("here q");
          next('/');
        }
      }
    } 
 // next(); 
};

export default RouteService;
