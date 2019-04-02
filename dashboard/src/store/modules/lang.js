import _ from "lodash";

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
    },
    get_categories_by_slug(state) {
      return slug => {
        let lang = _.find(state.langs, _.matches({ slug: slug }));
        if (lang) {
          return lang.categories;
        }
        return undefined;
      };
    },
    get_lang_by_slug(state) {
      return slug => {
        console.log(slug);
        let lang = _.find(state.langs, _.matches({ slug: slug }));
        console.log(lang);
        if (lang) {
          return lang._id;
        }
        return undefined;
      };
    }
  }
};
