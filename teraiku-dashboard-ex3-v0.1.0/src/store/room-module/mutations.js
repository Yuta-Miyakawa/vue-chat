export default {
  createRoomResource(state, payload) {
    console.log(payload)
    // state.rooms = payload;
    // console.log(state.rooms);
  },
  ReadResources(state, payload) {
    state.rooms = payload;
    console.log(state.rooms);
  },
  SearchResources(state, payload) {
    state.rooms = payload;
  },
  updateResource(state, payload) {
    state.rooms.data = state.rooms.data.map((book) =>
      payload.id === book.id ? { ...book, ...payload } : book
    );
  },
  deleteResource(state, payload) {
    console.log(state);
    state.rooms.data = state.rooms.data.filter((book) => book.id !== payload.id);

  },
};
