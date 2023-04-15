import * as dayjs from "dayjs";
import ja from "dayjs/locale/ja";
dayjs.locale(ja);

export default {
    createResource(state, payload) {
    // console.log("createResource",state.pastdeath);
    // state.pastdeath.data.push(payload);
    console.log(payload)
    },

    ReadResourceMeta(state, payload) {
      state.pastMeta = payload;
    },

    ReadResources(state, payload) {
      state.pastfamily = payload.data

      // payload.data.forEach((past, index) => {
      //   state.pastdeath[index] = (dayjs(past.death).format("YYYY-MM-DD"))
      // })
      // console.log("readpastdeath",state.pastdeath)
      // console.log("readpastfamily",state.pastfamily)
  
      // state.pastdeath = payload;
    },
    SearchResources(state, payload) {

      state.pastdeath = payload;
    },
    updateResource(state, payload) {
      state.pastdeath.data = state.pastdeath.data.map((past) =>
        payload.id === past.id ? { ...past, ...payload } : past
      );
    },
    deleteResource(state, payload) {
      console.log(state);
      state.pastdeath.data = state.pastdeath.data.filter((current) => current.id !== payload.id);
    },
    ReadResourcesProfile(state, payload) {
      console.log(state);
      state.pastdeath = pyaload;
    }
  };
  