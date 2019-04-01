<template>
  <div>
    <v-layout row>
      <v-dialog v-model="dialog" width="500">
        <v-btn color="blue" class="text-none" slot="activator" round>
          Ajouter une langue
        </v-btn>
        <v-card>
          <v-card-title class="lighten-3" primary-title>
            Ajouter une langue
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <FormLang @cancel="dialog = false" @submit="add" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md5 wrap>
        <v-card v-for="lang in langs" :key="lang._id">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="4.0"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                {{ lang.name }}
              </h3>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="blue" round large>Go</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
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
