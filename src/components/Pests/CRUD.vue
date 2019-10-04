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
        :rules="rules"
      >
        <el-row class="form__row">
          <el-col :span="10" v-if="pest.file && pest.file.path">
            <img class="file" :src="`/uploads/${pest.file.path}`" alt="file" />
          </el-col>
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
          </el-col>

          <el-col :span="4" v-if="action !== 'read'">
            <el-form-item prop="file">
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
  data() {
    let validName = (rule, value, callback) => {
      let name = value.trim();
      if (name === "" || name === undefined) {
        callback(new Error("Введите название"));
      }
      callback();
    };
    return {
      pest: {
        name: "",
        category: null,
        enabled: true
      },
      categories: {},
      subEntities: [],
      loading: false,
      entityName: "pests",
      mainObjectName: "pest",
      rules: {
        name: [
          {
            required: true,
            validator: validName,
            trigger: blur
          }
        ]
      }
    };
  },
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
      if (data.file) data.file = `api/files/${data.file.id}`
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
          const file = await this.$store.dispatch("pests/postFile", data)
          this.pest.file = file
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
.file {
  max-width: 300px;
}
</style>
