<template>
  <div>
    <el-row>
      <el-col :span="4">
        Вопрос {{ question.number }}.
      </el-col>
      <el-col v-if="userAnswer" :span="20">
        <el-row :gutter="20" style="width: 600px;">
          <el-col v-for="variant in question.answers" :key="`variant_${variant.id}`" :span="12">
            <answer-variant :variant="variant" :user-answer="userAnswer"/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" v-else>
        <span>Пользователь не отвечал на данный вопрос</span>
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
