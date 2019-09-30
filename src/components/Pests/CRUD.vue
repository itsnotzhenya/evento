<template>
  <base-crud
    v-loading="loading"
    :module="`Pests`"
    :action="action"
    create
    edit
    :id="id"
    @save="savePest"
  >
    <template slot="crud-title">Объект</template>
    <template slot="crud-content">
      <el-form
        ref="form"
        :disabled="action === 'read'"
        label-position="left"
        :show-message="false"
        :model="pest"
      >
        <!-- TODO: Форму вынести нахой -->
        <el-row class="form__row">
          <el-col :span="10">
            <el-form-item prop="name" required label="Название">
              <el-input type="text" v-model="pest.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="category" required label="Категория">
              <el-select v-model="pest.category">
                <el-option
                  v-for="category in categories"
                  :value="category.id"
                  :key="category.id"
                  :label="category.name"
                />
              </el-select>
            </el-form-item>
            {{pest}}
          </el-col>
          <el-col :span="4">
            <el-form-item prop="file">
              <!-- TODO: Вынести нахой -->
              <el-upload
                class="upload-demo"
                action="https://http://207.246.94.5:9081/api/files"
                accept="image/jpeg, image/jpg, image/png"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="createImage"
              >
                <el-button size="uploader small" type="primary">Загрузить фотографию</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from "@/components/BaseCRUD/view";
import crudMixin from "@/mixins/crudMixin";
import pestsApi from "@/api/pests";
import categoriesApi from "@/api/categories";
import mapGetters from "vuex";

export default {
  name: "PestsCrud",
  data: () => ({
    pest: {
      name: "",
      category: null,
      enabled: true
    },
    categories: {},
    subEntities: [],
    loading: false,
    entityName: "pests",
    mainObjectName: "pest"
  }),
  computed: {},
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  async mounted() {
    await this.getCategories();
    this.categories = this.$store.getters["app/categories"].items;
    
  },
  methods: {
    async savePest() {
      const data = { ...this.pest };
      data.category = `api/categories/${data.category}`;
      if(data.file) data.file = `api/files/${data.file}`
      await this.save(data);
    },
    async getCategories(params = {}) {
      await this.$store.dispatch("app/getEntities", {
        mutationName: "SET_CATEGORIES",
        entityName: "categories",
        params
      });
    },
    afterGet () {
      const data = { ...this.pest }
      this.pest.category = data.category.id
    },
    async createImage({ raw }) {
      const maxSize = 2097152;
      if (raw.size > maxSize) {
        this.$message.error("Недопустимый размер файла");
      } else {
        const data = new FormData();
        data.append("file", raw);
        try {
          this.loading = true
          const file = await this.$store.dispatch("app/postFile", data);
          this.pest.file = file.data.id;
          this.loading = false
        } catch (e) {
          this.$message.error(e.response.data.detail);
        }
      }
    }
  }
};
</script>

<style>
.date-picker {
  width: 100% !important;
}
.form__row {
  display: flex;
  flex-direction: column;
}
</style>
