<template>
  <div>
    <v-layout row>
      <v-dialog v-model="dialog" width="500">
        <v-btn color="blue" class="text-none" slot="activator" round>
          Ajouter une catégorie
        </v-btn>
        <v-card>
          <v-card-title class="lighten-3" primary-title>
            Ajouter une catégorie
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <FormCategory @cancel="dialog = false" @submit="add" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-container>
    <v-layout row wrap text-xs-left fill-height>
      <v-flex xs3 pa-2 mb-3 v-for="category in categories" :key="category._id">
        <router-link :to="{ name: 'category', params: { slug_lang: $route.params.slug, slug_category: category.slug } }">
        <v-card v-ripple height="100%">
            <v-card-title>
              <div>
                <h3 class="headline">
                 {{ category.name | capitalize }}
                </h3>
              </div>
            </v-card-title>
            <v-card-text text-xs-left>
              {{ category.description }}
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormCategory from "../../components/FormCategory.vue";

export default {
  name: "Lang",
  components: {
    FormCategory
  },
  data() {
    return {
      dialog: false
    };
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    ...mapGetters({
      getCategoriesBySlug: "lang/get_categories_by_slug",
      getLangBySlug: "lang/get_lang_by_slug"
    }),
    categories() {
      return this.getCategoriesBySlug(this.$route.params.slug); // logs "hello"
    }
  },
  methods : {
    add(name, description) {
      this.dialog = false;
      let lang_id = this.getLangBySlug(this.$route.params.slug);
      console.log(lang_id);
      if (lang_id) {
        this.$socket.emit("add category", lang_id, {
          name,
          description
        });
        console.log("test");
        // TODO : Add an information if it is pushed successfully ?
        this.$options.sockets.success = data => {
          console.log(data);
          delete this.$options.sockets.success;
        };
      }
    }
  }
};
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
