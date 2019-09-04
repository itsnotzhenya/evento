<template>
  <div>
    <el-row v-for="answer in answers" :key="answer.id">
      <question-view :user-answer="answer.myAnswer" :question="answer.question"/>
    </el-row>
  </div>
</template>

<script>
import QuestionView from './question'

export default {
  name: 'AnswerList',
  props: {
    answers: {
      type: Array,
      default: () => []
    }
  },
  components: {
    QuestionView
  }
}
</script>
