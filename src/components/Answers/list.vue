<template>
  <div>
    <el-row v-for="answer in answers" :key="answer.id">
      <question-view :user-answer="answer.myAnswer" :question="answer.question"/>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col>
        <span>Итого за тест: {{ pointsForAnswers }} баллов</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionView from './question'
import pointsMixin from '@/mixins/pointsForAnswers'


export default {
  name: 'AnswerList',
  mixins: [
    pointsMixin
  ],
  components: {
    QuestionView
  }
}
</script>
