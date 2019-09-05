<template>
  <base-crud
    v-loading="loading"
    :module="`Question`"
    :action="action"
    create
    edit
    :id="id"
    @save="saveQuestion">
    <template slot="crud-title">
      Вопрос
    </template>
    <template slot="crud-content">
      <!-- TODO: Форму вынести в компонент -->
      <el-form
        :disabled="action === 'read'"
        ref="form"
        label-position="top"
        :model="question"
        :show-message="false">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item required prop="name" label="Текст вопроса">
              <el-input resize="none" type="textarea" :autosize="{ minRows: 10 }" v-model="question.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required prop="message" label="Текст робота">
              <el-input resize="none" type="textarea" :autosize="{ minRows: 10 }" v-model="question.message"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item required prop="level" label="Тип вопроса">
              <el-select v-model="question.level">
                <el-option
                  v-for="type in questionTypes"
                  :label="type.name"
                  :value="type.level"
                  :key="type.level"/>
              </el-select>
            </el-form-item>
           </el-col>
           <el-col v-if="isTest" :span="12">
             <el-form-item prop="minutes" label="Время на вопрос" required>
               <el-input-number :min="1" v-model="question.minutes"/>
             </el-form-item>
           </el-col>
        </el-row>
        <el-row v-if="isTest" :gutter="30">
          <el-col :span="12">
            <el-form-item prop="variant" label="Вариант" required>
              <el-select v-model="question.variant">
                <el-option
                  v-for="variant in variants"
                  :key="variant.id"
                  :label="variant.name"
                  :value="variant.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="points" label="Баллы за вопрос" required>
              <el-input-number :min="1" v-model="question.points"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="number" required label="Номер вопроса">
              <el-input-number :min="1" v-model="question.number"/>
            </el-form-item>
          </el-col>
          <el-col v-if="isTest" :span="12">
             <el-form-item label="Загрузите медиа-файл" prop="picture">
                <el-upload
                    :disabled="loading"
                    :on-change="(file, filelist) => handleChange(file.raw, filelist)"
                    action="undefined"
                    >
                    <div style="display: flex; flex-direction: column">
                      <img width="300" v-if="question.picture && question.picture.path" :src="`/uploads/${question.picture.path}`" alt/>
                      <el-button style="margin-top: 20px;" type="primary">Добавить файл</el-button>
                    </div>
                </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-loading="questionLoading" v-if="isTest && !loading">
          <question-variants
            @set-right-variant="setRightVariant"
            @add-variant="addVariant"
            :variants="answerVariants"/>
        </el-row>
      </el-form>
    </template>
  </base-crud>
</template>
<script>
import answersApi from '@/api/answers-variants'
import variantsApi from '@/api/variants'
import crudMixin from '@/mixins/crudMixin'
import fileMixin from '@/mixins/fileMixin'
import BaseCrud from '@/components/BaseCRUD/view'
import questionTypes from '@/helpers/questionTypes'
import QuestionVariants from './variants'


export default {
  name: 'QuestionsCRUD',
  data: () => ({
    question: {
      name: '',
      variant: '',
      level: 1,
      answers: [],
      picture: {},
      minutes: 1,
      points: 1,
      message: '',
      number: 1
    },
    questionLoading: false,
    entityName: 'questions',
    mainObjectName: 'question',
    variants: [],
    pictures: [],
    answerVariants: [],
    questionTypes
  }),
  mixins: [
    crudMixin,
    fileMixin
  ],
  components: {
    BaseCrud,
    QuestionVariants
  },
  computed: {
    isTest () {
      return this.question.level === 1
    },
    isVictorine () {
      return this.question.level === 2
    }
  },
  async beforeMount () {
    await this.getEntities(variantsApi.index, 'variants')
  },
  methods: {
    async saveQuestion () {
      if (!this.answerVariants.length && this.isTest) { return this.$message.error('Добавьте варианты ответа') }
      const data = { ...this.question }
      const answers = [ ...this.answerVariants ]
      data.answers = answers.map(answer => `api/answers/${answer.id}`)
      data.picture = this.question.picture && this.question.picture.id ? `api/files/${this.question.picture.id}` : null
      data.variant = `api/variants/${this.question.variant}`
      await this.save(data)
    },
    afterGet () {
      const data = { ...this.question }
      this.question.variant = data.variant.id
      this.answerVariants = [ ...this.question.answers ]
    },
    async handleChange (file, filelist = []) {
      this.loading = true
      const data = await this.fileUploading(file, 'image')
      this.question.picture = { ...data }
      this.loading = false
    },
    async addVariant({ name }) {
      const response = await answersApi.post({ name })
      this.answerVariants.push(response.data)
    },
    async setRightVariant({ id }) {
      this.questionLoading = true
      const rightVariant = this.answerVariants.filter(variant => variant.isRight)
      if (rightVariant.length > 0) {
        const notRight = rightVariant.find(({ id: variantId }) => variantId !== id)
        notRight.isRight = false
        await answersApi.put(notRight.id, { isRight: false })
      }
      const currentVariant = this.answerVariants.find(variant => variant.id === id)
      currentVariant.isRight = true
      await answersApi.put(currentVariant.id, { isRight: true })
      this.questionLoading = false
    }
  }
}
</script>
