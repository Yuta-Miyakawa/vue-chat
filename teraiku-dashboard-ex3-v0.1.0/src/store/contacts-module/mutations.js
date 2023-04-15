export default {
    createResource(state, payload) {
      console.log(payload);
      console.log(state.Contacts)
      state.Contacts.push(payload.data);
    },
    ReadResources(state, payload) {
  
      state.Contacts = payload.data;
    },
    updateResource(state, payload) {
      // state.Contacts.data = state.Contacts.data.map((contact) =>
      //   payload.id === contact.id ? { ...contact, ...payload } : contact
      // );
      console.log(state);
      console.log(payload)
    },
    SearchCode(state, payload) {
      state.Postcodes = payload.data;
    },
    deleteResource(state, payload) {
      console.log(state);
      console.log(payload)
      // state.Contacts.data = state.Contacts.data.filter((contact) => contact.id !== payload.id);
    },
  };
  