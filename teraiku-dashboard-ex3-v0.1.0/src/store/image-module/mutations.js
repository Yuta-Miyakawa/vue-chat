import { createFunctionExpression } from "@vue/compiler-core";
import { LocalStorage} from "quasar";

export default {
  createResource(state, payload) {
    // console.log("state length",state.items.todo.length)
    state.image = [];
    console.log(payload.path)
    state.images = payload.path
    console.log(state.images)
  },

};


