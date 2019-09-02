<template>
  <base-crud
    v-loading="loading"
    :module="`UserGroups`"
    :action="action"
    create
    edit
    :id="id"
    remove
    @save="saveGroup">
    <template slot="crud-title">
      Группа пользователей
    </template>
    <template slot="crud-content">
      <el-form
        :disabled="action === 'read'"
        :rules="rules"
        :model="userGroup">
        <el-row>
          <el-col :span="10">
            <el-form-item prop="name" label="Название">
              <el-input v-model="userGroup.name"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from '@/components/BaseCRUD/view'
import roles from '@/helpers/roles'
import crudMixin from '@/mixins/crudMixin'

export default {
  name: 'UserGroupsCRUD',
  data: () => ({
    userGroup: {
      name: ''
    },
    loading: false,
    entityName: 'user_groups',
    mainObjectName: 'userGroup',
    rules: {
      name: [{ required: true, message: 'Введите имя' }]
    }
  }),
  mixins: [ crudMixin ],
  components: {
    BaseCrud
  },
  methods: {
    async saveGroup(){
      await this.save(this.userGroup)
    }
  }
}
</script>
