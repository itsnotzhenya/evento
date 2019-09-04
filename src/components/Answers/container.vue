<template>
  <div v-loading="loading">
    <step-navigation
      @set-active="(a) => active = a"
      :items="steps"
      :active="active"
      @save="saveAchievement">
      <template slot="steps-title">
        Ответы
      </template>
      <template slot="steps-content">
        <answers-list-test v-if="active === 0" :answers="answersForTest"/>
        <answers-list-victorine @update-answer="updateAnswer" v-if="active === 1" :answers="answersForVictotine"/>
        <awards @update-achievement="updateAchievement" v-if="active === 2" :medals="medals" :achievement="achievement"/>
      </template>
    </step-navigation>
  </div>
</template>

<script>
import StepNavigation from '@/components/StepNavigation/view'
import AnswersListTest from './list'
import AnswersListVictorine from './victorine'
import Awards from './awards'
import answersApi from '@/api/answers'
import teachersApi from '@/api/teacher-answers'
import medalsApi from '@/api/medals'
import achievementApi from '@/api/achievements'

export default {
  name: 'AnswerContainer',
  data: () => ({
    answers: [],
    medals: [],
    achievement: {},
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
    AnswersListVictorine,
    Awards
  },
  async beforeMount () {
    this.loading = true
    await this.getAnswers()
    await this.getMedals()
    await this.getAchievement()
    this.loading = false
  },
  computed: {
    answersForTest () {
      return this.answers.filter(answer => answer.question.level === 1)
    },
    answersForVictotine () {
      return this.answers.filter(answer => answer.question.level === 2)
    },
    userId () {
      return this.$route.params.id
    }
  },
  methods: {
    async getAnswers () {
      const response = await answersApi.index({ 'user.id': this.userId })
      this.answers = response.data.items
    },
    async updateAnswer ({ id, points }) {
      this.loading = true
      const data = { points }
      await teachersApi.put(id, { ...data })
      this.loading = false
    },
    async getMedals () {
      const response = await medalsApi.index()
      this.medals = response.data.items
    },
    async getAchievement () {
      const response = await achievementApi.index({ 'user.id': this.userId })
      const [ data ] = response.data.items
      if (data) {
        data.medals = data.medals.map(m => m.id)
        this.achievement = response.data.items[0]
      }
    },
    updateAchievement ({ data, field }) {
      this.achievement[field] = data
    },
    async saveAchievement () {
      this.loading = true
      try {
        const data = {
          ...this.achievement,
          medals: this.achievement.medals.map(medal => `api/medals/${medal}`)
        }
        await achievementApi.put(this.achievement.id, data)
        this.$message.success('Успешно обновлено')
      } catch (err) {
        console.log(err)
        this.$message.error('Ошибка при сохранении достижений')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .date-picker {
    width: 100% !important;
  }
</style>
