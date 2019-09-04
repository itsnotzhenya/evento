export default {
  props: {
    answers: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    pointsForAnswers () {
      return this.answers.reduce((acc, next) => acc + next.points, 0)
    }
  }
}
