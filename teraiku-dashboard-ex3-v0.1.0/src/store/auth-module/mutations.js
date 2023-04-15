export default {
  setUserData(state, payload) {
    console.log(payload)
    console.log("今からセットします")
    // state.users = payload;
    state.userId = payload.userId;
    state.userMail = payload.userMail;
    state.userName = payload.userName;
    // state.userPassword = payload.userPassword;
    state.userRole = payload.userRole;
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    state.isTenant = payload.isTenant;
  },

  setUsersMe(state, payload) {
    state.users = payload.user;
  },

  setuserTenants(state, payload) {
    state.tenant = payload.data;
  },

  setchangeTenants(state, payload) {
    console.log("tenantを変更します")
    state.stateTenant = payload;
    console.log(state.stateTenant)
  },

  setdefaultTenants(state, payload) {
    console.log("tenantを決めます")
    state.stateTenant = payload;
    console.log(state.stateTenant)
  },

  setUserDataToModify(state, payload) {
    state.users = payload;
    state.userId = payload.userId;
    state.userMail = payload.userMail;
    state.userName = payload.userName;
    state.userPassword = payload.userPassword;
    state.userRole = payload.userRole;
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },

};
