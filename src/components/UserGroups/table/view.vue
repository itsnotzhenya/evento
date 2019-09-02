<template>
  <base-crud :module="`UserGroups`" :action="action" create edit remove>
    <template slot="crud-title">
      Группы пользователей
    </template>
    <template slot="crud-content">
      <data-table
            module="UserGroups"
            :dataGetter="`app/groups`"
            :get-data="getUserGroups"
            :deleteItem="deleteGroup"
            :columns="columns"
            :actions="['edit', 'info', 'remove']"
      ></data-table>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from '@/components/BaseCRUD/view'
import DataTable from '@/components/DataTable/DataTable'
import roles from '@/helpers/roles'
import crudMixin from '@/mixins/crudMixin'

export default {
  name: 'UserGroupsTable',
  data: () => ({
    columns: [
       {
         field: 'name',
         label: 'Название',
         sortable: true,
         filterable: true,
         filterField: 'name'
       }
    ]
  }),
  mixins: [ crudMixin ],
  components: {
    BaseCrud,
    DataTable
  },
  methods: {
    async getUserGroups (params = {}) {
      await this.$store.dispatch('app/getEntities',
        {
          mutationName: 'SET_GROUPS',
          entityName: 'user_groups',
          params
        }
      )
    },
    async deleteGroup(id) {
      await this.$store.dispatch('app/deleteItem', {
        entityName: 'user_groups',
        id
      })
    }
  }
}
</script>
