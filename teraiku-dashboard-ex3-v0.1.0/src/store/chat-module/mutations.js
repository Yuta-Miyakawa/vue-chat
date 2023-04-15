export default {
  createResource(state, payload) {
    state.books.push(payload.message);
    console.log(state.books);
  },
  ReadResources(state, payload) {
    state.books = payload;
    console.log(state.books);
  },
  SearchResources(state, payload) {
    state.books = payload;
  },
  updateResource(state, payload) {
    state.books.data = state.books.data.map((book) =>
      payload.id === book.id ? { ...book, ...payload } : book
    );
  },
  deleteResource(state, payload) {
    console.log(state);
    state.books.data = state.books.data.filter((book) => book.id !== payload.id);
  },
  MigrationResource(state, payload) {
    console.log(payload.payload)
    state.contact = payload.payload
  }
};
