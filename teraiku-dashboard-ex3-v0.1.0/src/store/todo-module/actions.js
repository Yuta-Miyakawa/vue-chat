import { api, stagingApi } from "src/boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async addTasks({ commit }, payload) {
      // console.log(payload);

      // commit("createResource", payload);
    console.log(payload);
    const response = await stagingApi.post("/task/", payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 201) {
      console.log(err)
      throw new Error("データの読み込み中にエラーが発生しました");
    }

    commit("createResource", { ...response.data.data });
    console.log(response.data.data);
  },

  async readTasks({ commit }, payload) {
    const response = await stagingApi.get("/task/", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response.data)
    // if (response.status !== 200) {
    //   console.log(err)
    //   throw new Error("データの読み込み中にエラーが発生しました");
    // }

    commit("ReadResources", { ...response.data, TenantID: payload.data });
  },
  async updateTask({ commit }, payload) {
    console.log(payload)
    const { id, ...dataToUpdate } = payload;
    console.log(id)
    console.log(payload.items)
    const response = await stagingApi.patch(`/task/${id}`, dataToUpdate, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    // const {
    //   data: { name },
    // } = await stagingApi.get(`/tasks/${id}`);
    commit("updateResource", { ...payload.items });
    console.log("commitしました",payload)
  },
  async moveTask({ commit }, payload) {

    console.log(payload)
    const response = await stagingApi.get("/task/", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    // // console.log(payload.items)
    // const { id,taskid, ...dataToUpdate } = payload;
    // console.log("idです",id)
    // console.log("taskidです",taskid)
    // console.log("dataToUpdateです",dataToUpdate)
    // const response = await stagingApi.patch(`/task/${taskid}`, dataToUpdate);
    // console.log("response.data",response.data)

    // if (response.status !== 200) {
    //   throw new Error("データの更新中にエラーが発生しました");
    // }
    

    commit("moveResource", { ...payload });
    commit("ReadResources", { ...response.data, TenantID: payload.data });
    console.log("commitしました",payload)

  },

  async deleteTask({ commit }, payload) {
    const { id } = payload;
    console.log(id)
    console.log(payload)
    const response = await stagingApi.delete(`/task/${id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });
    console.log(response)

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }

    commit("deleteResource", { id });
  },
  async searchTask({ commit }, payload) {

    const response = await stagingApi.post(`/task/search`,{
      "search" : {
        "value": payload,
      }
    }, {
      headers: {
        Authorization: getTokenFromStorage(),
      }
    });

    if (response.status !== 200) {
      throw new Error("データの更新中にエラーが発生しました");
    }
    console.log("commited!!!")
    console.log(response.data)
    commit("SearchTodo", {...response});
  },
};
