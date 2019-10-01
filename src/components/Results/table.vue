<template>
  <base-crud :action="action" :module="'Results'">
    <template slot="crud-title">{{isResults ? 'Результаты прогноза' : 'Заявки'}}</template>
    <template slot="crud-content">
      <data-table
        ref="results"
        module="Results"
        :dataGetter="`app/predictions_results`"
        :get-data="getResults"
        :columns="columns"
        :actions="['edit', 'info', 'remove']"
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
    }
  },
  watch: {
    isResults: async function() {
      await this.$refs['results'].reloadData()
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
    }
  }
};
</script>
