import { stagingApi } from "src/boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async createBook({ commit }, payload) {
    console.log(payload);
    const response = await stagingApi.post("/tenants/1/groups/", payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response.status)

    if (response.status !== 201) {

      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/check/groupsily/${id}`);

    commit("createResource", { ...response.data });
  },

  async readBooks({ commit }, payload) {
    const UserID = payload.ReadID
    console.log(UserID)
    const response = await stagingApi.get(`/profiles/${UserID}/users`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", response.data);
    console.log("commited!!!",response.data)
  },

  async readRepresentative({ commit }, payload) {
    const UserID = payload.ReadID
    const response = await stagingApi.get(`/profiles/${UserID}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadRepresentative", response.data);
    console.log("commited!!!",response.data)
  },

  async readDanka({ commit }, payload) {
    const response = await stagingApi.post(`/tenants/${payload.TenantID}/profiles/search`, {
      "filters" : [
         { "field": "type", "operator": "=", "value": "檀家" },
         {"field" : "representative", "operator" : "=", "value" : "代表者"}
      ],
      // "sort": [
      //   { "field": "created_at", "direction": "desc" }
      // ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }
    console.log(response)

    commit("ReadDankaResources", response.data);
  }, 

  async searchBooksDanka({ commit }, payload) {
    const pageID = payload.page
    const UserID = payload.ReadUserID
    const TenantID = payload.TenantID
    console.log("pageID", pageID)
    console.log("payload.last_name", payload.last_name)
    console.log("payload.first_name", payload.first_name)
    console.log("payload.type", payload.type)
    let response = []
    if (payload.type) {
      if (payload.last_name) {
        console.log("all ok")
        response = await stagingApi.post(`/tenants/${TenantID}/profiles/search?page=${pageID}`, {
          "filters": [
            { "field": "last_name", "operator": "=", "value": payload.last_name },
            { "field": "type", "operator": "=", "value": payload.type },
            { "field": "type", "operator": "=", "value": "檀家" },
            { "field": "representative", "operator": "=", "value": "代表者" }
          ]
        }, {
          headers: {
            Authorization: getTokenFromStorage(),
          }
        });
      }
      else {
        console.log("payload.type OK")
        response = await stagingApi.post(`/tenants/${TenantID}/profiles/search?page=${pageID}`, {
          "filters": [
            { "field": "type", "operator": "=", "value": payload.type },
            { "field": "type", "operator": "=", "value": "檀家" },
            { "field": "representative", "operator": "=", "value": "代表者" }
          ]
        }, {
          headers: {
            Authorization: getTokenFromStorage(),
          }
        });
      }
    }
    else {
      console.log("payload.last_name ok")
      response = await stagingApi.post(`/tenants/${TenantID}/profiles/search?page=${pageID}`, {
        "filters": [
          { "field": "last_name", "operator": "=", "value": payload.last_name },
          { "field": "type", "operator": "=", "value": "檀家" },
          { "field": "representative", "operator": "=", "value": "代表者" }
        ]
      }, {
        headers: {
          Authorization: getTokenFromStorage(),
        }
      });
    }


    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("SearchResources", response.data);
    console.log("commited!!!")
    console.log(response.data)
  },


  async updateBook({ commit }, payload) {
    const { id, ...dataToUpdate } = payload;
    console.log(payload)
    const response = await stagingApi.patch(`/groups/${id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/groups/${id}`);
    commit("updateResource", { ...response.data });
  },
  
  async deleteBook({ commit }, payload) {
    const { id } = payload;
    console.log(payload)
    const response = await stagingApi.delete(`/groups/${id}`, {
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
    const response = await stagingApi.get(`/groups/${id}`, {
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
