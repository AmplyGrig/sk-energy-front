<template>
  <div>
    <Header>
      <template v-slot:content-block> </template>
    </Header>
    <div :class="['first-block', { small: el.is.small, tablet: el.is.tablet }]">
      <h1 class="first-block-title about-title">Раскрываем возможности</h1>
      <p class="first-block-subtitle">
        по управлению вашими расходами на энергоресурсы
      </p>
    </div>
    <section
      :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <div class="block-1-content">
          <p
            :class="[
              'content-text',
              { small: el.is.small, tablet: el.is.tablet }
            ]"
          >
            «СК Сервис» предоставляет услуги по сбору, обработке и комплексному
            анализу данных потребления тепловой энергии и электроэнергии
            предприятиями и организациями. <br /><br />
            Благодаря нашей работе, вы получаете достоверную информацию об
            объеме используемых энергетических ресурсов, а также получаете
            возможность снизить затраты на теплоснабжение и электроснабжение.
            <br /><br />
            Наш главный принцип - это совместное решение всех вопросов и
            представление интересов организации перед энергоснабжающими
            компаниями.
            <br /><br />
            Чтобы сэкономить на энергопотреблении, вам не нужно разбираться во
            всей документации, тарифах и оборудовании. Предоставьте информацию
            нам и получите заключение о правильности и правомерности начислений
            с рекомендациями о необходимости дальнейших действий.
          </p>
        </div>
      </div>
    </section>
    <section
      :class="['content-block-2', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <div class="our-results img3 about-block">
          <div class="out-results-result">
            <div class="out-results-result-img">
              <!-- <img src="@/assets/img/electrical-tower.png"/> -->
              <span
                >c <br />
                <span class="bold">2012</span> <br />года</span
              >
            </div>
            <p class="out-results-result-descr mtmore">
              Работаем в сфере энергосбережения и энергоконсалтинга
            </p>
          </div>
          <div class="out-results-result">
            <div class="out-results-result-img">
              <!-- <img src="@/assets/img/graph.png"/> -->
              <span><br /><span class="bold">64 </span><br />объекта</span>
            </div>
            <p class="out-results-result-descr mtmore">
              Провели работы по энергосбережению после нашего анализа
            </p>
          </div>
          <div class="out-results-result">
            <div class="out-results-result-img">
              <span>на <br /><span class="bold">100</span> <br />млн.руб.</span>
            </div>
            <p class="out-results-result-descr mtmore">
              Снизили затраты предприятия и организации после проведенного
              аудита
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
      :class="[
        'content-block-2 about-footer',
        { small: el.is.small, tablet: el.is.tablet }
      ]"
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
              <li><a href="#">Личный кабинет</a></li>
            </ul>
          </nav>
          <div class="contact-footer">
            <p>
              г.Якутск, ул. Дежнева, 35/1 оф. 03<br />
              8 (4112) 711347
            </p>
          </div>
          <div class="designed-by">
            <p>Design by Just Studio</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  components: {
    Header
  },
  data: function() {
    return {
      footerItems: this.$store.state.headerItems
    };
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
section.content-block-2.about-footer:before {
  background: none;
  width: 70%;
  border-top: 1px solid white;
  left: 15%;
}
.about-block:before {
  content: none;
}
.mtmore {
  margin-top: 60px !important;
}
/* .about-title{
    font-size:52px!important
} */
.block-1-content {
  max-width: 650px;
  margin: 50px auto;
  font-size: 18px;
}
.about-footer {
    margin-top: 90px;
}

.first-block-subtitle {
  color: #ffffff;
  font-family: "Exo 2";
  font-weight: 700;
  text-transform: uppercase;
  font-size: 28px;
  margin-top: 0;
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
.out-results-result-img > span {
  color: black;
  z-index: 20;
  position: inherit;
  font-size: 18px;
  top: -20px;
  font-family: "Exo 2";
}
span.bold {
  font-weight: 700;
  font-size: 52px;
  font-family: "Exo 2";
}
p.content-text {
  font-family: "Exo 2";
  font-weight: normal;
  font-size: 20px;
}
p.content-text.small {
  font-family: "Exo 2";
  font-size: 14px;
}
</style>
