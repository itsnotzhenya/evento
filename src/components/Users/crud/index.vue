<template>
  <base-crud
    v-loading="loading"
    :module="`Users`"
    :action="action"
    create
    edit
    :id="id"
    @save="saveUser">
    <template slot="crud-title">
      Пользователи
    </template>
    <template slot="custom-buttons">
      <el-button
        @click="$router.push({ path: '/portfolio', params: { id } })"
        type="primary">
        Перейти в портфолио
      </el-button>
    </template>
    <template slot="crud-content">
      <el-form
        :disabled="action === 'read'"
        label-position="top"
        :model="user">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="username" label="Имя">
              <el-input disabled v-model="user.username"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="subdivision" label="Структурное подразделение">
              <el-input disabled v-model="user.subdivision"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="roles" label="Роли">
              <el-select
                multiple
                v-model="user.roles">
                <el-option
                  v-for="role in roles"
                  :value="role.value"
                  :key="role.value"
                  :label="role.name"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="groups" label="Группы">
              <el-select
                clearable
                filterable
                remote
                multiple
                v-model="user.groups"
                :remote-method="getGroups">
                <el-option
                  v-for="group in user_groups"
                  :key="group.id"
                  :label="group.name"
                  :value="group.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from '@/components/BaseCRUD/view'
import { rolesMap } from '@/helpers/roles'
import crudMixin from '@/mixins/crudMixin'

export default {
  name: 'UsersCrud',
  data: () => ({
    user: {
      username: '',
      roles: [],
      groups: [],
      subdivision: '',
    },
    subEntities: ['user_groups'],
    loading: false,
    entityName: 'users',
    mainObjectName: 'user',
    user_groups: [],
    roles: rolesMap
  }),
  mixins: [ crudMixin ],
  components: {
    BaseCrud
  },

  methods: {
    async saveUser(){
      const body = { ...this.user }
      body.groups = this.user.groups.map((group) => `api/user_groups/${group}`)
      await this.save(this.user)
    },
    afterGet () {
      this.user.groups = this.user.groups.map(group => group.id)
    }
  }
}
</script>
