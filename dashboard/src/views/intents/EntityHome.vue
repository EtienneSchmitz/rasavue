<template>
  <div>
    <v-text-field
      v-model="name"
      label="Nom de la catégorie"
      required
    ></v-text-field>
      <v-select
      :items="items"
      label="Type of entity"
      @change="changeType"
    ></v-select>
      <div v-if="type==='lookup'">
          <div v-for="tab in tabs" :key="tab.id">
              <v-text-field v-model="tab.value" :label='"Entrée du lookup " + (tab.id + 1) '>
              </v-text-field>
          </div>
          <v-btn @click="addTab">Ajouter une entrée</v-btn>
      </div>
      <div v-else-if="type==='regexp'">
          <v-text-field
                  v-model="regexp"
                  label="Expression rationnelle"
                  required
          ></v-text-field>
      </div>
      <div v-else-if="type==='synonym'">
          <div v-for="tab in tabs" :key="tab.id">
              <v-text-field v-model="tab.value" :label='"Entrée du synonyme " + (tab.id + 1) '>
              </v-text-field>
          </div>
          <v-btn @click="addTab">Ajouter une entrée</v-btn>
      </div>
      <v-btn @click="add">
          Ajout d'une entité
      </v-btn>
  </div>
</template>

<script>
export default {
  name: "entity",
  data() {
    return {
      type: "",
      name: "",
        regexp: "",
        tabs: [{
          id: 0,
            value: ""
        }],

      items: ["lookup", "regexp", "synonym", "simple"]
    };
  },
  methods: {
      add() {
          console.log(this.name);
          console.log(this.type);

          console.log(this.tabs);
      },
      changeType(value) {
          this.type = value;
      },
      addTab() {
          this.tabs.push({
              id : this.tabs.length,
              value: ""
          })
      }
  }
};
</script>

<style scoped></style>
