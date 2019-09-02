<template>
  <header-view style="height: 100vh" mode="vertical" :items="items.items">
    <h1 class="title" slot="vertical">Рейтинг ЮФУ</h1>
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
