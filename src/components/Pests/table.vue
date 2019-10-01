<template>
  <base-crud :action="action" create :module="'Pests'">
    <template slot="crud-title">Объекты</template>
    <template slot="crud-content">
      <data-table
        module="Pests"
        :dataGetter="`app/pests`"
        :get-data="getPests"
        :delete-item="deletePest"
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
import pestsApi from '@/api/pests'

export default {
  name: 'PestTable',
  mixins: [crudMixin],
  data: () => ({
    columns: [
      {
        label: 'Название',
        field: 'name'
      },
      {
        field (row) {
          return row.category ? row.category.name : "" 
        },
        label: 'Категория'
      }

    ]
  }),
  components: {
    BaseCrud,
    DataTable
  },
  methods: {
    async getPests (params = {}) {
      await this.$store.dispatch('app/getEntities', {
        mutationName: 'SET_PESTS',
        entityName: 'pests',
        params
      })
    },
    async deletePest (id) {
      await pestsApi.delete(id)
    }
  }
}
</script>
