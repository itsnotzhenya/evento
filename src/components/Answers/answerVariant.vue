<template>
  <el-row :style="{ border: borderStyle }" class="user-answer">
    <el-col :span="14">
      <span>{{ variant.name }}</span>
    </el-col>
    <el-col :offset="8" :span="2">
      <i class="el-icon-check correct-icon" v-if="variant.isRight"/>
      <i class="el-icon-close not-correct-icon" v-if="notCorrectAnswer"/>
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
    borderStyle () {
      if (this.isUserAnswer) {
        return `2px solid ${this.variant.isRight ? '#41b883' : 'red'}`
      }
      return `2px solid #d3d3d3`
    },
    isUserAnswer () {
      return this.variant.id === this.userAnswer.id
    },
    notCorrectAnswer () {
      return this.isUserAnswer && !this.variant.isRight
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

  .correct-icon, .not-correct-icon {
    font-size: 20px;
    font-weight: bold;
  }

  .correct-icon {
    color: #41b883;
  }

  .not-correct-icon {
    color: red;
  }

</style>
