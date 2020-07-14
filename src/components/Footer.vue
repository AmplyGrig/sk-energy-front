<template>
  <section
    id="footer"
    :class="['content-block-2', { small: el.is.small, tablet: el.is.tablet }]"
  >
    <div class="container">
      <div class="footer">
        <div class="logo-footer">
          <div></div>
          <p>ООО «СК Сервис» (с)</p>
          <p class="t-p">
            г.Якутск, ул. Дежнева, 35/1 оф. 03<br />
            8 (4112) 711347
          </p>
        </div>
        <nav class="nav-footer">
          <ul>
            <li v-for="(item, index) in footerItems" :key="index">
              <a :href="item.ref">{{ item.text }}</a>
            </li>
          </ul>
        </nav>
        <div class="contact-footer">
          <p>
            г.Якутск, ул. Дежнева, 35/1 оф. 03<br />
           <a href="tel:+7 (4112) 711347">+7 (4112) 711347</a>
          </p>
        </div>
        <div class="designed-by">
          <p><a href="https://just-studio.ru/">Design by Just Studio</a></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  name: "Footer",
  data: function() {
    return {
      footerItems: this.$store.state.headerItems
    };
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 730,
    tablet: el => el.width <= 1350 && el.width > 730
  }
};
</script>

<style>
.small .logo-footer div {
  width: 80px;
  background: url("../assets/img/3.png") no-repeat center/cover;
}
.tablet .logo-footer div {
  width: 80px;
  background: url("../assets/img/2.png") no-repeat center/cover;
}
.logo-footer div {
  width: 200px;
  background: url("../assets/img/logo-footer.png") no-repeat center/cover;
  height: 58px;
}
#footer {
  width: 100%;
  background: #232020;
}
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  align-items: center;
}
.logo-footer p {
  color: #ffffff;
  font-family: "Exo 2";
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}
.nav-footer ul {
  list-style: none;
  padding: 0px;
}
.nav-footer ul a {
  color: #ffffff;
  font-family: "Exo 2";
  font-size: 90%;
  font-weight: 400;
  line-height: 30px;
}
.contact-footer a {
    color: white!important;
    font-family: 'exo 2';
}
.contact-footer {
  color: #ffffff;
  font-family: "Exo 2";
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}
.designed-by p {
  color: #ffffff;
  font-family: "Exo 2";
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}
.contact-footer {
  font-family: "Exo 2";
}
</style>
