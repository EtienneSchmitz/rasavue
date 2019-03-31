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
  </div>
</template>

<script>
import FormLang from "@/components/FormLang.vue";
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
