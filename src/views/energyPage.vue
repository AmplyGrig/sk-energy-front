<template>
    <div>
        <Header>
            <template v-slot:content-block>

            </template>
        </Header>
        <div :class="['first-block', { small: el.is.small }]">
                <h1 class='first-block-title about-title'>Энергоконсалтинг:</h1>
                <p class='first-block-subtitle'>консультации по электроэнергии и оптимизация<br/>ваших расходов</p>
        </div>
        <section :class="['content-block-1', { small: el.is.small, tablet:  el.is.tablet}]">
        <div class="container">
            <h2 class="block-title">Как сэкономить на электроснабжении?</h2>
            <div class="three-dots">
                <img src="@/assets/img/dot.png"/>
                <img src="@/assets/img/dot.png"/>
                <img src="@/assets/img/dot.png"/>
            </div>
            <div class="block-1-content">
                    <p class="content-text">Стоимость электроэнергии для предприятий складывается из множества факторов, а цены меняются каждый месяц.<br><br>
Специалисты «СК Сервис» оперативно фиксируют происходящие изменения и решают возникающие задачи. Мы поможем вам разобраться в тарифах и перестать переплачивать энергетической компании. 
</p>
            </div>
      </div>
    </section>
    <section
      :class="[
        'content-block-2 ',
        { small: el.is.small, tablet: el.is.tablet }
      ]"
    >
      <div class="container">
        <h2 class="block-title-inverse">Как мы решим ваши проблемы?</h2>
        <div class="three-dots">
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
        </div>
        <div class="how-we-work">
          <div class="step-work-up">
            <p>
              Проконсультируем по вопросам функционирования рынка электроэнергии
            </p>
            <p>
              Проверим корректность выставляемых поставщиком счетов за
              электроэнергию
            </p>
          </div>
          <div class="step-work-down">
            <p>Проанализируем существующую схему ценообразования</p>
            <p>
              Подготовим варианты снижения затрат на электроэнергию
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
      :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <h3 class="block-h3-title">
          Узнайте, сколько вы можете сэкономить на электроэнергии
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

    <section
      :class="['content-block-2', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <h2 class="block-title-inverse">Какие документы нужны для аудита?</h2>
        <div class="three-dots">
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
        </div>
        <div class="our-results">
          <div class="out-results-result">
            <div class="out-results-result-img ">
              <img src="@/assets/img/recept.png" />
            </div>
            <p class="out-results-result-descr">
              Счета за электроэнергию от энергоснабжающей компании за 3 месяца в
              разные времена года
            </p>
          </div>
          <div class="out-results-result">
            <div class="out-results-result-img ">
              <img src="@/assets/img/contract.png" />
            </div>
            <p class="out-results-result-descr">
              Договор энергоснабжения с приложениями
            </p>
          </div>
          <div class="out-results-result">
            <div class="out-results-result-img ">
              <img src="@/assets/img/diagram.png" />
            </div>
            <p class="out-results-result-descr">
              Профили мощности из системы АИИС КУЭ
            </p>
          </div>
          <div class="out-results-result">
            <div class="out-results-result-img ">
              <img src="@/assets/img/big-data.png" />
            </div>
            <p class="out-results-result-descr">
              Акт о технологическом присоединении к электросетям
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <h3 class="block-h3-title">Предварительный аудит бесплатно!</h3>
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

.first-block.small .first-block-title {
  font-size: 160%;
  margin-bottom: 10px;
}
.first-block.small .first-block-subtitle {
  font-size: 16px;
}
.first-block.small {
  width: 100%;
  padding: 5px;
}

.content-block-after:after {
  content: "";
  background: url("../assets/img/energy-promo1.png") no-repeat center/cover;
  top: -10%;
  /* background-repeat-y: inherit; */
  left: 0;
  position: absolute;
  background-size: 75%;
  height: 125%;
  width: 100%;
  z-index: 40;
  background-repeat-y: initial;
}
.content-block-after.small:after {
  content: unset;
}
.img4:before {
  left: 13%;
  top: -41px;
  width: 150px;
  height: 150px;
}
.first-block {
  display: flex;
  flex-flow: column;
  position: relative;
  margin: auto;
  text-align: center;
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
