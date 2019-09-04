<template>
  <div>
    <page-title>
      <h1 style="font-size: 30px;" slot="title">
        <slot name="crud-title"></slot>
      </h1>
      <template slot="buttons">
        <el-button type="info"
          @click="$router.push({ name: `${module}.edit`, params: { id } })"
          v-if="editPermission">
          Изменить
        </el-button>
        <el-button
          type="primary"
          v-if="createPermission"
          @click="$router.push({ name: `${module}.create` })">
          Создать
        </el-button>
        <el-button @click="$emit('save')" type="primary" v-if="savePermission">
          Сохранить
        </el-button>
        <el-button @click="$emit('delete')" type="danger" v-if="deletePermission">
          Удалить
        </el-button>
        <slot name="custom-buttons"></slot>
      </template>
    </page-title>
    <el-row>
      <el-col>
        <slot name="crud-content"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PageTitle from './page-title'

export default {
  name: 'BaseCRUD',
  props: {
    /**
     * @prop {boolean} create - возможность создавать сущность
     */
    create: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {boolean} edit - возможность редактировать сущность
     */
    edit: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {boolean} remove - возможность удалять сущность
     */
    remove: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {string} action - действие, совершаемое над сущностью
     */
    action: {
      type: String
    },
    /**
     * @prop {string} module - модуль, для которого создается круд
     */
    module: {
      type: String,
      required: true
    },
    /**
     * @prop {number} id - id редактируемой или просматриваемой сущности
     */
    id: {
      type: Number
    }
  },
  components: {
    PageTitle
  },
  computed: {
    createPermission () {
      return this.create && this.action === 'list'
    },
    editPermission () {
      return this.edit && this.action === 'read'
    },
    deletePermission () {
      return this.remove && (this.action === 'read' || this.action === 'edit')
    },
    savePermission () {
      return this.create && (this.action === 'create' || this.action === 'edit')
    }
  },
  methods: {

  }
}
</script>
