<template>
    <div class="login-container">
        <el-form class="login-form"
          :show-message="false"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left">
            <!-- <img src="@/assets/logo.png"> -->
            <h1>Административная панель</h1>
            <div class="user-form">
                <el-form-item prop="username">
                    <el-input type="text" v-model="loginForm.username" autoComplete="on"
                              placeholder="Логин"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" autoComplete="on" @keyup.enter.native="handleLogin"
                              v-model="loginForm.password"
                              placeholder="Пароль"></el-input>
                </el-form-item>
            </div>

            <el-button type="primary" class="login-form__button" :loading="loading"
                       @click.native.prevent="handleLogin"
            >
                Войти
            </el-button>
            <el-row :gutter="20">
                <span style="color: #fff;">v{{ version }}</span>
            </el-row>
        </el-form>

    </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      version: process.env.VUE_APP_APP_VERSION
    }
  },
  props: {
    loginRules: {
      type: Object,
      required: true
    },
    loading: Boolean
  },
  methods: {
    /*
    ** Метод, который эмитит событие логина на родительском контейнере
    */
    handleLogin () {
      this.$emit('submit', { ...this.loginForm })
    }
  }
}
</script>

<style scoped>
    .user-form {
      margin-top: 20px  ;
    }
    img {
      max-width: 80%;
    }
</style>
