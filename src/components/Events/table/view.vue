<template>
  <base-crud :action="action" create :module="'Events'">
    <template slot="crud-title">События</template>
    <template slot="crud-content">
      <data-table
        module="Events"
        :dataGetter="`app/events`"
        :get-data="getEvents"
        :delete-item="deleteEvent"
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
import roles from "@/helpers/roles";
import eventsApi from "@/api/events";

export default {
  name: "EventTable",
  mixins: [crudMixin],
  data: () => ({
    columns: [
      {
        label: "Название",
        field: "name",
        sortable: false,
        filterField: "name",
        filterable: false
      },
      {
        field: "date",
        label: "Дата",
        sortable: false,
        filterField: "date",
        filterable: false
      }
    ]
  }),
  components: {
    BaseCrud,
    DataTable
  },
  methods: {
    async getEvents(params = {}) {
      await this.$store.dispatch("app/getEntities", {
        mutationName: "SET_EVENTS",
        entityName: "events",
        params
      });
    },
    async deleteEvent(id) {
      await eventsApi.delete(id);
    }
  }
};
</script>
