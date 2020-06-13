<template>
  <div id="app" class="v-application v-application--is-ltr ">
      <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/css/main.css';

export default {
  name: 'App',
  created() {
			this.$store.dispatch('auth/autoLogin');
  },
}
</script>