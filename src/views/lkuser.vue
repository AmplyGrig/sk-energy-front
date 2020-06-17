<template>  
  <div>
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        class="dark flex-column"
        >
        <v-list dense class="mainmenulk">
          <v-list-item >
              <v-list-item-action>
                <v-img src="@/assets/img/3.png" contain  height="50px" width="50px"></v-img>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="logolk">Личный кабинет</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-item >
              <v-list-item-action>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="userName">{{ name }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator :expand="True">
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Объекты</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="item in objectsItems" v-bind:key="item._id" :to="'/lkmain/'+item._id">
                <v-list-item-content>
                  <v-list-item-title>{{item.object_name}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action @click.prevent="deleteObject(item.object_name, item._id)">
                  <v-btn icon>
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-list-item @click="addObject()">
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-list-item-content>
                  <v-list-item-title>Добавить объект</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item link to="/lkabout">
              <v-list-item-action>
                <v-icon>mdi-flash</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Об энергосервисе</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-item link to="lksettings">
              <v-list-item-action>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Личный кабинет</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense>
          <v-list-item @click.stop="right = !right">
              <v-list-item-action>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Log out</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-content>
        <v-container
          class="fill-height lk-body"
          fluid
          >
          <v-card
              class="mx-auto"
              width="100%"
              >
              <v-row class="mx-auto"  justify="space-between">
                <v-col cols="2">
                    Мой профиль
                </v-col>
                <v-btn @click="logout()" class="ma-2" outlined color="#232020">Выйти</v-btn>
              </v-row>
          </v-card>
          <v-spacer style="height: 30px;width: 100%;"></v-spacer>
          <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Фото профиля</v-list-item-title>
                <v-list-item-subtitle>Формат и размер</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
          <v-row class="mx-10 align-center" >
              <v-col class="photo-settings" cols="12" md="7" justify="space-around">
                <v-avatar color="#232020" size="200">
                    <span class="white--text headline">ИИ</span>
                </v-avatar>
                <v-btn    x-large color="#232020" dark>Загрузить изображение</v-btn>
              </v-col>
          </v-row>
          <v-spacer style="height: 30px;width: 100%;"></v-spacer>
          <v-card
              class="mx-auto"
              width="100%"
              >
              <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Персональные данные</v-list-item-title>
                    <v-list-item-subtitle>Ваши учетные данные для входа и имя, отображаемые в отчетах.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-container>
                <v-form v-model="valid">
                    <v-row>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="firstname"
                            outlined
                            label="Имя"
                            ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="firstname"
                            outlined
                            label="Наименование организации"
                            ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="firstname"
                            outlined
                            type="password"
                            label="Пароль"
                            ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="firstname"
                            outlined
                            label="Фамилия"
                            ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="firstname"
                            outlined
                            label="Телефон"
                            ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="firstname"
                            outlined
                            label="Отчество"
                            ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="firstname"
                            outlined
                            label="E-mail"
                            ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn class="ma-2" outlined color="#232020">Сохранить</v-btn>
                </v-form>
              </v-container>
          </v-card>
          <v-spacer style="height: 30px;width: 100%;"></v-spacer>
          <v-card
              class="mx-auto"
              width="100%"
              >
              <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Настройки</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-container>
                <v-form v-model="settings">
                    <v-checkbox
                      v-model="checkbox1"
                      label="Уведомлять об изменении статуса документа по почте"
                      required
                      ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox2"
                      label="Напоминать о добавлении нового документа ежемесячно"
                      required
                      ></v-checkbox>
                </v-form>
              </v-container>
          </v-card>
        </v-container>
    </v-content>
  </div>
</template>
<script> 
import axiosAuth from "@/api/axios-auth"
export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      objectsItems: '',
      name: localStorage.getItem('email')
    }),
    methods: {
      logout(){
        this.$store.dispatch('auth/logout')
      },
      addObject(){
        this.$prompt("Введите название объекта").then((text) => {
          axiosAuth.post('/add-object', { object_name: text}).then(() => {
            this.getObjectList()
          }).catch(error => {
            console.log(error)
            this.$alert(error.response.data.reasons)
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
.dark {
    background: #232020!important;
}
.dark i {
    color: white!important;
}
.dark .v-list-item__title {
    color: white!important;
}
.mainmenulk{
    flex: 1;
}
.dark .v-navigation-drawer__content {
    height: 100vh;
    overflow-y: auto;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
}
.v-list-item__title.logolk {
    font-size: 17px!important;
    color: #fcdc00!important;
}
.lk-body{
  background: #ECECEE!important;
}
.photo-settings{
      justify-content: space-around;
    display: flex;
    align-items: center;
}
</style>