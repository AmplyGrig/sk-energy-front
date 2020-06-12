<template>
  <section
    :class="['content-block-2', { small: el.is.small, tablet: el.is.tablet }]"
  >
    <div class="container">
      <h2 class="block-title-inverse">Какой результат вы получите?</h2>
      <div class="three-dots">
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
        <img src="@/assets/img/dot.png" />
      </div>
      <div class="our-results img3">
        <div class="out-results-result">
          <div class="out-results-result-img ">
            <img src="@/assets/img/electrical-tower.png" />
          </div>
          <p class="out-results-result-descr">
            Перечень мероприятий для повышения энергоэффективности предприятия
          </p>
        </div>
        <div class="out-results-result">
          <div class="out-results-result-img">
            <img src="@/assets/img/graph.png" />
          </div>
          <p class="out-results-result-descr">
            Покажем скрытые возможности получения экономии и достигнем
            результата вместе с вами
          </p>
        </div>
        <div class="out-results-result">
          <div class="out-results-result-img">
            <img src="@/assets/img/calculator.png" />
          </div>
          <p class="out-results-result-descr">
            Достигнем снижения затрат на энергоресурсы вместе с вами
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  name: "content4",
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 730,
    tablet: el => el.width <= 1350 && el.width > 730
  }
};
</script>

<style>
.our-results {
    display: flex;
    justify-content: center;
    margin: 120px 0 -80px;
    align-items: flex-start;
}
.our-results:before {
  content: "";
  position: absolute;
  height: 335px;
  left: 0;
  top: 190px;
  right: 0;
  background: url(/img/how-we-work-bg.e924bd9b.png) no-repeat center;
  z-index: -1;
}
.out-results-result {
  display: flex;
  justify-content: center;
  flex-flow: column;
  text-align: center;
  max-width: 325px;
  margin: 0 20px;
}
p.out-results-result-descr {
  color: #f1f2f4;
  font-size: 16px;
  font-family: "Exo 2";
  font-weight: 400;
  line-height: 24px;
  margin-top: 100px;
}
.out-results-result-img {
  position: relative;
  margin: auto;
  width: 80px;
  display: flex;
  justify-content: center;
}
.out-results-result-img:before {
  content: "";
  position: absolute;
  top: -40px;
  left: -40px;
  background: #fcdc00;
  transform: rotate(45deg);
  /* width: 142px; */
  padding: 80px;
  z-index: 12;
  /* height: 142px; */
}
.out-results-result-img img {
  position: relative;
  z-index: 12;
  width: 75px;
  height: 80px;
}
</style>
