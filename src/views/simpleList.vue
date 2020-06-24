<template>
 <v-expansion-panels>
         <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
      class="month-input year-input"
      disabled
      flat
    >
      <v-expansion-panel-header >{{2015+i}}  <v-row class="mx-5"  justify="end"><v-file-input :class="{'d-none':page=='true'}"  label="File input"></v-file-input>  
      <v-row :class="{'d-none':page=='false'}" class="mx-1 align-center" justify="end" ><v-btn icon color="#232020"><v-icon>mdi-download</v-icon></v-btn><v-btn icon color="#232020" @click="sheet = !sheet">
      <v-icon>mdi-menu-down</v-icon></v-btn></v-row>
      </v-row></v-expansion-panel-header>
</v-expansion-panel>
  </v-expansion-panels>
</template>
<script>

export default {
  name: "simpleList",
      props: ['page'],
   data() {
    return {
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
.v-input__icon{
    pointer-events: all!important;
}
.v-expansion-panel-content__wrap{
  padding: 0 !important;
}
</style>