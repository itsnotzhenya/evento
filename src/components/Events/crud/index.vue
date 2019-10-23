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
                <el-input v-model="event.date" />
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
            <el-col :span="10">
              <el-form-item prop="imageUrl" label="imageUrl">
                <el-input v-model="event.imageUrl" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="createdBy" label="Создатель">
                <el-input v-model="event.createdBy" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="streetNumber" label="streetNumber">
                <el-input v-model="event.streetNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="street" label="Улица">
                <el-input v-model="event.street" />
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
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let event = this.event;
      var placemark = null;
      const onMapsReady = () => {
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
        myMap.controls.add(mySearchControl);
        myMap.geoObjects.add(mySearchResults);
        mySearchControl.events
          .add("resultselect", e => {
            let index = e.get("index");
            mySearchControl.getResult(index).then((res) => {
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
                mySearchControl.clear()
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
                mySearchControl.clear()
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
            mySearchResults.removeAll()
            placemark = new ymaps.Placemark(
              [event.lat, event.lng],
              {},
              {
                preset: "islands#blueIcon"
              }
            );
            console.log("one", placemark);
            myMap.geoObjects.add(placemark);
          } else {
            mySearchResults.removeAll()
            myMap.geoObjects.remove(placemark);
            placemark = new ymaps.Placemark(
              [event.lat, event.lng],
              {},
              {
                preset: "islands#blueIcon"
              }
            );
            console.log("two", placemark);
            myMap.geoObjects.add(placemark);
          }
        });
      };
      ymaps.ready(onMapsReady);
    },
    async saveEvent() {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error("Заполните поля");
        try {
          const data = { ...this.event };
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
            if (
              error.propertyPath === "usernameCanonical" ||
              error.propertyPath === "username"
            )
              return;
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

<style>
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
</style>
