<template>
  <section
    :class="['content-block-2', { small: el.is.small, tablet: el.is.tablet }]"
  >
    <div class="container">
      <h2 class="block-title-inverse">Как мы работаем?</h2>
      <div class="three-dots">
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
      </div>
      <div class="how-we-work">
        <div class="step-work-up">
          <p>Получаем от вас исходные <span>данные и анализируем их</span></p>
          <p>
            Проверяем корректность и правомерность
            <span>начислений за теплоэнергию</span>
          </p>
        </div>
        <div class="step-work-down">
          <p>Выявляем возможности пересмотра тепловой нагрузки</p>
          <p>
            Представляем ваши интересы
            <span>в энергоснабжающей</span> организации
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  name: "content2",
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 730,
    tablet: el => el.width <= 1350 && el.width > 730
  }
};
</script>

<style>
.how-we-work {
  display: flex;
  flex-flow: column;
  margin-top: 160px;
  position: relative;
  z-index: 10;
}

.how-we-work:before {
  content: "";
  position: absolute;
  height: 335px;
  left: 0;
  top: -85px;
  right: 0;
  background: url("../assets/img/how-we-work-bg.png") no-repeat center;
  z-index: -1;
}

.how-we-work .step-work-up p {
  color: #f9f6f3;
  font-family: "Exo 2";
  font-size: 16px;
  font-weight: 300;
  line-height: 18px;
  max-width: 250px;
  text-align: center;
  margin-left: 150px;
  position: relative;
}
.how-we-work .step-work-up p > span,
.how-we-work .step-work-down p > span {
  white-space: nowrap;
}

.how-we-work .step-work-up p:before {
    content: "";
    position: absolute;
    background: #ffdb00;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 3px white solid;
    left: 50%;
    bottom: -50px;
}
.how-we-work .step-work-down p {
  color: #f9f6f3;
  font-family: "Exo 2";
  font-size: 16px;
  font-weight: 300;
  line-height: 18px;
  max-width: 215px;
  text-align: center;
  margin-left: 200px;
  position: relative;
}

.how-we-work .step-work-down p:before {
    content: "";
    position: absolute;
    background: #ffdb00;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 3px white solid;
    left: 50%;
    top: -43px;
}

.step-work-up {
  display: flex;
}
.step-work-down {
  display: flex;
  padding-top: 35px;
  margin: 27px 150px 0 150px;
  border-top: 4px #ffdb00 solid;
}
</style>
