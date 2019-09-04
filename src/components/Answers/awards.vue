<template>
  <div>
    <el-form
      v-if="achievement.id"
      :model="achievementTmp">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="challenge" label="Баллы за челлендж">
            <el-input-number
              controls-position="right"
              @change="$emit('update-achievement', { data: achievementTmp.challenge, field: 'challenge'})"
              :min="0"
              v-model="achievementTmp.challenge"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="medals" label="Медали">
            <el-checkbox-group
              @change="$emit('update-achievement', { data: [...achievementTmp.medals], field: 'medals'})"
              v-model="achievementTmp.medals">
              <el-row v-for="medal in medals" :key="medal.id">
                <el-col>
                  <el-checkbox :disabled="medal.disabled" :label="medal.id">
                    {{ medal.name }}
                  </el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" justify="center" v-else>
      <el-col>
        <h3>У пользователя нет достижений</h3>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AwardsList',
  props: {
    achievement: {
      type: Object,
      default: () => {}
    },
    medals: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    achievementTmp () {
      return this.achievement
    }
  }
}
</script>
