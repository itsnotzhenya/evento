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
      Пользователь
    </template>
    <template v-if="action !== 'create'" slot="custom-buttons">
      <el-button
        @click="$router.push(`/answers/${id}`)"
        type="primary">
        Перейти к ответам
      </el-button>
    </template>
    <template slot="crud-content">
      <el-form
        ref="form"
        :disabled="action === 'read'"
        label-position="left"
        :show-message="false"
        :model="user">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="firstName" required label="Имя">
              <el-input v-model="user.firstName"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="lastName" required label="Фамилия">
              <el-input v-model="user.lastName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
           <el-col :span="10">
            <el-form-item prop="secondName" required label="Отчество">
              <el-input v-model="user.secondName"/>
            </el-form-item>
          </el-col>
           <el-col :span="10">
            <el-form-item prop="password" :required="action === 'create'" label="Пароль">
              <el-input type="password" v-model="user.password"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="roles" required label="Роли">
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
            <el-form-item prop="phone" required label="Телефон">
              <el-input v-model="user.phone"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="school" required label="Школа">
              <el-input v-model="user.school" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="class" required label="Класс">
              <el-input v-model="user.class" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="parentPhone" required label="Телефон родителя">
              <el-input v-model="user.parentPhone" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="parentName" required label="ФИО родителя">
              <el-input v-model="user.parentName" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="email" label="Email">
              <el-input type="email" v-model="user.email"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item required prop="birthDate" label="Дата рождения">
              <el-date-picker
                class="date-picker"
                v-model="user.birthDate"
                format="dd.MM.yyyy"
                default-value="02.09.2019"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="city" required label="Город">
              <el-input v-model="user.city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="address" required label="Адрес">
              <el-input v-model="user.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="userType" required label="Трек">
              <el-select v-model="user.userType">
                <el-option
                  v-for="track in tracks"
                  :label="track.name"
                  :key="track.value"
                  :value="track.value"
                ></el-option>
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
import trackMap from '@/helpers/tracks'
import crudMixin from '@/mixins/crudMixin'
import usersApi from '@/api/users'

export default {
  name: 'UsersCrud',
  data: () => ({
    user: {
      username: '',
      city: '',
      class: '',
      school: '',
      roles: [],
      parentName: '',
      parentPhone: '',
      firstName: '',
      lastName: '',
      secondName: '',
      phone: '',
      email: '',
      secondName: '',
      password: '',
      address: '',
      birthDate: new Date(),
      userType: null
    },
    subEntities: [],
    loading: false,
    entityName: 'users',
    mainObjectName: 'user',
    roles: rolesMap,
    tracks: trackMap
  }),
  mixins: [ crudMixin ],
  components: {
    BaseCrud
  },
  computed: {
    adminIncludes () {
      return this.user.roles.includes('ROLE_ADMIN')
    }
  },
  methods: {
    async saveUser () {
      const data = { ...this.user }
      if (data.id) {
        data.avatar = `api/files/${this.user.avatar.id}`
        data.achievement = data.achievement ? `api/achievements/${this.user.achievement.id}` : null
      }
      await this.save(data)
    }
  }
}
</script>

<style>
  .date-picker {
    width: 100% !important;
  }
</style>
