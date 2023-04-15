import { createFunctionExpression } from "@vue/compiler-core";
import { LocalStorage} from "quasar";
import { date } from "quasar";

export default {
  createResource(state, payload) {
    console.log("state length",state.items.todo.length)
    console.log(payload)
    console.log(payload.start_date)
    state.items.todo.push(payload)
    state.nextId++
  },

  ReadResources(state, payload) {
    const { TenantID, ...dataToUpdate } = payload;
    console.log(payload)
    const username = LocalStorage.getItem('userName');
    console.log(username)
    if(dataToUpdate){
      state.tasks = dataToUpdate;
    }
    const DATA = state.tasks.data;
    console.log("DATA",DATA)
    // state.items.todo = state.tasiks.filter((task) {
    //   return task.request_id === 1
    // })

    const templeID = TenantID;
    const taskDATA = [];
    let index  = 0;
    console.log(DATA.length)
    for (var i = 0; i < DATA.length; i++) {
      if (DATA[i].tenant_id == templeID) {
        // taskDATA[index] = DATA[i];
        taskDATA.push(DATA[i]);
        index++;
        console.log(DATA[i])
      }
    }
    console.log("taskDATA",taskDATA)
    state.tasks = taskDATA
    

    state.items.todo = [];
    state.items.inProgress = [];
    state.items.done = [];
    state.items.todoColor = [];
    state.items.inProgressColor = [];
    state.items.doneColor = [];
    state.items.todoStart = [];
    state.items.inProgressStart = [];
    state.items.doneStart = [];
    state.items.todoEnd = [];
    state.items.inProgressEnd = [];
    state.items.doneEnd = [];
    for (var i = 0; i < taskDATA.length; i++) {
      if (taskDATA[i].status === "todo") {
        state.items.todo.push(taskDATA[i]);
        state.items.todoStart.push(date.formatDate(taskDATA[i].start_date,'YYYY/MM/DD HH:mm'));
        state.items.todoEnd.push(date.formatDate(taskDATA[i].end_date, 'YYYY/MM/DD HH:mm'));
        if(taskDATA[i].request_id === 2){
          state.items.todoColor.push("#ff6347");
        } else if (taskDATA[i].request_id === 3){
          state.items.todoColor.push("#009cb8");
        }else{
          state.items.todoColor.push("#ffffff");
        }
      } else if (taskDATA[i].status === "inProgress") {
        state.items.inProgress.push(taskDATA[i]);
        state.items.inProgressStart.push(date.formatDate(taskDATA[i].start_date,'YYYY/MM/DD HH:mm'));
        state.items.inProgressEnd.push(date.formatDate(taskDATA[i].end_date, 'YYYY/MM/DD HH:mm'));
        if (taskDATA[i].request_id === 2) {
          state.items.inProgressColor.push("#ff6347");
        } else if (taskDATA[i].request_id === 3) {
          state.items.inProgressColor.push("#009cb8");
        } else {
          state.items.inProgressColor.push("#ffffff");
        }
      } else if (taskDATA[i].status === "done") {
        state.items.done.push(taskDATA[i]);
        state.items.doneStart.push(date.formatDate(taskDATA[i].start_date,'YYYY/MM/DD HH:mm'));
        state.items.doneEnd.push(date.formatDate(taskDATA[i].end_date, 'YYYY/MM/DD HH:mm'));
        if (taskDATA[i].request_id === 2) {
          state.items.doneColor.push("#ff6347");
        } else if (taskDATA[i].request_id === 3) {
          state.items.doneColor.push("#009cb8");
        } else {
          state.items.doneColor.push("#ffffff");
        }
      }
    }
    // console.log("doneStart",state.items.doneStart)
    // console.log("doneEnd",state.items.doneEnd)

  },
  updateResource(state, payload) {
    // console.log(payload)
    [state.items.todo, state.items.inProgress, state.items.done].forEach(array => {
      const idx = array.findIndex(i => i.id === payload.id)
      console.log("idx",idx)
      if (idx != -1) {
        if(!payload.items) {
          array.splice(idx, 1, payload)
        } else {
          array.splice(idx, 1, payload.items)
        }
      }
    })

  },
  deleteResource(state, payload) {
    console.log("state");
    console.log(payload);
    [state.items.todo, state.items.inProgress, state.items.done].forEach(array => {
      const idx = array.findIndex(i => i.id === payload.id)
      console.log(idx)
      if (idx > -1) array.splice(idx, 1)
    })
  },

  moveResource(state, payload) {
    const id = payload.id
    state.items[id] = payload.items
  },

  SearchTodo(state, payload) {
    const DATA = payload.data;
    console.log(DATA.data)
    // state.items.todo = state.tasiks.filter((task) {
    //   return task.request_id === 1
    // })
    const taskDATA = DATA.data
    

    state.Searchitems.todo = [];
    state.Searchitems.inProgress = [];
    state.Searchitems.done = [];
    for (var i = 0; i < taskDATA.length; i++) {
      if (taskDATA[i].status === "todo") {
        state.Searchitems.todo.push(taskDATA[i]);
      } else if (taskDATA[i].status === "inProgress") {
        state.Searchitems.inProgress.push(taskDATA[i]);
      } else if (taskDATA[i].status === "done") {
        state.Searchitems.done.push(taskDATA[i]);
      }
    }
    console.log(state.Searchitems)  
  },
};


