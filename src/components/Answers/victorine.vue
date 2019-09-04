<template>
  <div>
    <el-table
      :data="answers"
      style="width: 100%">
       <el-table-column
        prop="question.number"
        label="Номер вопроса"
        width="130"
        >
      </el-table-column>
      <el-table-column
        prop="question.name"
        label="Текст вопроса"
        width="800">
      </el-table-column>
      <el-table-column
        label="Ответ ученика">
        <template slot-scope="scope">
          <span v-if="scope.row.textAnswer.length">
            {{ scope.row.textAnswer }}
          </span>
          <span class="no-answer" v-else>
            Ученик не дал ответ
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Баллы за вопрос"
      >
        <template slot-scope="scope">
          <el-input-number
            controls-position="right"
            @change="(points) => $emit('update-answer', { id: scope.row.id, points })"
            :min="0" v-model="scope.row.points"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import pointsMixin from '@/mixins/pointsForAnswers'

export default {
  name: 'AnswersListVictorine',
  mixins: [
    pointsMixin
  ]
}
</script>

<style lang="scss" scoped>
  .no-answer {
    font-weight: bold;
  }
</style>
