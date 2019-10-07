<template>
  <base-crud :action="action" create :module="'Users'">
    <template slot="crud-title">Пользователи</template>
    <template slot="crud-content">
      <data-table
        module="Users"
        :dataGetter="`app/users`"
        :get-data="getUsers"
        :delete-item="deleteUser"
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
import roles from '@/helpers/roles'
import usersApi from '@/api/users'

export default {
  name: 'UserTable',
  mixins: [crudMixin],
  data: () => ({
    columns: [
      {
        label: 'Email',
        field: 'email',
        sortable: false,
        filterField: 'email',
        filterable: false
      },
      {
        field (row) {
          const roles = {
            ROLE_ADMIN: 'Администратор',
            ROLE_USER: 'Пользователь',
            ROLE_SUPPORT_MANAGER: 'Опереатор поддержки'
          }
          return row.roles.map(key => roles[key]).join(', ')
        },
        label: 'roles',
        sortable: false,
        filterable: false,
        filterField: 'roles',
        // filterDropdown: true,
        // filterOptions: [
        //   {
        //     value: 'ROLE_ADMIN',
        //     text: 'Администратор'
        //   },
        //   {
        //     value: 'ROLE_USER',
        //     text: 'Пользователь'
        //   },
        //   {
        //     value: 'ROLE_SUPPORT_MANAGER',
        //     text: 'Опереатор поддержки'
        //   }
        // ]
      }
    ]
  }),
  components: {
    BaseCrud,
    DataTable
  },
  methods: {
    async getUsers (params = {}) {
      await this.$store.dispatch('app/getEntities', {
        mutationName: 'SET_USERS',
        entityName: 'users',
        params
      })
    },
    async deleteUser (id) {
      await usersApi.delete(id)
    }
  }
}
</script>
