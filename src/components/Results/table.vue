<template>
  <base-crud :action="action" create :module="'Results'">
    <template slot="crud-title">Результаты проверок</template>
    <template slot="crud-content">
      <data-table
        module="Results"
        :dataGetter="`app/predictions_results`"
        :get-data="getResults"
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
import resultsApi from '@/api/results'

export default {
  name: 'ResultTable',
  mixins: [crudMixin],
  data: () => ({
    columns: [
      {
        field: 'id',
        label: 'id',
        sortable: true,
        filterField: 'id',
        filterable: true
      },
      {
        field(row) {
          return row.category ? row.category.name : "" 
        },
        label: 'Category',
        sortable: true,
        filterField: 'category',
        filterable: true
      }
    ]
  }),
  components: {
    BaseCrud,
    DataTable
  },
  methods: {
    async getResults (params = {}) {
      await this.$store.dispatch('app/getEntities', {
        mutationName: 'SET_RESULTS',
        entityName: 'predictions_results',
        params
      })
    }
  }
}
</script>
