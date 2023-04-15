import { api, stagingApi } from "src/boot/axios";

export default {
  async createBook({ commit }, payload) {
    const response = await stagingApi.post("/corps", payload);

    if (response.status !== 201) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    const {
      data: { name },
    } = await stagingApi.get(`/authors/${payload.autor_id}`);
    commit("createResource", { ...response.data, nombre_autor: name });
  },
  async readBooks({ commit }) {
    const response = await stagingApi.get("/corps");

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", response.data);
  },
  async updateBook({ commit }, payload) {
    const { id, ...dataToUpdate } = payload;
    const response = await stagingApi.patch(`/corps/${id}`, dataToUpdate);

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    const {
      data: { name },
    } = await stagingApi.get(`/authors/${dataToUpdate.autor_id}`);
    commit("updateResource", { ...response.data, nombre_autor: name });
  },
  async deleteBook({ commit }, payload) {
    const { id } = payload;
    const response = await stagingApi.delete(`/corps/${id}`);

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteResource", { id });
  },
};
