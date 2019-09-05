<template>
  <div>
    <el-row>
      <el-col :span="4">
        <h3>Варианты ответа</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div style="type: flex; flex-direction: column">
          <el-row
            v-for="variant in variants"
            :key="variant.id">
              <el-col :span="10">
                <el-checkbox
                  @change="$emit('set-right-variant', { id: variant.id })"
                  v-model="variant.isRight"
                  :label="variant.id">{{ variant.name }}</el-checkbox>
              </el-col>
            </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-input
          @keyup.native.enter="addVariant"
          v-model="newVariant"
          placeholder="Введите вариант ответа"/>
      </el-col>
      <el-col :span="1">
        <i @click="addVariant" style="position: relative; top: 10px;" class="el-icon-plus create-button"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'QuestionVariants',
  props: {
    variants: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    newVariant: '',
    currentVariants: []
  }),
  methods: {
    addVariant () {
      if (!this.newVariant.length) {
        return this.$message.error('Заполните поле варианта')
      }
      this.$emit('add-variant', { name: this.newVariant })
      this.newVariant = ''
    }
  }
}
</script>

<style>
  .create-button {
    font-size: 20px;
    cursor: pointer;
  }

  .create-button:hover {
    color: #41b883;
  }
</style>
