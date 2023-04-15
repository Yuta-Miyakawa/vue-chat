import { stagingApi } from "src/boot/axios";
import { columnsForClients } from "src/composable/column-tables";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async createBook({ commit }, payload) {
    console.log(payload);
    const response = await stagingApi.post(`tenants/${payload.id}/profiles/attach`, {
        "resources" : [payload.resources]
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(payload);

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/members2/${id}`);

    commit("createResource", { ...response.data });
    console.log("commited!!!",response.data)
  },

  async readBooks({ commit }, payload) {
    const pageID = payload.page
    console.log("pageID", pageID)
    const response = await stagingApi.post(`tenants/${pageID}/profiles/search`, {
      "filters" : [
         { "field": "is_alive", "operator": "=", "value": false },
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
  },

  async searchBooks({ commit }, payload) {
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
            { "field": "is_alive", "operator": "=", "value": false },
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
            { "field": "is_alive", "operator": "=", "value": false },
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
          { "field": "is_alive", "operator": "=", "value": false },
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
    console.log(payload)
    const { id, ...dataToUpdate } = payload;
    console.log(id)
    console.log(dataToUpdate)
    const response = await stagingApi.patch(`/pastbook/${id}`, dataToUpdate, {
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
    // } = await stagingApi.get(`/pastbook/${id}`);

    commit("updateResource", { ...response.data, nombre_autor: name });
    console.log("commited!!!",response)
  },
  async deleteBook({ commit }, payload) {
    const { id } = payload;
    console.log(payload)
    const response = await stagingApi.delete(`/pastbook/${id}`, {
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
    const response = await stagingApi.get(`/pastbook/${id}`, {
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
