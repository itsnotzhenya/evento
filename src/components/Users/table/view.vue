<template>
  <base-crud :module="'Users'">
    <template slot="crud-title">
      Пользователи
    </template>
    <template slot="custom-buttons">
      <el-button @click="$router.push({ path: '/user_groups' })" type="primary">Группы пользователей</el-button>
    </template>
    <template slot="crud-content">
      <data-table
            module="Users"
            :dataGetter="`app/users`"
            :get-data="getUsers"
            :columns="columns"
            :actions="['edit']"
      ></data-table>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from '@/components/BaseCRUD/view'
import DataTable from '@/components/DataTable/DataTable'
import roles from '@/helpers/roles'

export default {
  name: 'UserTable',
  data: () => ({
    columns: [
       {
        field(row) {
          return row.firstName + ' ' + row.lastName
        },
        label: 'Имя пользователя',
        sortable: true,
        filterField: 'username',
        filterable: true
      },
      {
        field(row) {
          return row.groups.map((group) => group.name).join(', ')
        },
        label: 'Группы'
      },
      {
        field(row) {
          return row.roles.map((role) => {
            return roles[role]
          }).join(', ')
        },
        label: 'Роли',
        filterable: true,
        sortable: true
      },
      {
        field: 'subdivision',
        label: 'Структурное подразделение',
        filterable: true,
        sortable: true,
        filterField: 'Структурное подразделение'
      }
    ]
  }),
  components: {
    BaseCrud,
    DataTable
  },
  methods: {
    async getUsers (params = {}) {
      await this.$store.dispatch('app/getEntities',
        {
          mutationName: 'SET_USERS',
          entityName: 'users',
          params
        }
      )
    }
  }
}
</script>
