import { stagingApi } from "src/boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async createCurrent({ commit }, payload) {
    console.log(payload)
    const { id, ...dataToUpdate } = payload;
    const response = await stagingApi.post(`users/${id}/profiles`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 201) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("createCurrentResource", { ...response.data });
    console.log("commited!!!",response.data)
  },

  async createPast({ commit }, payload) {
    console.log(payload)
    const { id, ...dataToUpdate } = payload;
    const response = await stagingApi.post(`users/${id}/profiles`, dataToUpdate, {
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

    commit("createPastResource", { ...response.data });
    console.log("commited!!!",response.data)
  },

  async readBooks({ commit }, payload) {
    const pageID = payload.ReadID
    console.log("pageID", pageID)
    // const response = await stagingApi.get("/currentbook", {
    //   headers: {
    //     Authorization: getTokenFromStorage(),
    //   },
    // });
    // const response = await stagingApi.post(`users/${pageID}/profiles/search`, {
    //   "filters" : [
    //      { "field": "type", "operator": "=", "value": "家族" },
    //   ],
    //   headers: {
    //     Authorization: getTokenFromStorage(),
    //   },
    // });

    const response = await stagingApi.get(`users/${pageID}/profiles`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", response.data);
  },

  async readRepresentBooks({ commit }, payload) {
    const Id = payload.id
    console.log("Id見ます",Id)
    const response = await stagingApi.post(`users/${Id}/profiles/search`, {
      "filters" : [
        {"field" : "representative", "operator" : "=", "value" : "代表者"}
      ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadRepresentResources", response.data);
  },

  async searchBooks({ commit }, payload) {
    console.log("payload",payload)
    const response = await stagingApi.post("currentbook/search", {
      "filters" : [
        { "field": "family_id", "operator": "=", "value": payload }
      ]
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      }});

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("SearchResources", response.data);
  },

  async updateBook({ commit }, payload) {
    // console.log(payload.pageID)
    console.log(payload)
    const { pageID, id, ...dataToUpdate } = payload;
    console.log(id)
    console.log(dataToUpdate)
    const response = await stagingApi.patch(`users/${pageID}/profiles/${id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/currentbook/${id}`);

    commit("updateResource", { ...response.data});
    console.log("commited!!!",response)
  },
  async deleteBook({ commit }, payload) {
    const id = payload.ReadID;
    const pageID = payload.pageID;
    console.log(id)
    console.log(pageID)
    const response = await stagingApi.delete(`users/${pageID}/profiles/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response);

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteResource",  response.data );
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
