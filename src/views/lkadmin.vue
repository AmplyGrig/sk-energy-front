<template>  
<div class="mainLk">
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
            <v-list-item-title class="userName">Администратор</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/lkadmin">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Пользователи</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
      </v-list>
      <v-list dense>
        <v-list-item>
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
      <div class="logoUsers"><v-list-item-content>Пользователи</v-list-item-content><v-overflow-btn
      class="my-2"
      outlined
      color="white"

      items="['по дате', 'по алфавиту']"
      label="Сортировать"
      target="#dropdown-example-1"
    ></v-overflow-btn></div>
     <v-card  class="mx-auto"
            width="100%"
          >

    <v-list>
    <template v-for="(item, index) in [1,2,3,4,5]">
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
          <v-list-item-title>ФИО</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
       Сегодня в 12.07
        </v-list-item-content>
        <v-list-item-icon>
        <v-btn   :to="'/lkadmin/' + index"  color="#232020" dark>Смотреть</v-btn>
        </v-list-item-icon>


      </v-list-item>
      </template>
    </v-list>
      </v-card>
        




      </v-container>
    </v-content>
    
    
</div>
</template>
<script> 
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    methods: {
      logout(){
        this.$store.dispatch('auth/logout')
      }
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