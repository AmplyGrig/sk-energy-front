<template>
  <div>
    <Header>
      <template v-slot:content-block>
        <div
          :class="[
            'first-block main',
            { small: el.is.small, tablet: el.is.tablet }
          ]"
        >
          <h1
            :class="[
              'first-block-title',
              { small: el.is.small, tablet: el.is.tablet }
            ]"
          >
            Энергоконсалтинг
          </h1>
          <p
            :class="[
              'first-block-subtitle',
              { small: el.is.small, tablet: el.is.tablet }
            ]"
          >
            для предприятий и организаций
          </p>
          <p class="first-block-slogan">
            Помогаем снизить затраты на энергоресурсы
          </p>
          <div class="get-consult">
            <a class="btn btn-theme">Получить консультацию</a>
          </div>
        </div>
      </template>
    </Header>
    <content1></content1>
    <content2></content2>
    <content3></content3>
    <content4></content4>
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
import content1 from "@/components/content1.vue";
import content2 from "@/components/content2.vue";
import content3 from "@/components/content3.vue";
import content4 from "@/components/content4.vue";
import callForm from "@/components/callForm.vue";
import Footer from "@/components/Footer.vue";
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  components: {
    Header,
    content1,
    content2,
    content3,
    content4,
    callForm,
    Footer
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 750,
    tablet: el => el.width <= 1400 && el.width > 750
  }
};
</script>

<style>
.first-block.main.tablet {
  text-align: center;
}
.first-block.main {
  text-align: left;
}

.first-block-title {
  color: #ffffff;
  font-family: "Open Sans";
  font-weight: 700;
  text-transform: uppercase;
  font-size: 48px;
  margin: 55px 0px -10px 0;
}
.first-block-title.tablet {
  font-size: 60px;
}
.first-block-subtitle {
  color: #ffffff;
  font-family: "Exo 2";
  font-weight: 400;
  text-transform: uppercase;
  font-size: 28px;
  margin-top: 0;
}
.first-block-subtitle.tablet {
  font-size: 30px;
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
