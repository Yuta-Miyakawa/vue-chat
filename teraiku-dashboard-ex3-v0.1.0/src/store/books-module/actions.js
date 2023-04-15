import { stagingApi } from "src/boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  
  async createBook({ commit }, payload) {
    console.log(payload)
    const { id, ...dataToUpdate } = payload;
    const response = await stagingApi.post(`/tenants/${id}/profiles`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 201) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("createResource", { ...response.data });
    console.log("commited!!!",response.data)
  },

  async createTemplate({ commit }, payload) {
    console.log(payload)
    const { id, ...dataToUpdate } = payload;
    const response = await stagingApi.post(`/tenants/${id}/announcetemplates`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 201) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("createTemplateResource", { ...response.data });
    console.log("commited!!!",response.data)
  },

  async readContactList({ commit }, payload) {
    console.log(payload.tenantmaster_id)    
    const response = await stagingApi.post(`tenants/search`, {
      "filters" : [
        {"field": "tenantmaster_id", "operator": "=", "value": payload.tenantmaster_id },
        {"field" : "user_id", "operator" : "=", "value" : "106"}
      ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadContactResources", response.data);
  },

  async readBooks({ commit }, payload) {
    const TenantID = payload.TenantID
    const pageID = payload.page
    // console.log("UserID", UserID)
    // const response = await stagingApi.get(`/tenants/4/profiles?page=${pageID}`, {
    //   headers: {
    //     Authorization: getTokenFromStorage(),
    //   },
    // });
    const response = await stagingApi.post(`/tenants/${TenantID}/profiles/search?page=${pageID}`, {
      "filters" : [
         { "field": "is_alive", "operator": "=", "value": true },
      ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    // console.log(response)
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", { ...response.data, uuid: payload.uuid });
    console.log("commited",response.data)
  },

  async readTaskTenant({ commit }, payload) {
    console.log(payload.tenantmaster_id)
    const response = await stagingApi.post(`/users/${payload.user_id}/tenants/search`, {
      "filters" : [
        {"field": "tenantmaster_id", "operator": "=", "value": payload.tenantmaster_id },
        {"field" : "status", "operator" : "=", "value" : payload.status}
      ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }
    console.log(response)

    commit("ReadTaskTenantResources", response.data);
  },

  async readProfile({ commit }, payload) {
    console.log("OKOKOK")
    console.log(payload.id)
    const response = await stagingApi.get(`/users/${payload.id}/profiles`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadProfile", response.data);
    console.log("commited", response.data)
  },

  async readMyProfile({ commit }, payload) {
    const response = await stagingApi.post(`/users/${payload.id}/profiles/search`, {
      "filters" : [ 
        {"field": "uuid", "operator": "=", "value": payload.uuid }
      ]
     }, {headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadMyProfile", response.data);
    console.log("commited", response.data)
  },

  async readTemplate({ commit }, payload) {
    console.log(payload)
    const TenantID = payload.TenantID
    // const pageID = payload.page
    const response = await stagingApi.post(`/tenants/${TenantID}/announcetemplates/search`, {
      "sort" : [
        {"field" : "updated_at", "direction" : "desc"}
      ],
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadTemplateResource", { ...response.data });
    console.log("commited!!!",response.data)
  },

  async readTenant({ commit }, payload) {
    console.log(payload.tenantmaster_id)
    console.log(payload.type)
    let response = []
    if (payload.type != 'ご関係者'){
      response = await stagingApi.post(`tenants/search`, {
        "filters" : [
          {"field": "tenantmaster_id", "operator": "=", "value": payload.tenantmaster_id },
          {"field" : "type", "operator" : "=", "value" : payload.type},
          {"field" : "type", "operator" : "!=", "value" : "住職"}
        ],
      }, {
        headers: {
          Authorization: getTokenFromStorage(),
        },
      });
    } else{
      response = await stagingApi.post(`tenants/search`, {
        "filters" : [
          {"field": "tenantmaster_id", "operator": "=", "value": payload.tenantmaster_id },
          {"field" : "type", "operator" : "!=", "value" : "住職"}
        ],
      }, {
        headers: {
          Authorization: getTokenFromStorage(),
        },
      });
    }
    console.log(response)

    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }
    console.log(response)

    commit("ReadTenantResources", response.data);
  }, 

  async searchBooks({ commit }, payload) {
    const pageID = payload.page
    const UserID = payload.ReadUserID
    const TenantID = payload.TenantID
    console.log("pageID", pageID)
    console.log("payload.last_name",payload.last_name)
    console.log("payload.first_name",payload.first_name)
    console.log("payload.type",payload.type)
    let response = []
    if(payload.type){
      if(payload.last_name){
        console.log("all ok")
        response = await stagingApi.post(`/tenants/${TenantID}/profiles/search?page=${pageID}`, {
          "filters" : [
            { "field": "last_name","operator": "=","value": payload.last_name },
            { "field": "type","operator": "=","value": payload.type },
          ]
        }, {
          headers: {
            Authorization: getTokenFromStorage(),
          }
        });
      }
      else{
        console.log("payload.type OK")
        response = await stagingApi.post(`/tenants/${TenantID}/profiles/search?page=${pageID}`, {
          "filters" : [
            { "field": "type","operator": "=","value": payload.type },
          ]
        }, {
          headers: {
            Authorization: getTokenFromStorage(),
          }
        });
      }
    }
    else{
      console.log("payload.last_name ok")
      response = await stagingApi.post(`/tenants/${TenantID}/profiles/search?page=${pageID}`, {
        "filters" : [
          { "field": "last_name","operator": "=","value": payload.last_name },
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

  async updateTaskTenant({ commit }, payload) {
    const { user_id, tenant_id, ...dataToUpdate } = payload;
    console.log(payload)
    const response = await stagingApi.patch(`/users/${user_id}/tenants/${tenant_id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/contactbooks/${id}`);
    commit("updateTenantResource", { ...response.data });
  },

  async updateBook({ commit }, payload) {
    const { TenantID, id, ...dataToUpdate } = payload;
    console.log(payload)
    const response = await stagingApi.patch(`/tenants/${TenantID}/profiles/${id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("updateResource", { ...response.data });
  },

  async updateProfile({ commit }, payload) {
    console.log(payload);
    const { id1,id2, ...dataToUpdate } = payload;
    const response = await stagingApi.patch(`/users/${id1}/profiles/${id2}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }
    // const {
    //   data: { name },
    // } = await stagingApi.get(`/contactbooks/${id}`);
    commit("updateTemplateResource", { ...response.data });
  },

  async updateTemplate({ commit }, payload) {
    const { TenantID, id, ...dataToUpdate } = payload;
    console.log(payload)
    const response = await stagingApi.patch(`/tenants/${TenantID}/announcetemplates/${id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/contactbooks/${id}`);
    commit("updateTemplateResource", { ...response.data });
  },
  
  async deleteBook({ commit }, payload) {
    const id = payload.id;
    const TenantID = payload.TenantID;
    console.log(id)
    console.log(TenantID)
    const response = await stagingApi.delete(`/tenants/${TenantID}/profiles/detach`, {
      "resources" : [id]
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if(response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteResource", { id });
  },

  async deleteContactBook({ commit }, payload) {
    const id = payload.id;
    const TenantID = payload.TenantID;
    console.log(id)
    console.log(TenantID)
    const response = await stagingApi.delete(`/tenants/${TenantID}/profiles/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if(response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteContactResource", { id });
  },

  async deleteTemplate({ commit }, payload) {
    const { TenantID,id } = payload;
    console.log(payload)
    const response = await stagingApi.delete(`/tenants/${TenantID}/announcetemplates/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteTemplateResource", { id });
  },

  async attachProfile({ commit }, payload) {
    console.log(payload)
    const response = await stagingApi.post(`/tenants/${payload.tenant_id}/profiles/attach`, {
      "resources": [payload.profile_id]
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    // commit("ReadProfile", response.data);
    console.log("commited", response.data)
  },



  async joiningDanka({ commit }, payload) {
    console.log(payload)
    const resourcesID = payload.resources
    console.log([resourcesID])
    const response = await stagingApi.post(`/tenants/${payload.TenantID}/profiles/attach`, {
      "resources": [resourcesID]
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }
    commit("updateResource", { ...response.data });
  },

  async searchTenants({ commit }, payload) {
    const response = await stagingApi.post(`/users/${payload}/profiles`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadTenant", response.data);
    console.log("commited", response.data)
  },
};
