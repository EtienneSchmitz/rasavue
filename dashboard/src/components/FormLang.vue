<template>
  <v-flex>
    <v-text-field
      v-model="name"
      label="Nom de la langue"
      required
    ></v-text-field>
    <v-text-field v-model="url" label="Url de l'image" required></v-text-field>
    <v-layout row>
      <v-btn color="blue" @click="submit">
        Ajouter la langue
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red" @click="cancel">
        Retour
      </v-btn>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: "FormLang",
  props: {
    p_name: String,
    p_url: String
  },
  data() {
    return {
      name: this.p_name,
      url: this.p_url
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submit() {
      this.$emit("submit", this.name, this.url);
    }
  }
};
</script>

<style scoped></style>
