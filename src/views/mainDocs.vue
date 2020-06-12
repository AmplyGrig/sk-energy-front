<template>
          <v-row

          :align="alignment"
          justify="space-between"
          class="ma-auto grey lighten-5"
        >
          <v-card
            v-for="(item) in items"
            :key="item.key"
            v-class="{active: isActive}"
            class="pa-3 flex-column main-doc-item"  
             justify="space-between"
            width="16.5%"
          >
            <span class="logoMainDoc">{{item.label}}</span>
            <v-file-input :class="{'d-none':page=='true'}" :v-name="item.key"  label="Загрузить"></v-file-input>
            <v-row :class="{'d-none':page=='false'}" class="mr-2 align-center" justify="space-between" ><v-btn class="ma-2" color="#232020" style="color:white;">Скачать</v-btn><v-btn icon color="#232020">
            <v-icon>mdi-menu-down</v-icon></v-btn></v-row>
          </v-card>
        </v-row>
</template>
<script>

export default {
    name: "mainDocs",
    props: ['page'],
   data() {
    return {
        isActive:false,
        items: [
            {
                label:"Паспорт ПУТЭ",
                key:"passPyt"
            },
               {
                label:"Проект УУТЭ",
                key:"projectYYt"
            },
               {
                label:"Тех. условия на присоединение",
                key:"conditionDoc"
            },
               {
                label:"Технический паспорт",
                key:"techPass"
            },
               {
                label:"Кадастровый паспорт",
                key:"kadPass"
            },
               {
                label:"Реквизиты",
                key:"props"
            }
        ]
    }
   },
  components: {
  },
  beforeCreate() {
  },
  beforeDestroy() {
  }
};
</script>
<style>
.logoMainDoc {
    height: 50px;
    display: block;
    font-size: 14px;
}
.main-doc-item .v-input__slot:before{
    content:unset!important;
}
.main-doc-item .v-text-field .v-label--active{
    transform: unset!important;
     color: white!important;
}
.main-doc-item .v-input__prepend-outer, .main-doc-item .v-text-field__details{
    display:none!important;
}
.main-doc-item .v-input__slot:after{
    content: unset!important;
}
.main-doc-item .v-file-input__text {
    background: #232020!important;
    border-radius: 5px;
    cursor: pointer;

}
.main-doc-item .v-label{
    color: white!important;
    font-size: 14px;
    padding: 0px 15px;
}
.main-doc-item .v-input {
    width: 80%;
}
</style>