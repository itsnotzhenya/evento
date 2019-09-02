<template>
  <section style="padding:10px" class="custom-table">
    <div class="custom-table__common-wrapper">
      <div class="custom-table__table-body">
        <vue-good-table
          v-loading="loading"
          class="table table-stripped"
          :columns="computedColumns"
          :rows="rows"
          :lineNumbers="false"
          :nextText="'след.'"
          :prevText="'пред.'"
          :rowsPerPageText="'строк на странице'"
          :ofText="'из'"
          styleClass="table table-bordered table-striped"
          @on-filter="filter"
          @on-sort="sort"
          :filterPreset="startFilterParams"
          :defaultSortBy="defaultSortBy"
          :isEmpty="isEmpty"
          noDataText="Ничего не найдено"
        >
          <template v-if="$scopedSlots['custom-table-row']" slot="table-row" slot-scope="props">
            <slot
              name="custom-table-row"
              :row="props.row"
              :formattedRow="props.formattedRow"
              :collect="props.collect"
            ></slot>
          </template>

          <template v-if="actions && actions.length > 0" slot="table-row-after" slot-scope="props">
            <template v-if="$scopedSlots['custom-table-row-after']">
              <slot
                name="custom-table-row-after"
                :row="props.row"
                :formattedRow="props.formattedRow"
                :collect="props.collect"
              ></slot>
            </template>

            <td style="padding: 10px" align="center" v-if="!$scopedSlots['custom-table-row-after']">
              <el-button
                v-if="hasAction('info')"
                type="info"
                size="mini"
                @click="onInfo(props)"
                class="button__view"
              >
                <i class="el-icon-info"></i>
              </el-button>
              <el-button
                v-if="hasAction('edit')"
                size="mini"
                @click="onEdit(props)"
                class="button__view"
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                v-if="hasAction('remove')"
                size="mini"
                type="danger"
                @click="onDelete(props)"
                class="button__view"
              >
                <i class="el-icon-circle-close" v-if="state.$_deleting !== props.index"></i>
                <i class="el-icon-loading" v-if="state.$_deleting === props.index"></i>
              </el-button>
            </td>
          </template>
        </vue-good-table>
      </div>
      <div style="margin-top: 20px;" class="custom-table__pagination" v-if="!disablePagination">
        <el-row type="flex" justify="center">
          <el-col>
            <el-pagination
              background
              @size-change="onPageSizeChange"
              @current-change="onCurrentPageChange"
              :current-page.sync="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next"
              :total="dataCount"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { VueGoodTable } from '@/components/vue-good-table'
import { forEach } from 'lodash'

export default {
  components: { VueGoodTable },
  data () {
    return {
      pageSizes: [10, 20, 50],
      pageSize: 10,
      currentPage: 1,
      dataCount: 0,
      limit: 10,
      temp: {},
      data: {},
      loading: false,
      filterParams: {},
      sortParams: {},
      startFilterParams: {},
      defaultSortBy: {},
      interval: null,
      state: {
        $_deleting: null
      },
      modals: {
        config: {
          visible: false,
          form: {},
          configGroups: [],
          rules: {
            config: [
              {
                required: true,
                message: 'Это поле обязательно для заполнения',
                trigger: 'change'
              }
            ]
          },
          loading: false
        },
        run: {
          loading: false,
          visible: false,
          commands: [],
          shell: ''
        }
      },
      dataToSend: {}
    }
  },
  watch: {
    outerData (newVal, oldVal) {
      this.data = newVal
    },
    columns () {
      this.data = this._dictionaryMiddleware(this.dataFromStore)
    },
    reloadInterval () {
      this.intervalOn()
    },
    customPageSizes (customPageSizes) {
      this.pageSizes = customPageSizes
    }
  },
  // Table API
  props: {
    // array of columns, more https://www.npmjs.com/package/vue-good-table
    // CUSTOM: if filterDropDown set to true, this column can accept prop "loadOptions" for API Function
    columns: {
      type: Array
    },
    dataGetter: String,
    // Array of available options ['info' || 'edit' || 'remove']
    actions: {
      type: Array
    },
    // Specify module name for operate nested routes or set query params to URL
    module: {
      type: String
    },
    // API Function for table data fetch
    getData: {
      type: Function
    },
    // If action 'remove' set you must pass the remove API for this action
    deleteItem: {
      type: Function
    },
    custom: {
      type: Object
    },
    // If you want to manage data in parent component set it to  true
    outerManage: {
      type: Boolean
    },
    // If externalManage set to true, data array required from parent
    outerData: {
      prop: Array
    },
    reloadInterval: {
      prop: Number
    },
    alotPages: {
      type: Boolean
    },
    customPageSizes: {
      type: Array
    },
    allCountPageSize: {
      type: Boolean
    },
    icons: {
      type: Array
    },
    disablePagination: {
      type: Boolean
    },
    order: {
      type: Boolean,
      default: false
    }
  },
  async created () {
    if (this.outerManage) {
      return
    }

    if (this.customPageSizes) {
      this.pageSizes = this.customPageSizes
    }

    this.currentPage = Number(this.$route.query.page) || 1
    this.filterParams = this.$route.query
    delete this.filterParams.page
    delete this.filterParams.limit

    this.pageSize = this.limit =
      Number(this.$route.query.limit) || this.pageSizes[0]

    this.startFilterParams = { ...this.filterParams }

    if (this.filterParams['orderby']) {
      this.defaultSortBy = {
        field: this.filterParams['orderby'],
        type: 'asc'
      }
    }

    if (this.filterParams['orderbydesc']) {
      this.defaultSortBy = {
        field: this.filterParams['orderbydesc'],
        type: 'desc'
      }
    }

    await this.loadData()

    this.intervalOn()
    this.loadDropdowns()
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  },
  computed: {
    rows () {
      return this.data || []
    },
    dataFromStore () {
      return this.$store.getters[this.dataGetter]
    },
    computedColumns () {
      let columns = [...this.columns]
      if (this.actions.length) {
        columns.push({
          label: 'Действия'
        })
      }
      return columns
    },
    isEmpty () {
      if (this.loading) return
      if (Array.isArray(this.data)) return !this.data.length
      return false
    },
    info () {
      return this.actions.indexOf('info') >= 0 || this.findActionObject('info')
    },
    edit () {
      return this.actions.indexOf('edit') >= 0 || this.findActionObject('edit')
    },
    remove () {
      return (
        this.actions.indexOf('remove') >= 0 || this.findActionObject('remove')
      )
    },
    view () {
      return this.actions.indexOf('view') >= 0 || this.findActionObject('view')
    },
    run () {
      return this.actions.indexOf('run') >= 0 || this.findActionObject('run')
    }
  },
  methods: {
    hasAction (key) {
      let actionObject = this.findActionObject(key)

      if (actionObject && actionObject.hide) {
        return false
      }
      if (this.actions && this.actions.length > 0) {
        return this.actions.indexOf(key) >= 0 || actionObject
      }
    },
    intervalOn () {
      if (!this.getData) {
        return
      }
      if (this.reloadInterval) {
        this.interval = setInterval(this.reloadData, this.reloadInterval)
      } else {
        clearInterval(this.interval)
      }
    },
    async loadData () {
      this.loading = true
      let params = this.getRequestParams()
      await this.getData(params)
      this.loading = false
      this.onNewData(this.dataFromStore)
    },
    async reloadData (clear = false) {
      this.loading = true
      let params = this.getRequestParams()
      if (clear && this.filterOptions) {
        Object.keys(this.filterOptions).map(key => {
          this.$set(this.filterOptions, key, '')
        })
        params = {}
      }
      await this.getData(params)
      this.onNewData(this.dataFromStore)
      this.loading = false
    },
    onNewData (data) {
      this.data = this._dictionaryMiddleware(data)
      // this.pageSize = response.data.countOfPages;
      this.dataCount = data.totalItems
      this.$emit('data-loaded', data)
    },
    getRequestParams () {
      let params = {
        limit: this.limit,
        page: this.currentPage,
        deleted: false
      }

      forEach(this.filterParams, (value, key) => {
        params[`${key}`] = value
      })

      forEach(this.sortParams, (value, key) => {
        params[`order[${key}]`] = value
      })
      return params
    },
    async filter (column, value) {
      if (!column.filterable) return

      let filterField = column.filterField ? column.filterField : column.field

      if (value && value.length) {
        this.filterParams[filterField] = value
      } else {
        delete this.filterParams[filterField]
      }

      let params = this.getRequestParams()
      if (this.$store.getters.dateFilterToOrder) {
        params['shift.dateStart'] = this.$store.getters.dateFilterToOrder
      }
      await this.getData(params)
      this.data = this._dictionaryMiddleware(this.dataFromStore)
      this.onNewData(data)
      this.$router.push({
        name: this.$route.name,
        query: {
          page: this.currentPage,
          limit: this.limit,
          ...this.filterParams
        }
      })
    },
    async sort (column, sortType) {
      this.sortParams = {
        [column.filterField]: sortType
      }

      let params = this.getRequestParams()

      await this.getData(params)
      this.data = this._dictionaryMiddleware(this.dataFromStore.items)
      this.$router.push({
        name: this.$route.name,
        query: {
          page: this.currentPage,
          limit: this.limit,
          ...this.filterParams
        }
      })
    },
    findActionObject (key) {
      if (this.actions && this.actions.length > 0) {
        return this.actions.find(function (action) {
          if (typeof action === 'object' && action.key === key) {
          }
          return typeof action === 'object' && action.key === key
        })
      }
    },
    onInfo (data) {
      let actionObject = this.findActionObject('info')
      if (actionObject && actionObject.handler) {
        actionObject.handler(data)
        return
      }
      this.$router.push({
        name: `${this.module}.info`,
        params: { id: data.row.id }
      })
    },
    onEdit (data) {
      let actionObject = this.findActionObject('edit')
      if (actionObject && actionObject.handler) {
        actionObject.handler(data)
        return
      }
      this.$router.history.push({
        name: `${this.module}.edit`,
        params: { id: data.row.id }
      })
    },
    onDelete (data) {
      let actionObject = this.findActionObject('remove')
      if (actionObject && actionObject.handler) {
        actionObject.handler(data)
        return
      }
      this.temp = data

      this.$confirm('Вы уверены, что хотите удалить элемент?', '', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(this.onDialogConfirm)
    },
    async onDialogConfirm () {
      this.state.$_deleting = this.temp.index
      this.$forceUpdate()
      try {
        await this.deleteItem(this.temp.row.id)
        this.$message({
          message: 'Удаление успешно',
          type: 'success'
        })
        this.loadData()
        this.temp = {}
      } catch (err) {
        console.log(err)
        if (err.response && err.response.data.detail) {
          this.$message({
            message: err.response.data.detail,
            type: 'error'
          })
        } else {
          console.error(err)
        }
      }
      this.state.$_deleting = null
    },
    onPageSizeChange (size) {
      this.pageSize = this.limit = size
      this.currentPage = 1
      this.loadData()
      this.$router.replace({ query: { page: this.currentPage, limit: size } })
    },
    onCurrentPageChange (current) {
      this.currentPage = current
      this.loadData()
      this.$router.replace({ query: { page: current, limit: this.limit } })
    },

    async loadDropdowns () {
      this.columns.forEach(column => {
        if (!column.filterDropdown) return

        if (column.filterOptions && !column.loadOptions) return

        if (column.loadOptions) {
          column.filterOptions = []
          column.loadOptions().then(response => {
            column.filterOptions = response
          })
        } else {
          console.error('loadOption prop must be a function')
        }
      })
    },
    _dictionaryMiddleware ({ items }) {
      const arr = []
      this.columns.forEach((column, index) => {
        if (column.hasOwnProperty('dictionary')) {
          arr.push({ field: column.field, index })
        }
        // post-processing values if needed
        if (column.hasOwnProperty('handleValue')) {
          items.forEach(item => {
            item[column.field] = column.handleValue(item[column.field], item)
          })
        }
      })
      arr.forEach(obj => {
        items.map(item => {
          if (item.hasOwnProperty(obj.field)) {
            item[obj.field] = this.columns[obj.index].dictionary[
              item[obj.field][0]
            ]
          }
        })
      })
      return items
    }
  }
}
</script>
<style lang="sass">
  .button__view
    margin: 3px 3px 0 3px
    text-align: center

    .table .sorting input::placeholder
      color: #9c9c9c
      font-weight: 400
</style>
