import { api, stagingApi } from "src/boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async createImage({ commit }, payload) {
    console.log(payload);
    const response = await stagingApi.post("/upload/avatar", payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("createResource", { ...response.data });
    console.log(response.data);
  },

  
};
