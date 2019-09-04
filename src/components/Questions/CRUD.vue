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
        :model="question"
        :show-message="false">
        <el-row>
          <el-col>
            <el-form-item required prop="name" label="Текст вопроса">
              <el-input type="textarea" :autosize="{ minRows: 10 }" v-model="question.name"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item required prop="level" label="Тип вопроса">
            </el-form-item>
           </el-col>
        </el-row>
      </el-form>
    </template>
  </base-crud>
</template>
<script>
import answersApi from '@/api/answers-variants'
import variantsApi from '@/api/variants'
import crudMixin from '@/mixins/crudMixin'
import BaseCrud from '@/components/BaseCRUD/view'

export default {
  name: 'QuestionsCRUD',
  data: () => ({
    question: {
      name: '',
      variant: '',
      level: 1,
      answers: [],
      pictures: [],
      minutes: 0,
      message: ''
    },
    entityName: 'questions',
    variants: []
  }),
  mixins: [
    crudMixin
  ],
  components: {
    BaseCrud
  },
  async beforeMount () {
    await this.getEntities(variantsApi.index, 'variants')
  },
  methods: {
    saveQuestion () {

    }
  }
}
</script>
