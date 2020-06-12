<template>
  <div>
    <Header>
      <template v-slot:content-block> </template>
    </Header>
    <div :class="['first-block', { small: el.is.small, tablet: el.is.tablet }]">
      <h1 class="first-block-title about-title">Свяжитесь с нами</h1>
      <p class="first-block-subtitle">любым удобным способом</p>
      <p class="fist-block-simple">
        Звоните на 8 (4112) 711347<br /><br />Пишите на почту 711347@mail.ru
      </p>
    </div>

    <section
      :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <h3 class="block-h3-title">
          Хотите снизить затраты на теплоэнергию и электроснабжение?
        </h3>
        <h3 class="block-h3-subtitle">Оставьте заявку на консультацию</h3>
        <div class="three-dots">
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
        </div>
        <callForm></callForm>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import callForm from "@/components/callForm.vue";
import Footer from "@/components/Footer.vue";
import { ResponsiveMixin } from "vue-responsive-components";

export default {
  components: {
    Header,
    callForm,
    Footer
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 750,
    tablet: el => el.width <= 1350 && el.width > 750
  }
};
</script>

<style>
/* .content-block-1{
     background: url("../assets/img/energy-promo1.png") no-repeat center/cover;
} */
.fist-block-simple {
  color: white;
}
.block-1-content {
  max-width: 650px;
  margin: 50px auto;
  font-size: 18px;
}

.first-block-slogan {
  color: #ffffff;
  font-family: "Exo 2";
  font-size: 26px;
  text-transform: uppercase;
  margin-bottom: 94px;
  margin-top: 48px;
}

.get-consult {
  display: inline;
  position: relative;
}

.get-consult a:before {
  content: "";
  background: url("../assets/img/phone-call.png") repeat-x center/cover;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 9px;
  right: 14px;
}

.block-h3-title {
  color: #1d1d1b;
  font-family: "Open Sans";
  font-size: 30px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.block-h3-subtitle {
  color: #1d1d1b;
  font-family: "Exo 2";
  font-size: 16px;
  font-weight: 300;
  line-height: 30px;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 28px;
}
</style>
