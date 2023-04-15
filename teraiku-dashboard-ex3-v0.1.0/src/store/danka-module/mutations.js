export default {
  createResource(state, payload) {
    console.log(payload);
    state.families.data.push(payload);
  },

  ReadResources(state, payload) {
    state.families = payload;
  },

  ReadRepresentative(state, payload) {
    state.RepresentativeData = payload;
  },

  ReadDankaResources(state, payload) {
    state.DankaData = payload;
  },

  SearchResources(state, payload) {
    state.DankaData = payload;
  },

  updateResource(state, payload) {
    console.log(payload.data)
    console.log(state.families)
    state.families.data = state.families.data.map((family) =>
      payload.data.id === family.id ? { ...family, ...payload.data } : family
    );
  },
  deleteResource(state, payload) {
    console.log(state);
    state.families.data = state.families.data.filter((family) => family.id !== payload.id);
  },
  ReadResourcesProfile(state, payload) {
    console.log(state);
    state.families = payaload;
  },

  setFilterQuery(state, payload) {
    state.payload = { ...payload };
  }
};
