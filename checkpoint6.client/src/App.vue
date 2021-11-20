<template>
  <header></header>
  <main class="d-flex background">
    <div class="col-md-11">
      <router-view />
    </div>
    <div class="col-md-1">
      <Navigation />
    </div>
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
.background {
  background-color: #2a2d3a;
}
p {
  font-family: "Nunito", sans-serif;
}
</style>
