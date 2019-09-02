<template>
  <header-view style="height: 100%" mode="vertical" :items="items.items">
    <h1 class="title" slot="vertical">{{ title }}</h1>
  </header-view>
</template>

<script>
import HeaderView from './view'
import AvatarView from './avatar-view'

export default {
  name: 'MenuContainer',
  components: {
    HeaderView,
    AvatarView
  },
  computed: {
    /**
     * Возвращает элементы хедера
     */
    items () {
      return this.$store.getters['menu/items']
    },
    title () {
      return process.env.VUE_APP_APP_TITLE
    }
  }
}
</script>

<style>
  .title {
    text-transform: uppercase;
    font-size: 24px;
    color: #fff;
    font-family: 'PTBold';
  }
</style>
