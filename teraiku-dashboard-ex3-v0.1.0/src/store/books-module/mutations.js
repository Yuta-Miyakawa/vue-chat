export default {
  createResource(state, payload) {
    console.log(state.books);
    console.log(payload);
    state.books.data.push(payload.data);
  },
  createTemplateResource(state, payload) {
    console.log(state.books);
    console.log(payload);
    state.TemplateList.push(payload.data);
  },

  ReadContactResources(state, payload) {
    state.ContactBooks = payload;
    console.log(state.ContactBooks)
  },

  ReadResources(state, payload) {
    state.books = [];
    console.log("//////////////////")
    state.books = payload;
    console.log(payload)
    let selectContact = [];
    for(let index=0; index<payload.data.length; index++){
      if(payload.data[index].uuid != payload.uuid){
        if(payload.data[index].type != `住職` && !payload.data[index].corporation){
          if(payload.data[index].type != `家族`){
            selectContact.push(payload.data[index]);
          }
        } 
      }
    }
    state.books.data = selectContact;
    console.log(state.books)
  },
  ReadProfile(state, payload) {
    state.profile = [];
    state.tenantProfile = [];
    console.log(payload.data);
    console.log(payload.data.length);
    if(payload.data.length > 0){
      for(let index=0; index<payload.data.length; index++){
        if(payload.data[index].is_user){
          if(payload.data[index].type != `住職`){
            state.profile.push(payload.data[index]);
          }else{
            state.tenantProfile.push(payload.data[index]);
          }
        } 
      }
    }
    console.log(state.profile)
  },
  ReadMyProfile(state, payload) {
    state.representative = [];
    state.representative = payload.data;
    console.log(state.representative)
  },
  ReadTemplateResource(state, payload) {
    state.TemplateList = [];
    state.TemplateList = payload.data;
  },
  ReadTaskTenantResources(state, payload) {
    state.dataTaskLists = [];
    state.dataTaskLists = payload.data;
  },
  ReadTenantResources(state, payload) {
    state.dataLists = [];
    state.dataLists = payload.data;
  },
  SearchResources(state, payload) {
    state.books = payload;
  },
  updateResource(state, payload) {
    console.log(payload)
    // state.profile = state.profile.map((book) =>
    //   payload.data.id === book.id ? { ...book, ...payload.data } : book
    // );
    // console.log(state.profile)
  },
  updateTenantResource(state, payload) {
    console.log(payload)
  },
  updateTemplateResource(state, payload) {
    console.log(payload)
  },
  deleteResource(state, payload) {
    console.log(state);
    // state.books.data = state.books.data.filter((book) => book.id !== payload.id);
  },
  deleteContactResource(state, payload) {
    console.log(state);
    // state.books.data = state.books.data.filter((book) => book.id !== payload.id);
  },
  deleteTemplateResource(state, payload) {
    console.log(payload)
  },
  ReadTenant(state, payload) {
    state.profile = [];
    console.log(payload.data);
    // console.log(payload.data.length);
    // if(payload.data.length > 0){
    //   for(let index=0; index<payload.data.length; index++){
    //       if(payload.data[index].representative == `代表者` || payload.data[index].type == `てらいく会員`){
    //         state.profile.push(payload.data[index]);
    //       } 
    //   }
    // }
    state.profile = payload.data;
    // console.log(state.profile)
  },
};
