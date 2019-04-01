export default {
  namespaced: true,
  state: {
    langs: {}
  },
  mutations: {
    "SOCKET_GET LANG": (state, langs) => {
      state.langs = langs;
    }
  },
  getters: {
    get_langs(state) {
      return state.langs;
    }
  }
};
