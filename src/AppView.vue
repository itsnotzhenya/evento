<template>
  <div>
    <el-container height="100%" width="500">
      <el-aside class="aside">
        <menu-container/>
      </el-aside>
      <el-container class="flex-container">
        <top-bar-view>
            <avatar-view
              slot="right-menu"
              :userInfo="userInfo"
              @command="onCommand"/>
        </top-bar-view>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuContainer from '@/components/Menu/container'
import TopBarView from '@/components/TopBar/view'
import AvatarView from '@/components/Menu/avatar-view'

export default {
  name: 'AppView',
  components: {
    MenuContainer,
    TopBarView,
    AvatarView
  },
  computed: {
    userInfo () {
      return this.$store.getters['users/userInfo']
    }
  },
  methods: {
    /**
     * @param {string} command - команда, пришешдная из дочернего компонента
     */
    onCommand (command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
      }
    },
    /**
     * Метод, вызывающий экшен логаута и перекидывающий на страницу авторизации
     */
    async logout () {
      await this.$store.dispatch('users/LogOut')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  .aside::-webkit-scrollbar {
    display: none;
    height: 100vh;
  }

  .flex-container {
    flex-direction: column !important;
  }
</style>
