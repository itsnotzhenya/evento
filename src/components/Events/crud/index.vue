<template>
  <div>
    <base-crud
      v-loading="loading"
      :module="`Events`"
      :action="action"
      create
      edit
      :id="id"
      @save="saveEvent"
    >
      <template slot="crud-title">Событие</template>
      <template slot="crud-content">
        <el-form
          ref="form"
          :disabled="action === 'read'"
          label-position="left"
          :show-message="true"
          :model="event"
          :rules="rules"
        >
          <el-row class="form__row">
            <el-col :span="10">
              <el-form-item prop="name" label="Название">
                <el-input v-model="event.name" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="description" label="Описание">
                <el-input v-model="event.description" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="date" label="Дата">
                <el-date-picker v-model="event.date" type="date" format="dd.MM.yyyy"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="time" label="Время">
                <el-input v-model="event.time" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="title" label="Заголовок">
                <el-input v-model="event.title" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="type" label="Тип">
                <el-input v-model="event.type" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="price" label="Стоимость">
                <el-input v-model="event.price" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="active" label="Активность">
                <el-switch v-model="event.active" />
              </el-form-item>
            </el-col>
            <el-col :span="10" v-if="event.imageUrl && event.imageUrl.path">
              <img
                class="file"
                width="300"
                style="margin-bottom: 20px;"
                :src="`/uploads/${event.imageUrl.path}`"
                alt="file"
              />
            </el-col>
            <el-col :span="4" v-if="action !== 'read'">
              <el-form-item prop="file">
                <el-upload
                  class="upload-demo"
                  action="http://192.168.1.64:8181/api/files"
                  accept="image/jpeg, image/jpg, image/png"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="createImage"
                >
                  <el-button size="uploader small" type="primary">Загрузить фотографию</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="createdBy" label="Создатель">
                <el-input v-model="event.createdBy" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="street" label="Улица">
                <el-input v-model="event.street" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="streetNumber" label="Номер дома">
                <el-input v-model="event.streetNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="city" label="Город">
                <el-input v-model="event.city" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="address" label="Адрес">
                <el-input v-model="event.address" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="phone" label="Координаты: ширина">
                <el-input v-model="event.lat" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="phone" label="Координаты: долгота">
                <el-input v-model="event.lng" />
              </el-form-item>
            </el-col>
            <div class id="points-map" style="height: 500px"></div>
          </el-row>
        </el-form>
      </template>
    </base-crud>
  </div>
</template>

<script>
import BaseCrud from "@/components/BaseCRUD/view";
import { rolesMap } from "@/helpers/roles";
import crudMixin from "@/mixins/crudMixin";
import eventsApi from "@/api/events";

export default {
  name: "EventsCrud",
  components: { BaseCrud },
  mixins: [crudMixin],
  data() {
    return {
      event: {
        name: "",
        description: "",
        date: "",
        time: "",
        title: "",
        type: "",
        price: "",
        active: false,
        imageUrl: "",
        createdBy: "",
        streetNumber: "",
        street: "",
        city: "",
        address: "",
        lat: 0,
        lng: 0
      },
      subEntities: [],
      loading: false,
      entityName: "events",
      mainObjectName: "event",
      roles: rolesMap,
      rules: {}
    };
  },
  computed: {
    adminIncludes() {
      return this.user.roles.includes("ROLE_ADMIN");
    }
  },
  async mounted() {
    await this.loadData();
    this.initMap();
  },
  methods: {
    initMap() {
      const onMapsReady = () => {
        let placemark = null
        let myMap = new ymaps.Map("points-map", {
            center: [47.23153761096641, 39.73171234130842],
            zoom: 12,
            controls: []
          }),
          mySearchControl = new ymaps.control.SearchControl({
            options: {
              noPlacemark: true
            }
          }),
          mySearchResults = new ymaps.GeoObjectCollection(null, {
            hintContentLayout: ymaps.templateLayoutFactory.createClass(
              "$[properties.name]"
            )
          });
        if (this.event.lat && this.event.lng) {
           placemark = new ymaps.Placemark(
            [this.event.lat, this.event.lng],
            {},
            {
              preset: "islands#blueIcon"
            }
          );
          myMap.geoObjects.add(placemark);
        }
        myMap.controls.add(mySearchControl);
        myMap.geoObjects.add(mySearchResults);
        mySearchControl.events
          .add("resultselect", e => {
            let index = e.get("index");
            mySearchControl.getResult(index).then(res => {
              mySearchResults.add(res);
              if (placemark === null) {
                placemark = new ymaps.Placemark(
                  [res.geometry._coordinates[0], res.geometry._coordinates[1]],
                  {},
                  {
                    preset: "islands#blueIcon"
                  }
                );
                this.event.lat = res.geometry._coordinates[0];
                this.event.lng = res.geometry._coordinates[1];
                mySearchControl.clear();
              } else {
                myMap.geoObjects.remove(placemark);
                placemark = new ymaps.Placemark(
                  [res.geometry._coordinates[0], res.geometry._coordinates[1]],
                  {},
                  {
                    preset: "islands#blueIcon"
                  }
                );
                this.event.lat = res.geometry._coordinates[0];
                this.event.lng = res.geometry._coordinates[1];
                mySearchControl.clear();
              }
            });
          })
          .add("submit", function() {
            mySearchResults.removeAll();
          });

        myMap.events.add("click", e => {
          var coords = e.get("coords");
          this.event.lat = coords[0];
          this.event.lng = coords[1];
          if (placemark === null) {
            mySearchResults.removeAll();
            placemark = new ymaps.Placemark(
              [this.event.lat, this.event.lng],
              {},
              {
                preset: "islands#blueIcon"
              }
            );
            myMap.geoObjects.add(placemark);
          } else {
            mySearchResults.removeAll();
            myMap.geoObjects.remove(placemark);
            placemark = new ymaps.Placemark(
              [this.event.lat, this.event.lng],
              {},
              {
                preset: "islands#blueIcon"
              }
            );
            myMap.geoObjects.add(placemark);
          }
        });
      };
      ymaps.ready(onMapsReady);
    },
    async createImage({ raw }) {
      const data = new FormData();
      data.append("file", raw);
      try {
        this.loading = true;
        const file = await this.$store.dispatch("events/postFile", data);
        this.event.imageUrl = file;
        this.loading = false;
      } catch (e) {
        this.$message.error(e.response.data.detail);
      }
    },
    async saveEvent() {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error("Заполните поля");
        try {
          const data = { ...this.event };
          if (data.imageUrl) data.imageUrl = `api/files/${data.imageUrl.id}`;
          this.loading = true;
          await this.$store.dispatch("app/saveEntity", {
            id: this.id,
            method: this.saveMethod,
            entityName: this.entityName,
            data
          });
          this.$router.push(`/${this.entityName}`);
          this.$message.success("Успешно сохранено");
          return true;
        } catch (e) {
          let errors = e.response.data.violations;
          errors.forEach((error, index) => {
            let timeout = (index + 1) * 100;
            setTimeout(() => {
              this.$message.error(`${error.propertyPath}: ${error.message}`);
            }, timeout);
          });
          return false;
        } finally {
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.el-input {
  width: 100% !important;
}
.date-picker {
  width: 100% !important;
}
.form__row {
  display: flex;
  flex-direction: column;
}
.ymap-container {
  width: 100%;
  height: 100%;
}
.file img {
  max-width: 300px;
}
</style>
