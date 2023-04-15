export default {
  getUserName: (state) => state.userName,
  getUserFirstName: (state) => state.userFirstName,
  getUserLastName: (state) => state.userLastName,
  getUserMail: (state) => state.userMail,
  getUserPassword: (state) => state.userPassword,
  isAuthenticated: (state) => !!state.accessToken,
  getUserData: (state) => ({
    name: state.userName,
    first_name: state.userFirstName,
    last_name: state.userLastName,
    email: state.userMail,
    password: state.userPassword,
    role: state.userRole,
    access_token: state.accessToken,
    refresh_token: state.refreshToken,
  }),
};
