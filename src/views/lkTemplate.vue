<template>  
  <div class="mainLk">
    <v-navigation-drawer
        v-model="drawer"
        permanent
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
              <v-list-item-content>
                <v-list-item-title class="userName">{{ name }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-group value="true">
            <template v-slot:activator :expand="True">
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Объекты</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="item in objectsItems" v-bind:key="item._id" :href="'/lk/main/'+item._id">
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
               <v-list-item-action>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Добавить объект</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item link to="/lk/about">
              <v-list-item-action>
                <v-icon>mdi-flash</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Об энергосервисе</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/lk/settings">
              <v-list-item-action>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Личный кабинет</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense>
          <v-list-item @click="onLogOut()">
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
         <v-row class="my-3 mx-10" justify="end">
        <router-link to="/lk/notify">
              <v-badge
                :content="messages"
                :value="messages"
                color="yellow"
                overlap
              >
                 <v-icon >mdi-bell</v-icon>
              </v-badge>
             </router-link>
         </v-row>
        <router-view></router-view>
    </v-content>
  </div>
</template>
<script> 
import axiosAuth from "@/api/axios-auth"

  export default {
    components: {
    },
    props: {
      source: String,
    },
    data() {
      return{
        messages: 0,
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
            this.$alert(error.response.data.reasons[0])
          })
        })
      },
      deleteObject(objectName, objectId){
        this.$confirm("Вы уверены, что хотите удалить объект?").then(() => {
          axiosAuth.post('/delete-object', { object_name: objectName, object_id: objectId}).then(() => {
            this.getObjectList()
            this.$router.replace('/lk');
          }).catch(error => {
            console.log(error)
            this.$alert('Не удалось удалить объект')
          })
        });
      },
      getObjectList(){
        document.querySelector("body").style.minWidth = "1200px";
        axiosAuth.get('/get-object-list').then(response => {
          this.objectsItems = response.data.objects
        }).catch((error) => {
          console.log(error)
          this.$alert('Не удалось получить список объектов')
        })
      },
      getNotifyCount(){
        axiosAuth.get('/get-notify-count').then(response => {
           this.messages = response.data.messages
          console.log(response.data.messages)
        }).catch((error) => {
          console.log(error)
        })
      },
      onLogOut(){
        this.$store.dispatch('auth/logout')
      }
    },
    created () {
      this.getObjectList()
      this.getNotifyCount()
    },
  }
</script>
<style>
.mainLk .v-content__wrap {
  background: #ececee;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    min-height: 100vh;
}
.mainLk .v-content__wrap > div{
   display: flex;
   flex-direction: column;
   align-items: flex-end;
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
.swal2-styled.swal2-confirm {
    background-color: #151414!important;
    border-left-color: rgb(21, 20, 20)!important;
    border-right-color: rgb(21, 20, 20)!important;
}
.swal2-file:focus, .swal2-input:focus, .swal2-textarea:focus {
    border-color:#151414!important;
    outline: 0;
    box-shadow: 0 0 3px #c4e6f5;
}
.theme--light.v-list-item--active:hover::before, .theme--light.v-list-item--active::before {
    opacity: 0.12;
    background: #858ac1;
}
.theme--light.v-list-item:hover::before {
    opacity: 0.06;
    background: #858ac1;
}
.mainLk *{
  color: black;
  font-family: "Exo 2"!important;
}
.v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle {
    line-height: 2rem!important;
}
.userName {
    text-align: center;
}
.swal2-content{
    font-family: "Exo 2"!important;
}
.swal2 *{
font-family: "Exo 2"!important;
}
.swal2-title, button.swal2-styled{
  font-family: "Exo 2"!important;
}

.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    font-weight: bold;
}

.month-input > i.v-icon.notranslate.mdi.mdi-check.theme--light {
    left: 75%;
}
select.swal2-select {
    border: 1px solid #161515;
    outline: none;
    cursor: pointer;
}
.v-content .v-icon.v-icon {
    color: black!important;
}
</style>