import { LocalStorage } from "quasar";
import { useStore } from "vuex";

function getTokenFromStorage() {
  // console.log("accessToken",LocalStorage.getItem("accessToken"))
  return `Bearer ${LocalStorage.getItem("accessToken")}`
}

function getTokenFromVuex() {
  console.log("accessToken", useStore().state.authModule.users)
  return 'Bearer ' + useStore().state.authModule.accessToken
}

export { getTokenFromStorage, getTokenFromVuex };
