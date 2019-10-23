<template>
  <div>
    <login-form
      @submit="onSubmit"
      :loading="loading"
      :login-rules="loginRules"/>
  </div>
</template>

<script>
import LoginForm from './form'

export default {
  name: 'LoginContainer',
  components: {
    LoginForm
  },
  data: () => ({
    loginRules: {
      username: [{ required: true, trigger: 'blur' }],
      password: [{ required: true, trigger: 'blur' }]
    },
    loading: false
  }),
  methods: {
    /**
     * Метод, который обрабатывает сабмит формы авторизации и вызывает экшен логин
		 * @param formData {object} - объект, содержащий логин и пароль
		 */
    async onSubmit (formData) {
      this.loading = true
      try {
        await this.$store.dispatch('users/LoginByUsername', { ...formData })
        this.$router.push('/')
      } catch(e) {
        console.log(e)
      } 
      finally {
        this.loading = false
      }
    }
  }
}
</script>
