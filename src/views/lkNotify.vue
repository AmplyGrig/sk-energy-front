<template>  
        <v-container
          class="fill-height lk-body"
          fluid
          >
         <v-card  class="mx-auto"
              width="100%"
              >
              <v-list>
                <template v-for="(item, index) in notifyList">
                    <v-divider
                      v-if="index > 0"
                      :key="index"
                      ></v-divider>
                    <v-list-item
                      :key="index"
                      >
                      <v-list-item-content>
                          <v-list-item-title>{{item.name}}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                          {{item.comment}}
                      </v-list-item-content>
                      <!-- <v-list-item-icon>
                          <v-btn   :to="item.upload_url"  color="#232020" dark>Загрузить</v-btn>
                      </v-list-item-icon> -->
                    </v-list-item>
                </template>
              </v-list>
          </v-card>
        </v-container>
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
        notifyList: [],
        drawer: null,
        objectsItems: {
          'passport_pute':'Паспорт ПУТЭ',
          'teplDocs': 'Договор теплоснабжения',
          'project_uute': 'Проект УУТЭ',
          'tech_conditions':'Тех. условия на присоединение',
          'tech_passport': 'Технический паспорт',
          'cadastr_passport': 'Кадастровый паспорт',
          'recvisits':'Реквизиты',
          'energyActs': 'Акты поставки энергоресурсов',
          'priborStats': 'Показания приборов учета тепловой энергии',
          'uuteAct':'Акт приемки на коммерческий учет УУТЭ',
        },
        month:[
          '','январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'
        ],
        name: localStorage.getItem('email')
      }
    },
    methods: {
      getNotify(){
        axiosAuth.get('/get-notify-list').then(response => {
         response.data.notify.forEach(item => {
            let month = ''
            if (item.year != "")  month = 'за '+this.month[parseInt(item.month)]
              // if (item.year != "") item.year = 'за '+item.year+
              this.notifyList.push({'name':'Объект: '+item.object+ ', ошибка в документе "'+this.objectsItems[item.file_type]+'" '+month+' ' +item.year,'comment':item.comment,'upload_url':''})
           });
          
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created () {
      this.getNotify()
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
</style>