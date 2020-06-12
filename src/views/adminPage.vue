<template>
  <v-expansion-panels
     accordion
      multiple
  >
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
      class="month-input"
    >
      <v-expansion-panel-header >{{2015+i}} <v-row class="mx-5" justify="end"><v-file-input :class="{'d-none':page=='true'}" multiple label="File input"></v-file-input></v-row></v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
            class="mb-6"
            no-gutters
          >
          <template v-for="n in 12">
        <v-col :key="n">
          <v-card
            :elevation="3"
            class="pa-2"
          >
            {{ month[n-1].label }}
            <v-row :class="{'d-none':page=='false'}" class="mx-1 align-center" justify="space-between" ><v-btn icon color="#232020"><v-icon>mdi-download</v-icon></v-btn><v-btn icon color="#232020">
            <v-icon>mdi-menu-down</v-icon></v-btn></v-row>
             <v-row :class="{'d-none':page=='true'}" class="mx-2" justify="end"><v-file-input :v-name=" month[n-1].key " multiple label="File input"></v-file-input></v-row>
          </v-card>
        </v-col>
      </template>
          </v-row>
      </v-expansion-panel-content>
     
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>

export default {
   name: "coolList",
    props: ['page'],
   data() {
    return {
      month: [
        {
        key:"January",
        label:"ЯНВ"
        },
            {
        key:"February",
        label:"ФЕВ"
        },
            {
        key:"March",
        label:"МАР"
        },
            {
        key:"April",
        label:"АПР"
        },
            {
        key:"May",
        label:"МАЙ"
        },
            {
        key:"June",
        label:"ИЮН"
        },
            {
        key:"July",
        label:"ИЮЛ"
        },
            {
        key:"August",
        label:"АВГ"
        },
            {
        key:"September",
        label:"СЕН"
        },
            {
        key:"November",
        label:"ОКТ"
        },
            {
        key:"October",
        label:"НОЯ"
        },
         {
        key:"December",
        label:"ДЕК"
        },

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
.month-input .v-input__control{
  display:none!important;
}
.month-input .v-input {
    max-width: 30px;
}
</style>