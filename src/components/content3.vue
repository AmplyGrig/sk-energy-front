<template>
  <section
    :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
  >
    <div class="container">
      <h2 class="block-title">Почему с нами эффективно и выгодно?</h2>
      <div class="three-dots">
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
      </div>
      <div class="why-we">
        <div class="why-we-block">
          <p class="why-we-number">
            01
          </p>
          <p class="why-we-title">
            Результат
          </p>
          <div class="why-we-img">
            <img src="@/assets/img/report_(1).png" />
          </div>
          <div class="why-we-descr">
            Ориентируемся на достижение реального экономического эффекта и
            экономии ваших средств
          </div>
          <img src="@/assets/img/accepted.png" class="why-we-done" />
        </div>
        <div class="why-we-block">
          <p class="why-we-number">
            02
          </p>
          <p class="why-we-title">
            Комплексный подход
          </p>
          <div class="why-we-img">
            <img src="@/assets/img/ranking.png" alt="" />
          </div>
          <div class="why-we-descr">
            Учитываем все факторы функционирования вашего бизнеса или
            деятельности организации
          </div>
          <img src="@/assets/img/accepted.png" class="why-we-done" />
        </div>
        <div class="why-we-block">
          <p class="why-we-number">
            03
          </p>
          <p class="why-we-title">
            Сопровождение
          </p>
          <div class="why-we-img">
            <img src="@/assets/img/customer-support.png" alt="" />
          </div>
          <div class="why-we-descr">
            Помогаем реализовать предлагаемые решения и повысить энергетическую
            эффективность
          </div>
          <img src="@/assets/img/accepted.png" class="why-we-done" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  name: "content3",
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 730,
    tablet: el => el.width <= 1350 && el.width > 730
  }
};
</script>

<style>
.why-we {
  display: flex;
  flex-flow: column;
  margin-top: 30px;
}
.why-we-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
}
.why-we-block:not(:first-of-type) {
  border-top: 2px rgba(98, 103, 105, 0.4) dashed;
}
p.why-we-number {
  opacity: 0.4;
  color: #1db5e0;
  font-family: "Exo 2";
  font-size: 100px;
  font-weight: 400;
  line-height: 30px;
  min-width: 200px;
}
p.why-we-title {
  color: #1d1d1b;
  font-family: "Exo 2", sans-serif;
  font-weight: bold;
  font-size: 28px;
  line-height: 30px;
  min-width: 300px;
  width: 340px;
  text-align: right;
  padding-right: 30px;
}
.why-we-img {
  min-width: 220px;
  display: flex;
  justify-content: center;
  position: relative;
}
.why-we-img:before {
  content: "";
  position: absolute;
  top: -46px;
  left: 38px;
  background: url("../assets/img/icon-bg.png") center/cover no-repeat;
  width: 142px;
  height: 142px;
}
.why-we-img img {
  z-index: 12;
}
.why-we-descr {
  color: #626769;
  font-family: "Exo 2", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  max-width: 280px;
  margin-right: 50px;
}
</style>
