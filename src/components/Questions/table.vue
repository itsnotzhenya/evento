<template>
  <base-crud :action="action" create :module="'Users'">
    <template slot="crud-title">
      Вопросы
    </template>
    <template slot="crud-content">
      <data-table
          module="Question"
          :dataGetter="`app/questions`"
          :get-data="getQuestions"
          :delete-item="deleteQuestion"
          :columns="columns"
          :actions="['edit', 'info', 'remove']"
      ></data-table>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from '@/components/BaseCRUD/view'
import DataTable from '@/components/DataTable/DataTable'
import crudMixin from '@/mixins/crudMixin'
import questionsApi from '@/api/questions'

export default {
  name: 'QuestionTable',
  mixins: [crudMixin],
  data: () => ({
    columns: [
      {
        field (row) {
          return row.name.length > 80 ? `${row.name.slice(0, 80)}...` : row.name
        },
        label: 'Текст вопроса',
        sortable: true,
        filterField: 'name',
        filterable: true
      },
      {
        field (row) {
          return row.level === 1 ? 'Тест' : 'Викторина'
        },
        label: 'Этап',
        sortable: true,
        filterField: 'level',
        filterable: true
      },
      {
        field: 'number',
        label: 'Номер вопроса',
        sortable: true,
        filterField: 'number',
        filterable: true
      }
    ]
  }),
  components: {
    BaseCrud,
    DataTable
  },
  methods: {
    async getQuestions (params = {}) {
      await this.$store.dispatch('app/getEntities',
        {
          mutationName: 'SET_QUESTIONS',
          entityName: 'questions',
          params
        }
      )
    },
    async deleteQuestion (id) {
      await questionsApi.delete(id)
    }
  }
}
</script>
