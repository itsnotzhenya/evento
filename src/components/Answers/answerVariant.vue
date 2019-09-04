<template>
  <el-row :style="{ border: borderStyle }" class="user-answer">
    <el-col :span="14">
      <span>{{ variant.name }}</span>
    </el-col>
    <el-col :offset="8" :span="2">
      <i class="el-icon-check correct-icon" v-if="variant.isRight"/>
    </el-col>
  </el-row>
</template>


<script>
export default {
  name: 'AnswerVariant',
  props: {
    userAnswer: {
      type: Object,
      default: () => {}
    },
    variant: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isCorrectAnswer () {
      return true
    },
    borderStyle () {
      if (!this.userAnswer)
        return `2px solid #C6C6C6`
      // const isUserAnswer = this.variant.id === this.userAnswer.id
    }
  }
}
</script>

<style scoped>
  .user-answer {
    width: 100%;
    border-radius: 10px;
    padding: 10px;
  }

  .correct-icon {
    font-size: 20px;
    color: #41b883;
    font-weight: bold;
  }
</style>
