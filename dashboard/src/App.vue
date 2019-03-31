<template>
  <div id="app" data-app>
    <v-container fluid>
      <!--  TODO: NAV --->
      <router-view />
    </v-container>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$socket.emit("test");
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
