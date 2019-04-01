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
    <v-layout row wrap text-xs-left>
      <v-flex xs3 mx-3>
        <v-card>
          <v-card-title>
            <div>
              <h3 class="headline">
                Test
              </h3>
            </div>
          </v-card-title>
          <v-card-text text-xs-left>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            vitae, necessitatibus sapiente nam doloremque minus, dicta aliquid
            magnam eius ipsa quaerat eveniet, enim aspernatur autem quas labore
            deleniti modi minima.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 mx-3>
        <v-card>
          <v-card-title>
            <h3 class="headline">
              Test 2
            </h3>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            vitae, necessitatibus sapiente nam doloremque minus, dicta aliquid
            magnam eius ipsa quaerat eveniet, enim aspernatur autem quas labore
            deleniti modi minima.
          </v-card-text>
        </v-card>
      </v-flex>
      <h1>{{ categories }}</h1>
    </v-layout>
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

<style scoped></style>
