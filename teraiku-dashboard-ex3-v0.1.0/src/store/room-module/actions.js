import { stagingApi } from "src/boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async createRoom({ commit }, payload) {
    // const { id, ...dataToUpdate } = payload;
    console.log(payload)
    const response = await stagingApi.post(`rooms/`, payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    // console.log(response);

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("createRoomResource", response);
    console.log("commited!!!")
  },

  async createRoomUser({ commit }, payload) {
    const { room_id, user_id } = payload;
    console.log(room_id, user_id)
    const response = await stagingApi.post(`rooms/${room_id}/${user_id}/invite`, payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response);

    if (response.status !== 200) {
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    // commit("createResource", { ...response.data });
    console.log("commited!!!")
  },

  async readRooms({ commit }, payload) {
    console.log(payload)
    const response = await stagingApi.get(`rooms`, payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    
    if (response.status !== 200) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("ReadResources", response);
    console.log("commited",response)
  },

  async searchRoom({ commit }, payload) {
    const pageID = payload.page
    const UserID = payload.ReadUserID
    console.log("pageID", pageID)
    console.log("payload.last_name",payload.last_name)
    console.log("payload.first_name",payload.first_name)
    console.log("payload.type",payload.type)
    let response = []
    if(payload.type){
      if(payload.last_name){
        console.log("all ok")
        response = await stagingApi.post(`users/${UserID}/contactbooks/search?page=${pageID}`, {
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
        response = await stagingApi.post(`users/${UserID}/contactbooks/search?page=${pageID}`, {
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
      response = await stagingApi.post(`users/${UserID}/contactbooks/search?page=${pageID}`, {
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

  async updateRoom({ commit }, payload) {
    const { id, ...dataToUpdate } = payload;
    console.log(payload)
    const response = await stagingApi.patch(`/contactbooks/${id}`, dataToUpdate, {
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
    commit("updateResource", { ...response.data });
  },
  async deleteRoom({ commit }, payload) {
    const { id } = payload;
    console.log(payload)
    const response = await stagingApi.delete(`/contactbooks/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteResource", { id });
  },
};
