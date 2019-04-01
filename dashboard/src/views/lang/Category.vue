<template>
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
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Lang",
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
