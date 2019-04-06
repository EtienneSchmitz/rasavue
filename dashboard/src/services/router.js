import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "lang",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "lang" */ "../views/lang/Lang.vue")
    },
    {
      path: "/lang/:slug",
      name: "categories",
      component: () =>
        import(/* webpackChunkName: "category" */ "../views/lang/Categories.vue")
    },
    {
      path: "/lang/:slug_lang/:slug_category/intents",
      name: "category",
      component: () =>
        import(/* webpackChunkName: "category" */ "../views/intents/Intents.vue")
    },
    {
      path: "/lang/:slug_lang/:slug_category/entity",
      name: "entity",
      component: () =>
          import(/* webpackChunkName: "category" */ "../views/intents/EntityHome.vue")
    },

  ]
});
