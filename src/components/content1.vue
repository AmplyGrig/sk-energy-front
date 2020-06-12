<template>
  <section
    :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
  >
    <div :class="['container', { small: el.is.small }]">
      <h2 class="block-title">Как сэкономить на энергоснабжении?</h2>
      <div class="three-dots">
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
      </div>
      <div :class="['steps-to-do', { small: el.is.small }]">
        <div :class="['step', { small: el.is.small }]">
          <div class="number">1</div>
          <p class="step-descr">
            Провести аудит документации по учету теплоэнергии и расчетов за ее
            потреблением
          </p>
        </div>
        <div :class="['step', { small: el.is.small }]">
          <div class="number">2</div>
          <p class="step-descr">
            Проанализировать существующие договоры и тарифы энергоснабжения
          </p>
        </div>
        <div :class="['step', { small: el.is.small }]">
          <div class="number">3</div>
          <p class="step-descr">
            Выявить потери и необоснованные затраты энергоресурсов
          </p>
        </div>
        <div :class="['step', { small: el.is.small }]">
          <div class="number number-four">4</div>
          <p class="step-descr">
            Разработать комплекс мероприятий по энергосбережению
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  name: "content1",
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 730,
    tablet: el => el.width <= 1350 && el.width > 730
  }
};
</script>

<style>
.small .container,
.container.small {
  max-width: 400px;
}
.small h2 {
  font-size: 24px;
}
.step .number {
  color: #f1f2f4;
  font-family: "Exo 2", sans-serif;
  font-size: 180px;
  line-height: 1.7em;
  height: 242px;
  font-weight: 400;
  position: relative;
  z-index: 12;
  margin: 0 -5px;
}
.step .number:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 280px;
  height: 245px;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background: url("../assets/img/untitled.png") center/cover no-repeat;
  z-index: -1;
}
.content-block-1.small:before {
  content: "";
  background: url("../assets/img/transition-up.png") no-repeat;
  top: -20px;
  left: 0px;
  background-position-x: center;
  position: absolute;
  /* background-size: contain; */
  min-width: 200px;
  width: 100%;
  height: 100px;
}
.step-descr {
  width: 265px;
  height: 64px;
  color: #626769;
  font-family: "Exo 2";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
.step-descr span {
  white-space: nowrap;
}
.steps-to-do {
  display: flex;
  justify-content: space-around;
  margin: 60px 0;
}
.steps-to-do.small {
  display: flex;
  margin: 60px 0px;
  flex-direction: column;
}
.step.small .step-descr {
  width: 100% !important;
  height: unset;
}
.step {
  display: flex;
  flex-flow: column;
  text-align: center;
}
</style>
