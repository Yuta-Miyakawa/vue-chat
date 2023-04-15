
import { api, stagingApi } from "src/boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async createBook({ commit }, payload) {
    const id = payload.id;
    console.log(id)
    const dataToCreate = payload.data;
    console.log(dataToCreate)
    // const response = await stagingApi.post(`users/${id}/posts/`, dataToUpdate, {
    //   headers: {
    //     Authorization: getTokenFromStorage(),
    //   },
    // });
    const response = await stagingApi.post(`users/${id}/posts/batch`, {
      "resources" : dataToCreate,
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response.data);


    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("createResource", { ...response.data });
    console.log("commited!!!", response.data)
  },
  async createPost({ commit }, payload) {
    // console.log(payload)
    const { id, ...dataToUpdate } = payload;
    console.log(id)
    console.log(dataToUpdate)
    const response = await stagingApi.post(`users/${id}/posts/`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(payload);

    if (response.status !== 201) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }


    commit("createResource", { ...response.data });
    console.log("commited!!!", response.data)
  },

  async readBooks({ commit }, payload) {
    console.log(payload)
    const UserID = payload.ReadUserID;
    const TenantID = payload.TenantID;
    console.log(TenantID)
    const response = await stagingApi.post(`/posts/search`, {
      "filters" : [
        {"field" : "request_id", "operator" : "=", "value" : UserID},
        {"field" : "description", "operator" : "=", "value" : "お知らせ投稿"}
      ],
      "sort" : [
        {"field" : "updated_at", "direction" : "desc"}
      ],
    },  {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", response.data);
    console.log("response.data", response.data)
  },

  async readTenantBooks({ commit }, payload) {
    console.log(payload)
    const response = await stagingApi.post(`/posts/search`, {
      "filters" : [
        {"field" : "request_id", "operator" : "=", "value" : payload.user_id},
        { "field": "description", "operator": "!=", "value": "お知らせ投稿"},
        { "field": "description", "operator": "!=", "value": "プロファイル作成"}
      ],
      "sort" : [
        {"field" : "updated_at", "direction" : "desc"}
      ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", response.data);
    console.log("response.data", response.data)
  },

  async readBooksDeteil({ commit }, payload) {
    console.log(payload.id)
    const UserID = payload.ReadUserID;
    const response = await stagingApi.get(`users/${UserID}/posts/${payload.id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", response.data);
    console.log("response.data", response.data)
  },

  async searchPostcode({ commit }, payload) {
    console.log(payload)
    const response = await stagingApi.post(`/postcode/search`,{
        "search" : {
          "value": payload,
        },
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      }
    });
    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("SearchCode", response.data);
    console.log("commited!!!")
  },

  async updateBook({ commit }, payload) {
    console.log(payload)
    const { id, ReadUserID, ...dataToUpdate } = payload;
    console.log(id)
    console.log(dataToUpdate)
    const response = await stagingApi.patch(`users/${ReadUserID}/posts/${id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response.status)

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/posts/${id}`);

    commit("updateResource", { ...response.data});
    console.log("commited!!!", response)
  },
  async deleteBook({ commit }, payload) {
    const { id, ReadUserID } = payload;
    console.log(payload)
    const response = await stagingApi.delete(`/posts/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteResource", { ...response.data });
  },
};
