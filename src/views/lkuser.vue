<template>  
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
                <v-form>
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
                            v-model="company_name"
                            outlined
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
                            v-model="lastname"
                            outlined
                            label="Фамилия"
                            ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="phone"
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
                            v-model="middlename"
                            outlined
                            label="Отчество"
                            ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="3"
                          >
                          <v-text-field
                            v-model="email"
                            outlined
                            label="E-mail"
                            ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn class="ma-2"  @click='updateMyUser()' outlined color="#232020">Сохранить</v-btn>
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
                <v-form>
                    <v-checkbox
                      v-model="checkbox1"
                      @change="updateMyUserFlag()"
                      label="Уведомлять об изменении статуса документа по почте"
                      required
                      ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox2"
                      @change="updateMyUserFlag()"
                      label="Напоминать о добавлении нового документа ежемесячно"
                      required
                      ></v-checkbox>
                </v-form>
              </v-container>
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
      firstname: '',
      middlename: '',
      lastname: '',
      phone: '',
      email: '',
      company_name: '',
      drawer: null,
      objectsItems: '',
      checkbox1:false,
      checkbox2: false,
      name: localStorage.getItem('email')
    }),
    methods: {
      logout(){
        this.$store.dispatch('auth/logout')
      },
      getMyUser(){
        axiosAuth.get('/get-my-user').then(response => {
          let userInfo = response.data
          this.firstname = userInfo.user_name.split(' ')[0]
          this.middlename = userInfo.user_name.split(' ')[1]
          this.lastname = userInfo.user_name.split(' ')[2]
          this.email = userInfo.email
          this.company_name = userInfo.company_name
          this.phone = userInfo.phone
          this.checkbox1 = userInfo.allowEmail
          this.checkbox2 = userInfo.notifyByEmail
        }).catch((error) => {
          console.log(error)
          this.$alert('Не удалось получить информацию о пользователе')
        })
      }
      ,
      updateMyUser(){
        let dataToPost = {
            "email": this.email,
            "user_name": [this.firstname, this.middlename, this.lastname].join(' '),
            "phone": this.phone,
            "company_name": this.company_name,
        }
        axiosAuth.post('/update-my-user',dataToPost).then(() => {
          this.$alert('Информация изменена')
        }).catch((error) => {
          console.log(error)
            this.$alert('Не удалось изменить информацию о пользователе')
        })
      },      
      updateMyUserFlag(){
        let dataToPost = {
          "allowEmail": this.checkbox1, 
          "notifyByEmail": this.checkbox2  
        }
        axiosAuth.post('/update-my-user',dataToPost).then(() => {
        }).catch((error) => {
          console.log(error)
            this.$alert('Не удалось изменить информацию о пользователе')
        })
      }
    },
    created () {
      this.getMyUser()
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