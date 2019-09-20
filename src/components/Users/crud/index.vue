<template>
  <base-crud
    v-loading="loading"
    :module="`Users`"
    :action="action"
    create
    edit
    :id="id"
    @save="saveUser"
  >
    <template slot="crud-title">Пользователь</template>
    <template slot="crud-content">
      <el-form
        ref="form"
        :disabled="action === 'read'"
        label-position="left"
        :show-message="false"
        :model="user"
      >
        <el-row class="form__row">
          <el-col :span="10">
            <el-form-item prop="email" required label="Email">
              <el-input type="email" v-model="user.email" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="plainPassword" :required="action === 'create'" label="Пароль">
              <el-input type="password" v-model="user.plainPassword" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="roles" required label="Роли">
              <el-select multiple v-model="user.roles">
                <el-option
                  v-for="role in roles"
                  :value="role.value"
                  :key="role.value"
                  :label="role.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="phone" label="Телефон">
              <el-input v-model="user.phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from "@/components/BaseCRUD/view";
import { rolesMap } from "@/helpers/roles";
import crudMixin from "@/mixins/crudMixin";
import usersApi from "@/api/users";

export default {
  name: "UsersCrud",
  data: () => ({
    user: {
      username: "",
      roles: [],
      phone: "",
      email: "",
      plainPassword: "",
      enabled: true
    },
    subEntities: [],
    loading: false,
    entityName: "users",
    mainObjectName: "user",
    roles: rolesMap
  }),
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  computed: {
    adminIncludes() {
      return this.user.roles.includes("ROLE_ADMIN");
    }
  },
  methods: {
    async saveUser() {
      const data = { ...this.user };
      data.username = data.email;
      await this.save(data);
    }
  }
};
</script>

<style>
.date-picker {
  width: 100% !important;
}
.form__row {
  display: flex;
  flex-direction: column;
}
</style>
