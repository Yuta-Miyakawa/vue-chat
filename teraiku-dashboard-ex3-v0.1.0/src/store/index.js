import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'
import generalModule from "./general-module";
import authModule from "./auth-module";
import booksModule from "./books-module";
import chatModule from "./chat-module";
import todoModule from "./todo-module";
import profileModule from "./profile-module";
import dankaModule from "./danka-module";
import currentModule from "./current-module";
import pastModule from "./past-module";
import anniversaryModule from "./anniversary-module"
import dateofdeathModule from "./dateofdeath-module"
import contactsModule from "./contacts-module";
import celebrationModule from "./celebration-module";
import roomModule from "./room-module";
import imageModule from "./image-module";
//import productsModule from "./prodcts-module";


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    // plugins: [ ],
    modules: {
      // example
      generalModule,
      authModule,
      booksModule,
      chatModule,
      todoModule,
      profileModule,
      dankaModule,
      currentModule,
      pastModule,
      anniversaryModule,
      dateofdeathModule,
      contactsModule,
      celebrationModule,
      roomModule,
      imageModule,
//      productsModule,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
