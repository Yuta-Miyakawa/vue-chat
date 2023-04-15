import { getTokenFromStorage, getTokenFromVuex } from "src/composable/utils";
import { LocalStorage, Dark } from "quasar";
import { stagingApi } from "boot/axios";
import { store } from "quasar/wrappers";
import { useRouter } from "vue-router";

function setResponseData(commit, responseData) {

  console.log('*** setResponseData:::', responseData)

  LocalStorage.set("isOnLogin", true);
  LocalStorage.set("userId", responseData.data.user.id);
  LocalStorage.set("userMail", responseData.data.user.email);
  LocalStorage.set("userName", responseData.data.user.name);
  LocalStorage.set("userPhone", responseData.data.user.phone);
  LocalStorage.set("userRole", responseData.data.user.role);
  LocalStorage.set("accessToken", responseData.data.access_token);
  LocalStorage.set("refreshToken", responseData.data.refresh_token);
  LocalStorage.set("isDarkMode", Dark.isActive);

  commit("setUserData", {
    isOnLogin: true,
    userId: responseData.data.user.id,
    userMail: responseData.data.user.email,
    userName:  responseData.data.user.name,
    // userPhone: responseData.data.user.phone,
    userRole: responseData.data.user.role,
    accessToken: responseData.data.access_token,
    refreshToken: responseData.data.refresh_token,
    isTenant: responseData.data.user.is_tenant,
  });
}

// REMOVE ALL DATA
function removeData(commit) {
  LocalStorage.remove("isOnLogin");
  LocalStorage.remove("userId");
  LocalStorage.remove("userMail");
  LocalStorage.remove("userName");
  LocalStorage.remove("userPhone");
  LocalStorage.remove("userRole");
  LocalStorage.remove("accessToken");
  LocalStorage.remove("refreshToken");

  commit("setUserData", {
    isOnLogin: false,
    userId: null,
    userMail: null,
    userName: null,
    userPhone: null,
    userRole: null,
    accessToken: null,
    refreshToken: null,
    isTenant: false,
  });
}

// SIGNUP USER
export default {
  async signUpUser({ commit }, payload) {
    const response = await stagingApi.post("/register", payload);
    if (response.status !== 200) {
      throw new Error(response.message || "ユーザーの作成中にエラーが発生しました");
    }
    console.log('signUpUser::response ',response)
  },

  // LOGIN USER
  async userLogin({ commit }, payload) {
    // const response = await stagingApi.post("/login", payload);
    const response = await stagingApi.post("/login", payload);
    if (response.status !== 200) {
      throw new Error(response.message || "Login: ログイン起動プロセスが完了していません");
    }

    console.log("LOGIN RESPONS: ", response)

    setResponseData(commit, response);
  },

  async userAccessToken({ commit }) {
    const response = await stagingApi.get("/me", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log("取得した",response);
    // console.log(useRouter)


    if (response.status !== 200) {
      console.log('aaa')
      throw new Error("アカウント情報が取得できませんでした");
    }

    commit("setUsersMe", response.data)

  },

  async TenantsAccessToken({ commit }, payload) {
    console.log(payload)
    const UserID = payload.UserID
    // const response = await stagingApi.get(`users/11/tenants`, {
    const response = await stagingApi.get(`users/${UserID}/tenants`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log("取得した", response);


    if (response.status !== 200) {
      console.log('aaa')
      throw new Error("アカウント情報が取得できませんでした");
    }

    commit("setuserTenants", response.data)
  },

  async TenantsInformation({ commit }, payload) {
    console.log(payload)
    const TenantID = payload.TenantID
    // const response = await stagingApi.get(`users/11/tenants`, {
    const response = await stagingApi.get(`tenants/${TenantID}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log("取得した", response);


    if (response.status !== 200) {
      console.log('aaa')
      throw new Error("アカウント情報が取得できませんでした");
    }

    commit("setuserTenants", response.data)

  },

  async TenantDefault({ commit }, payload) {
    console.log(payload)

    commit("setdefaultTenants", payload)
    LocalStorage.set("stateTenant", payload);

  },

  async TenantsChange({ commit }, payload) {
    console.log(payload)

    commit("setchangeTenants", payload)
    LocalStorage.set("stateTenant", payload);

  },

  async userAccessRoles({ }) {
    // console.log(getTokenFromVuex())
    const response = await stagingApi.get("/roles", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log("取得した", response);

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

  },

  tryLoggin({ commit }) {
    console.log("TRYLOGIN:::IN")

    const { userId, userName,
      // userLastName, userFirstName,
      userMail, userPhone, userPassword, userRole, accessToken, refreshToken } = LocalStorage.getAll();

    // if (userId && userName && userMail &&  userPassword && userRole && accessToken && refreshToken) {
      commit("setUserData", {
        userId,
        userName,
        // userFirstName,
        // userLastName,
        userMail,
        userPassword,
        userPhone,
        userRole,
        accessToken,
        refreshToken,
      });
    // }
  },

  // ユーザプロファイル取得
  async getUserProfile({ commit }) {
    const response = await stagingApi.get("/profile", {
      headers: {
        email: userMail,
        name: userName,
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 200) {
      throw new Error(
        response.message || "データのキャプチャ中にエラーが発生しました"
      );
    }

    commit("setUserDataToModify", {
      //userId: response.data.user.id,
      userName: response.data.name,
      userMail: response.data.email,
      userPassword: response.data.password,
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      userRole: response.data.role,
    });
  },

  // ユーザプロファイルアップデート
  async updateUserProfileData({ commit }, payload) {
    const response = await stagingApi.patch("/profile", payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(
        response.message || "PROFILE: データの変更中にエラーが発生しました"
      );
    }
    console.log('PROFILE: ',payload);
    LocalStorage.set("userName", payload.name);
    LocalStorage.set("userMail", payload.email);
    LocalStorege.set("userPassword", payload.password);
    LocalStorage.set("userRole", payload.role);
    LocalStorage.set("accessToken", payload.access_token);
    LocalStorage.set("refreshToken", payload.refresh_token);

  },

  async logoutError({ commit }){
    removeData(commit);
  },

  // LOGOUT
  async logout({ commit }) {
    const response = await stagingApi.post("/logout", null, {
      
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    console.log("ConsoleLog ログアウトしました。");

    if (response.status !== 200) {
      throw new Error("LOGOUT: 操作中にエラーが発生しました");
    }

    removeData(commit);
  },

  // RESET PASSWORD
  async recoverAccount({ commit }, payload) {
    console.log("CONSOLE LOG: recoverAccount email ", payload.email);
    const response = await stagingApi.post("/reset-password", payload);
    if (response.status !== 200) {
      throw new Error(response.message || "プロセスでエラーが発生しました");
    }
  },
};
