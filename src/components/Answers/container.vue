<template>
  <div v-loading="loading">
    <step-navigation
      @set-active="(a) => active = a"
      :items="steps"
      :active="active">
      <template slot="steps-title">
        Ответы
      </template>
      <template slot="steps-content">
        <answers-list-test v-if="active === 0" :answers="answersForTest"/>
        <answers-list-victorine @update-answer="updateAnswer" v-if="active === 1" :answers="answersForVictotine"/>
      </template>
    </step-navigation>
  </div>
</template>

<script>
import StepNavigation from '@/components/StepNavigation/view'
import AnswersListTest from './list'
import AnswersListVictorine from './victorine'
import answersApi from '@/api/answers'
import teachersApi from '@/api/teacher-answers'

export default {
  name: 'AnswerContainer',
  data: () => ({
    answers: [],
    loading: false,
    active: 0,
    steps: [
      {
        title: 'Ответы за тест',
        icon: 'el-icon-tickets'
      },
      {
        title: 'Ответы за викторину',
        icon: 'el-icon-s-check'
      },
      {
        title: 'Награды',
        icon: 'el-icon-collection-tag'
      }
    ]
  }),
  components: {
    StepNavigation,
    AnswersListTest,
    AnswersListVictorine
  },
  async beforeMount() {
    await this.getAnswers()
  },
  computed: {
    answersForTest () {
      return this.answers.filter(answer => answer.question.level === 1)
    },
    answersForVictotine () {
      return this.answers.filter(answer => answer.question.level === 2)
    }
  },
  methods: {
    async getAnswers () {
      this.loading = true
      const response = await answersApi.index({ 'user.id': this.$route.params.id })
      this.answers = response.data.items
      this.loading = false
    },
    async updateAnswer ({ id, points }) {
      this.loading = true
      const data = { points }
      await teachersApi.put(id, { ...data })
      this.loading = false
    }
   }
}
</script>

<style>
  .date-picker {
    width: 100% !important;
  }
</style>
