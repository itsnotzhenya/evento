<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo header"
            background-color="#545c64"
            text-color="#fff"
            :mode="mode"
            >
        <div class="vertical">
          <slot name="vertical"></slot>
        </div>
        <el-menu-item :router="true"
                     :index="route.module"
                     :key="index"
                     v-show="!route.children"
                      v-for="(route, index) in items">
            <router-link class="menu-item" :to="{ path: `${route.path}`}">
                {{route.name}}
            </router-link>
        </el-menu-item>
        <el-submenu
                v-show="route.children"
                router
                :index="route.name"
                :key="`submenu_${index}`"
                v-for="(route, index) in items">
                <template slot="title">
                  <span class="menu-item">{{ route.name }}</span>
                </template>
                <el-menu-item
                    :index="route.module"
                    :key="`${subroute.name}`"
                    v-for="(subroute) in route.children">
                    <router-link v-if="!subroute.childGetter" class="menu-item" :to="{ path: subroute.path }">
                        {{ subroute.name }}
                    </router-link>
                    <dropdown-item v-else
                      :itemsGetter="subroute.childGetter"
                      :title="subroute.name"
                      :entity-name="subroute.entityName"/>
                </el-menu-item>
        </el-submenu>
        <slot name="horizontal"></slot>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import DropdownItem from './dropdown-item'

export default {
  name: 'HeaderComponent',
  components: {
    DropdownItem
  },
  data: () => ({
    activeIndex: '',
    headerItems: []
  }),
  props: {
    items: Array,
    mode: String
  },
  created () {
    this.activeIndex = this.$router.currentRoute.name ? this.$router.currentRoute.name.split('.')[0] : ''
    this.$router.beforeEach((to, from, next) => {
      if (to.name) {
        this.activeIndex = to.name.split('.')[0]
      }
      if (to.meta && to.meta.parentModule) {
        this.activeIndex = to.meta.parentModule
      }
      next()
    })
  },
  methods: {
    handleDropdownCommand (command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
      }
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss">
    a {
        text-decoration: none;
    }

    .vertical {
      margin-top: 20px;
    }

    .menu-item {
      color: #ffffff;
      font-size: 16px;
    }

    .header {
        .right-menu {
            float: right;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-direction: column;

            &:focus {
                outline: none;
            }
            .right-menu-item {
                // display: inline-block;
                margin: 0 8px;
            }
            .screenfull {
                height: 20px;
            }
            .international {
                vertical-align: top;
                .international-icon {
                    font-size: 20px;
                    cursor: pointer;
                    vertical-align: -5px;
                }
            }
            .theme-switch {
                vertical-align: 15px;
            }
            .avatar-container {
                margin-right: 30px;
                .avatar-wrapper {
                    cursor: pointer;
                    position: relative;
                    user-select: none;
                    outline: 0;
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .el-icon-caret-bottom {
                        position: absolute;
                        right: -15px;
                        top: 10px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
