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
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar color="#232020" >
           <span class="white--text headline">ИИ</span>
    </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>ФИО</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
       <v-btn to="/lkadmin" class="ma-2" outlined color="#232020">Назад</v-btn>
        </v-list-item-icon>


      </v-list-item>
 </v-card>

   <v-spacer style="max-height: 30px; height:30px; width: 100%;"></v-spacer>

          <v-expansion-panels
          multiple
          accordion>
          <v-expansion-panel key="personalData">
      <v-expansion-panel-header>Персональные данные</v-expansion-panel-header>
      <v-expansion-panel-content>
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
            disabled
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
            disabled
            autocomplete="current-password"
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
            disabled
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
            disabled
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
            disabled
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
            disabled
            label="E-mail"
          ></v-text-field>
        </v-col>
    </v-row>
    </v-form>
    </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel key="mainDocs">
      <v-expansion-panel-header>Основные документы</v-expansion-panel-header>
      <v-expansion-panel-content>
        <mainDocs page="true"></mainDocs>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel key="teplDocs">
      <v-expansion-panel-header>Договор теплоснабжения</v-expansion-panel-header>
      <v-expansion-panel-content>
        <simpleList page="true"></simpleList>
      </v-expansion-panel-content>
    </v-expansion-panel>
     <v-expansion-panel key="energyAct">
      <v-expansion-panel-header>Акты поставки энергоресурсов</v-expansion-panel-header>
      <v-expansion-panel-content>
        <coolList page="true"></coolList>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel key="pribor">
      <v-expansion-panel-header>Показания приборов учета тепловой энергии</v-expansion-panel-header>
      <v-expansion-panel-content>
        <coolList page="true"></coolList>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel key="uuteAct">
      <v-expansion-panel-header>Акт приемки на коммерческий учет УУТЭ</v-expansion-panel-header>
      <v-expansion-panel-content>
        <simpleList page="true"></simpleList>
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
.lk-admin .v-list-item__content{
      margin-left: 50px;
}
.v-btn--active::before {
    opacity: 0!important;
}
.v-text-field__slot label {
    font-size: 13px!important;
}
.v-btn.v-btn--flat{
          pointer-events: all!important;
}
</style>