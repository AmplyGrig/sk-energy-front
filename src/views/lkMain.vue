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
            <v-list-item-title class="userName">Имя Фамилия</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/lkmain">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
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
      <v-card  class="mx-auto"
            width="100%"
          >
        <mainDocs page="false"></mainDocs>
      </v-card>

      <v-spacer style="max-height: 50px; height:50px; width: 100%;"></v-spacer>

          <v-expansion-panels
          multiple
          accordion>
    <v-expansion-panel key="teplDocs">
      <v-expansion-panel-header>Договор теплоснабжения</v-expansion-panel-header>
      <v-expansion-panel-content>
        <simpleList page="false"></simpleList>
      </v-expansion-panel-content>
    </v-expansion-panel>
     <v-expansion-panel key="energyAct">
      <v-expansion-panel-header>Акты поставки энергоресурсов</v-expansion-panel-header>
      <v-expansion-panel-content>
        <coolList page="false"></coolList>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel key="pribor">
      <v-expansion-panel-header>Показания приборов учета тепловой энергии</v-expansion-panel-header>
      <v-expansion-panel-content>
        <coolList page="false"></coolList>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel key="uuteAct">
      <v-expansion-panel-header>Акт приемки на коммерческий учет УУТЭ</v-expansion-panel-header>
      <v-expansion-panel-content>
        <simpleList page="false"></simpleList>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>




      </v-container>
    </v-content>
    
    
</div>
</template>
<script> 
import coolList from "@/views/adminPage.vue";
import simpleList from "@/views/simpleList.vue";
import mainDocs from "@/views/mainDocs.vue";
  export default {
     components: {
    coolList,
    simpleList,
    mainDocs
  },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
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
   flex-direction:column;
   justify-content: flex-start;
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
</style>