import { uploadFile } from '@/helpers/globalApi'

export default {
  data: () => ({
    loading: false
  }),
  methods: {
    async fileUploading (file, mediaType = 'image') {
      const [ type ] = file.type.split('/')
      if (type !== mediaType) { return this.$message.error('Неверный тип файла') }
      this.loading = true
      try {
        const { data } = await uploadFile(file)
        this.loading = false
        return data
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
