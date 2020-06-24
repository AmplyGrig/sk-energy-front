<template>  
        <v-container
          class="fill-height lk-body"
          fluid
          >
          <v-card  class="mx-auto"
              width="100%"
              v-if="Object.keys(this.$route.params).length !== 0"
              >
              <mainDocs page="false" 
                
              ></mainDocs>
          </v-card>
                <div class="lk-hello" v-else>
                <h1 class="lk-title">Добро пожаловать в личный кабинет!</h1>
                <h3 class="lk-subtitle">Для начала работы, нужно добавить или выбрать объект</h3>
              </div>
          <v-spacer style="max-height: 50px; height:50px; width: 100%;"></v-spacer>
          <v-expansion-panels
              v-if="Object.keys(this.$route.params).length !== 0"
              multiple
              accordion>
              <v-expansion-panel key="teplDocs">
                <v-expansion-panel-header>Договор теплоснабжения</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <simpleList page="false" list-key="teplDocs"></simpleList>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel key="energyActs">
                <v-expansion-panel-header>Акты поставки энергоресурсов</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <coolList page="false" list-key="energyActs"></coolList>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel key="priborStats">
                <v-expansion-panel-header>Показания приборов учета тепловой энергии</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <coolList page="false" list-key="priborStats"></coolList>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel key="uuteAct">
                <v-expansion-panel-header>Акт приемки на коммерческий учет УУТЭ</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <simpleList page="false" list-key="uuteAct"></simpleList>
                </v-expansion-panel-content>
              </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
</template>
<script> 
import coolList from "@/views/adminPage.vue";
import simpleList from "@/views/simpleList.vue";
import mainDocs from "@/views/mainDocs.vue";
import axiosAuth from "@/api/axios-auth"

  export default {
    components: {
      coolList,
      simpleList,
      mainDocs
    },
    props: {
      source: String,
    },
    data() {
      return{
        drawer: null,
        objectsItems: [],
        name: localStorage.getItem('email')
      }
    },
    methods: {
      addObject(){
        this.$prompt("Введите название объекта").then((text) => {
          axiosAuth.post('/add-object', { object_name: text}).then(() => {
            this.getObjectList()
          }).catch(error => {
            console.log(error)
            this.$alert('Не удалось добавить объект')
          })
        })
      },
      deleteObject(objectName, objectId){
        this.$confirm("Вы уверены, что хотите удалить объект?").then(() => {
          axiosAuth.post('/delete-object', { object_name: objectName, object_id: objectId}).then(() => {
            this.getObjectList()
            this.$router.replace({name: 'lk_main'})
          }).catch(error => {
            console.log(error)
            this.$alert('Не удалось удалить объект')
          })
        });
      },
      getObjectList(){
        axiosAuth.get('/get-object-list').then(response => {
          this.objectsItems = response.data.objects
        }).catch((error) => {
          console.log(error)
          this.$alert('Не удалось получить список объектов')
        })
      }
    },
    created () {
      this.getObjectList()
    },
  }
</script>
<style>
.mainLk .v-content__wrap {
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    min-height: 100vh;
}
.mainLk .v-content__wrap > div{
   display: flex;
}
.v-navigation-drawer__content .v-list-item__title {
    font-size: 17px!important;
}
.container.fill-height {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    min-width: 100%!important;
    min-height: 100vh!important;
}
.lk-hello {
    text-align: center;
    padding: 100px 0px;
    margin: auto;
}
</style>