<template>
  <div class="right-menu">
    <el-dropdown
        class="avatar-container right-menu-item"
        @command="handleDropdownCommand"
        trigger="click"
        v-if="userInfo">
        <div style="font-size: 18px;" class="avatar-wrapper">
            {{userInfo.firstName}}
        <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">
                <span>Выйти</span>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'AvatarView',
  props: {
    /**
     * @prop {object} Данные текущего пользователя
     */
    userInfo: Object
  },
  methods: {
    /**
     * Метод, обрабатывающий нажатие на элемент dropdown-меню
     * @param {string} command - команда, пришедшая из dropdorwn
     * @emit
     */
    handleDropdownCommand (command) {
      this.$emit('command', command)
    }
  }
}
</script>

<style lang="scss">
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
                color: #000;
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
</style>
