<template>
  <div>
    <page-title>
      <h1 style="font-size: 30px;" slot="title">
        <slot name="steps-title"></slot>
      </h1>
    </page-title>
    <el-row type="flex" justify="center">
      <el-col>
        <el-steps simple :active="active">
          <el-step
            :key="index"
            :icon="item.icon"
            v-for="(item, index) in items">
              <template slot="title">
                <el-button @click="$emit('set-active', index)" type="text">{{ item.title }}</el-button>
              </template>
          </el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <slot name="steps-content"></slot>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col v-if="active > 0" :span="2">
        <el-button type="primary" @click="$emit('set-active', active -= 1)">
          Назад
        </el-button>
      </el-col>
      <el-col v-if="active < items.length - 1" :span="2">
        <el-button type="primary" @click="$emit('set-active', active += 1)">
          Вперед
        </el-button>
      </el-col>
      <el-col v-if="active === items.length - 1" :span="2">
        <el-button type="primary" @click="$emit('save')">
          Сохранить
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PageTitle from '@/components/BaseCRUD/page-title'

export default {
  name: 'StepNavigationView',
  components: {
    PageTitle
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
