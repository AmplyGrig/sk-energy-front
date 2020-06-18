<template>  
        <v-container
          class="fill-height lk-body lk-admin"
          fluid
          >
          <v-card  class="mx-auto"
              width="100%"
              >
              <v-row  class="mx-10" >
                <v-text-field
                    label="Искать"
                    prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
              </v-row>
          </v-card>
          <v-spacer style="max-height: 30px; height:30px; width: 100%;"></v-spacer>
          <div class="logoUsers">
              <v-list-item-content>Пользователи</v-list-item-content>
              <v-overflow-btn
                class="my-2"
                outlined
                color="white"
                items="['по дате', 'по алфавиту']"
                label="Сортировать"
                target="#dropdown-example-1"
                ></v-overflow-btn>
          </div>
          <v-card  class="mx-auto"
              width="100%"
              >
              <v-list>
                <template v-for="(item, index) in usersList">
                    <v-divider
                      v-if="index > 0"
                      :key="index"
                      ></v-divider>
                    <v-list-item
                      :key="item"
                      >
                      <v-list-item-avatar>
                          <v-avatar color="#232020" >
                            <span class="white--text headline">ИИ</span>
                          </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                          <v-list-item-title>{{item.user_name}}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                          {{item.object_name}}
                      </v-list-item-content>
                      <v-list-item-icon>
                          <v-btn   :to="'/lkadmin/' + item.object_id"  color="#232020" dark>Смотреть</v-btn>
                      </v-list-item-icon>
                    </v-list-item>
                </template>
              </v-list>
          </v-card>
        </v-container>
</template>
<script>
import axiosAuth from "@/api/axios-auth"

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    usersList: null
  }),
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
    },
    getUserList(){
      axiosAuth.get("/get-users").then((response) => {
        console.log(response.data)
        this.usersList = response.data.users
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created(){
    this.getUserList()
  }
}
</script>
<style>
.lk-admin .v-list-item__content{
      margin-left: 50px;
}
div.logoUsers {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logoUsers .v-list-item__content {
    font-size: 25px;
}
.logoUsers .v-input {
    max-width: 200px;
        width: 200px!important;
       
}
.logoUsers  .v-input__slot{
   background: white!important;
   cursor: pointer;
}
.v-menu__content{
   max-width: 200px!important;
}
.v-list-item__title, .v-btn__content{
font-family: "Exo 2"!important;
}

</style>