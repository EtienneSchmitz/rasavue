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
            <FormLang @cancel="dialog = false" @submit="add" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-container>
      <v-layout row wrap space-between justify-space-between>
        <v-flex xs12 md6 wrap v-for="lang in langs" :key="lang._id" pa-2>
          <v-card v-ripple>
            <v-img src="https://via.placeholder.com/775x250.png" />
            <v-card-title>
              <div>
                <h3 class="headline">
                  {{ lang.name }}
                </h3>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormLang from "@/components/FormLang.vue";
import { mapGetters } from "vuex";
export default {
  name: "Lang",
  components: {
    FormLang
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters({
      langs: "lang/get_langs"
    })
  },
  methods: {
    add(name, url) {
      this.$socket.emit("add lang", {
        name,
        url
      });
      this.dialog = false;
      // TODO : Add an information if it is pushed successfully ?
      this.$options.sockets.success = data => {
        console.log(data);
        delete this.$options.sockets.success;
      };
    }
  }
};
</script>

<style scoped></style>
