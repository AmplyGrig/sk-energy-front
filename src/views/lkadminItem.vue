<template>  
  <v-container
    class="fill-height lk-body lk-admin"
    fluid
    >
    <v-card  class="mx-auto"
        width="100%"
        >
        <v-list-item>
          <v-list-item-content>
              <v-list-item-title>{{ userInfo.user_name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
              <v-btn to="/lkadmin" class="ma-2" outlined color="#232020">Назад</v-btn>
          </v-list-item-icon>
        </v-list-item>
    </v-card>
    <v-spacer style="max-height: 30px; height:30px; width: 100%;"></v-spacer>
    <v-expansion-panels
        multiple>
        <v-expansion-panel key="personalData">
          <v-expansion-panel-header>Персональные данные</v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-container>
                <v-form class="user-info-card">
                    <v-row>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="userInfo.user_name.split(' ')[0]"
                            outlined
                            disabled
                            label="Имя"
                            ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="userInfo.company_name"
                            outlined
                            disabled
                            label="Наименование организации"
                            ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="userInfo.user_name.split(' ')[2]"
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
                            v-model="userInfo.phone"
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
                            v-model="userInfo.user_name.split(' ')[1]"
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
                            v-model="userInfo.email"
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
              <simpleList page="true" list-key="teplDocs"></simpleList>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel key="energyAct">
          <v-expansion-panel-header>Акты поставки энергоресурсов</v-expansion-panel-header>
          <v-expansion-panel-content>
              <coolList page="true" list-key="energyActs"></coolList>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel key="pribor">
          <v-expansion-panel-header>Показания приборов учета тепловой энергии</v-expansion-panel-header>
          <v-expansion-panel-content>
              <coolList page="true" list-key="priborStats"></coolList>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel key="uuteAct">
          <v-expansion-panel-header>Акт приемки на коммерческий учет УУТЭ</v-expansion-panel-header>
          <v-expansion-panel-content>
              <simpleList page="true" list-key="uuteAct" item = uuteItem></simpleList>
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
  data: () => ({
    drawer: null,
    uuteItem: [],
    userInfo: []
  }),
  methods: {
    getUserInfo(){
      axiosAuth.post('/get-user-info', { object_id: this.$route.params.item }).then((response) => {
        console.log(response)
        this.userInfo = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getUserInfo()
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
.user-info-card *{
  color:black!important
}
.v-btn.v-btn--flat{
          pointer-events: all!important;
}
</style>