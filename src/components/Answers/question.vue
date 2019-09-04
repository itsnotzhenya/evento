<template>
  <div>
    <el-row>
      <el-col :span="4">
        {{ question.number }}.
      </el-col>
      <el-col :span="20">
        <el-row v-for="variant in question.answers" :key="`variant_${variant.id}`">
          <el-col :span="6">
            <answer-variant :variant="variant" :user-answer="userAnswer"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AnswerVariant from './answerVariant'

export default {
  name: 'QuestionView',
  components: {
    AnswerVariant
  },
  props: {
    question: {
      type: Object,
      default: () => {}
    },
    userAnswer: {
      type: Object,
      default: () => {}
    },
  }
}
</script>
