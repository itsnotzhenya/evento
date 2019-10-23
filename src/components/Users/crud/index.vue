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
        :show-message="true"
        :model="user"
        :rules="rules"
      >
        <el-row class="form__row">
            <el-col :span="10">
            <el-form-item prop="firstName" required label="Имя">
              <el-input v-model="user.firstName" />
            </el-form-item>
          </el-col>
            <el-col :span="10">
            <el-form-item prop="secondName" required label="Фамилия">
              <el-input v-model="user.secondName" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="email" required label="Email">
              <el-input type="email" v-model="user.email" />
            </el-form-item>
          </el-col>
          <el-col v-if="action === 'create'" :span="10">
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
            <el-form-item prop="phone" required label="Телефон">
              <el-input v-model="user.phone" />
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
import usersApi from '@/api/users'

export default {
  name: "UsersCrud",
  data() {
    return {
      user: {
        roles: [],
        phone: '',
        email: '',
        plainPassword: '',
        enabled: true
      },
      subEntities: [],
      loading: false,
      entityName: 'users',
      mainObjectName: 'user',
      roles: rolesMap,
      rules: {
        email: {
          required: true,
          type: "email",
          message: "Введите email",
          trigger: blur
        },
        phone: {
          required: true,
          message: "Введите номер телефона",
          trigger: blur
        },
        plainPassword: [
          {
            min: 5,
            message: "Пароль должен содержать минимум 5 символов"
          }
        ]
      }
    };
  },
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  computed: {
    adminIncludes () {
      return this.user.roles.includes('ROLE_ADMIN')
    }
  },
  methods: {
    async saveUser() {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error("Заполните поля");
        try {
          const data = { ...this.user };
          data.username = data.email;
          this.loading = true;
          await this.$store.dispatch("app/saveEntity", {
            id: this.id,
            method: this.saveMethod,
            entityName: this.entityName,
            data
          });
          this.$router.push(`/${this.entityName}`);
          this.$message.success("Успешно сохранено");
          return true;
        } catch (e) {
          let errors = e.response.data.violations;
          errors.forEach((error, index) => {
            if (error.propertyPath === "usernameCanonical" || error.propertyPath === "username" ) return;
            let timeout = (index + 1) * 100;
            setTimeout(() => {
              this.$message.error(`${error.propertyPath}: ${error.message}`);
            }, timeout);
          });
          return false;
        } finally {
          this.loading = false;
        }
      });
    }
    // async saveUser() {
    //   try {
    //     const data = { ...this.user };
    //     data.username = data.email;
    //     await this.save(data);
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
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
