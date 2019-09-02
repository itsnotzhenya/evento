import request from '@/helpers/request'

export default {
  data: () => ({
    mainObjectName: '',
    entityName: '',
    subEntities: [],
    loading: false,
    id: null
  }),
  async beforeMount () {
    this.loading = true
    await this.getItem()
    this.afterGet()
    this.subEntities.map(async (subEntity) => {
      const response = await request({
        url: `/${subEntity}`,
        method: 'get'
      })
      this[subEntity] = response.data.items
    })
    this.loading = false
  },
  computed: {
    /**
     * Получение действия, выполняемого над сущностью, исходя из роута
     */
    action () {
      return this.$route.meta.action
    },
    /**
     * API-метод для сохранения entity
     */
    saveMethod () {
      return this.action === 'edit' ? 'put' : 'post'
    }
  },
  methods: {
    async getItem () {
      const { id } = this.$route.params
      this.id = +id
      if (id) {
        const response = await this.$store.dispatch('app/getItem', { id, entityName: this.entityName })
        this[this.mainObjectName] = response.data
      }
      this.loading = false
    },
    async save (data) {
      try {
        this.loading = true
        await this.$store.dispatch('app/saveEntity', {
          id: this.id,
          method: this.saveMethod,
          entityName: this.entityName,
          data
        })
        this.$router.push(`/${this.entityName}`)
        this.$message.success('Успешно сохранено')
        return true
      } catch (error) {
        this.$message.error(error.response.data.detail)
        return false
      } finally {
        this.loading = false
      }
    }
  }
}
