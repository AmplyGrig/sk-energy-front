<template>
  <section
    id="header"
    v-bind:class="[
      hasContentBlock
        ? 'header-with-content-block'
        : 'header-without-content-block',
      { small: el.is.small, tablet: el.is.tablet }
    ]"
  >
    <div :class="['container', { small: el.is.small, tablet: el.is.tablet }]">
      <nav class="navbar">
        <router-link class="navbar-brand" to="/">
          <div></div>
        </router-link>
        <div class="navbar-right">
          <ul>
            <li v-for="(item, index) in headerItems" :key="index">
              <router-link :to="item.ref">{{ item.text }}</router-link>
            </li>
          </ul>
        </div>
        <div class="hamburger-menu">
          <input id="menu__toggle" type="checkbox" />
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>
          <ul class="menu__box">
            <li v-for="(item, index) in headerItems" :key="index">
              <router-link :to="item.ref">{{ item.text }}</router-link>
            </li>
            <li>
              <router-link to="/lk">Личный кабинет</router-link>
            </li>
          </ul>
        </div>
        <div
          :class="[
            { small: el.is.small, tablet: el.is.tablet },
            'navbar-phone'
          ]"
        >
          <a href="tel:+7 (4112) 711347">+7 (4112) 711347</a>
          <template v-if="!this.role">
            <a class="lk" href="/sign-in">
              <img src="@/assets/img/lk_user.png" />
            </a>
          </template>
          <template v-else-if="this.role === 'admin'">
            <a class="lk" href="/lkadmin">
              <img src="@/assets/img/lk_user.png" />
            </a>
          </template>
          <template v-else-if="this.role === 'user'">
            <a class="lk" href="/lk">
              <img src="@/assets/img/lk_user.png" />
            </a>
          </template>
        </div>
      </nav>
      <slot name="content-block"></slot>
      <slot name="empty-block"></slot>
    </div>
  </section>
</template>

<script>
import "@/assets/css/main.css";
import { ResponsiveMixin } from "vue-responsive-components";

export default {
  name: "Header",
  computed: {
    hasContentBlock() {
      return !!this.$slots["content-block"];
    }
  },
  data: function() {
    return {
      headerItems: this.$store.state.headerItems,
    };
  },
  created(){
      this.role = localStorage.getItem('role')
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 730,
    tablet: el => el.width <= 1350 && el.width > 730
  }
};
</script>

<style>
#header {
  width: 100%;
  background: #232020;
  padding: 40px 0;
}
.container.small .navbar-brand div {
  width: 80px;
  background: url("../assets/img/3.png") no-repeat center/cover;
}

.header-with-content-block:before {
  content: "";
  position: absolute;
  height: 640px;
  top: 0;
  left: 0;
  right: 0;
  background: url("../assets/img/header_background.png") no-repeat center/cover;
}
.header-with-content-block.small:before {
  background: none;
}
.navbar .router-link-exact-active,
.menu__box .router-link-exact-active {
  color: #fcdc00;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.navbar-right a {
    margin: 0 30px;
    color: #ffffff!important;
    font-family: "Open Sans";
    font-size: 13px;
    font-weight: 700;
    line-height: 30px;
    text-transform: uppercase;
    transition: 0.2s;
}
.navbar-right a:hover,
.navbar-phone a:hover {
  opacity: 0.4;
}
.navbar-right a:active {
  color: #ffdb00!important;
  opacity: 1;
}
.navbar-phone a:active {
  opacity: 1;
  color: #ffffff!important;
}
.navbar-right ul {
  display: flex;
  list-style: none;
}



.navbar-phone a {
  color: #ffffff!important;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 700;
  line-height: 2px;
  text-transform: uppercase;
  transition: 0.2s;
}

.tablet.navbar-phone a {
  position: relative;
  margin-right: 40px;
}
.lk:before {
  content: "";
  background: url("../assets/img/lk_areal.png") repeat-x center/cover;
  position: absolute;
  width: 50px;
  height: 50px;
  top: -17px;
  right: -17px;
}
.navbar-brand div {
  width: 200px;
  background: url("../assets/img/3.3.png") no-repeat center/cover;
  height: 58px;
}
</style>
