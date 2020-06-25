<template>  
  <div class="mainLk">
    <v-navigation-drawer
        app
        clipped
        permanent
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
        <router-view></router-view>
    </v-content>
  </div>
</template>
<script>

  export default {
    components: {
    },
    methods: {
      onLogOut(){
        this.$store.dispatch('auth/logout')
      },
      onCreate(){
        document.querySelector("body").style.minWidth = "1200px";
      }

    },
    created(){
      this.onCreate()
    }
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
.v-list--dense .v-list-item .v-list-item__title{
    line-height: 2rem;
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
    flex-direction: column;
}
</style>