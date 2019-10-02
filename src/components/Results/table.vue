<template>
  <base-crud :action="action" :module="module">
    <template slot="crud-title">{{isResults ? 'Результаты прогноза' : 'Заявки'}}</template>
    <template slot="crud-content">
      <data-table
        ref="results"
        :module="module"
        :dataGetter="`app/predictions_results`"
        :get-data="getResults"
        :delete-item="deleteResult"
        :columns="columns"
        :actions='["info", "edit", "remove"]'
      ></data-table>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from "@/components/BaseCRUD/view";
import DataTable from "@/components/DataTable/DataTable";
import crudMixin from "@/mixins/crudMixin";
import resultsApi from "@/api/results";

export default {
  name: "ResultTable",
  mixins: [crudMixin],
  data: () => ({
    columns: [
      {
        field: 'id',
        label: "id"
      },
      {
        field(row) {
          return row.user.email;
        },
        label: "Пользователь"
      },
      {
        field(row) {
          return row.category ? row.category.name : "";
        },
        label: "Category"
      },
      {
        field(row) {
          return row.dateCreate.slice(0, 10);
        },
        label: "Дата создания"
      }
    ]
  }),
  components: {
    BaseCrud,
    DataTable
  },
  computed: {
    isResults() {
      return ~this.$route.name.indexOf("Result");
    },
    module() {
      return ~this.$route.name.indexOf("Result") ? "Results" : "Request";
    }
  },
  watch: {
    isResults: async function() {
      await this.$refs["results"].reloadData();
    }
  },
  methods: {
    async getResults(params = {}) {
      if (this.isResults) {
        params = {
          hasAnswer: true
        };
      } else
        params = {
          hasAnswer: false
        };
      await this.$store.dispatch("app/getEntities", {
        mutationName: "SET_RESULTS",
        entityName: "predictions_results",
        params: {
          ...params
        }
      });
    },
    async deleteResult(id) {
      await resultsApi.delete(id);
    }
  }
};
</script>
