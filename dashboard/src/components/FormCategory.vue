<template>
  <v-flex>
    <v-text-field
      v-model="name"
      label="Nom de la catégorie"
      required
    ></v-text-field>
    <v-textarea v-model="description" label="Description" required></v-textarea>
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
    p_description: String
  },
  data() {
    return {
      name: this.p_name,
      description: this.p_description
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submit() {
      this.$emit("submit", this.name, this.description);
      this.name="";
      this.description= "";
    }
  }
};
</script>

<style scoped></style>
