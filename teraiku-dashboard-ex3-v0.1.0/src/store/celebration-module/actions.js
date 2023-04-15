
import { api, stagingApi } from "src/boot/axios";
import { columnsForClients } from "src/composable/column-tables";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async createBook({ commit }, payload) {
    console.log(payload);
    const response = await stagingApi.post("/currentbook", payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(payload);

    if (response.status !== 201) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/members2/${id}`);

    commit("createResource", { ...response.data });
    console.log("commited!!!",response.data)
  },

  async readMeta({ commit }, payload) {
    const TenantID = payload.TenantID
    console.log(TenantID)

    const response = await stagingApi.get(`users/${TenantID}/profiles`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResourceMeta", response.data);
  },

  async readBooks({ commit }, payload) {
    const pageID = payload.page
    const TenantID = payload.TenantID
    console.log("pageID", pageID)
    const response = await stagingApi.get(`users/${TenantID}/profiles?page=${pageID}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }
    console.log("response.data", response.data)
    commit("ReadResources", response.data);
    
  },

  async searchBooks({ commit }, payload) {
    console.log("payload",payload)
    const response = await stagingApi.post("/currentbook/search", {
      "filters" : [
        { "field": "family_id", "operator": "=", "value": payload }
      ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      }
    });

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("SearchResources", response.data);
    console.log("commited!!",response.data)
  },

  async updateBook({ commit }, payload) {
    console.log(payload)
    const { id, ...dataToUpdate } = payload;
    console.log(id)
    console.log(dataToUpdate)
    const response = await stagingApi.patch(`/currentbook/${id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response.status)

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    const {
      data: { name },
    } = await stagingApi.get(`/currentbook/${id}`);

    commit("updateResource", { ...response.data, nombre_autor: name });
    console.log("commited!!!",response)
  },
  async deleteBook({ commit }, payload) {
    const { id } = payload;
    console.log(payload)
    const response = await stagingApi.delete(`/currentbook/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteResource", { id });
  },

  async readBooksProfile({ commit }, payload) {
    const { id } = payload;
    console.log(payload)
    const response = await stagingApi.get(`/currentbook/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResourcesProfile", { id });
  },
};
