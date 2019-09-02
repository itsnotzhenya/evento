<template>
  <div id="app">
    <app-view/>
  </div>
</template>

<style lang="scss" src="./assets/styles/index.scss"></style>

<style lang="scss">
#app {
  font-family: 'Roboto';
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

* {
  font-family: 'Roboto-Regular';
}
</style>

<script>
import menuItems from '@/helpers/menuItems'

import AppView from './AppView'

export default {
  components: {
    AppView
  },
  beforeMount () {
    this.$store.commit('menu/SET_MENU', { items: menuItems })
  }
}
</script>
