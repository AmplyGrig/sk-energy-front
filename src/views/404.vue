<template>
  <section :class="[{ small: el.is.small, tablet: el.is.tablet }]">
    <div :class="['block', { small: el.is.small, tablet: el.is.tablet }]">
      <div
        :class="[
          'block-with-text',
          { small: el.is.small, tablet: el.is.tablet }
        ]"
      >
        <h1>Извините, страница не найдена</h1>
        <h2>
          Страница могла потеряться по многим причинам. Но не стоит переживать.
        </h2>
        <p>
          Просто возвращайтесь на <a href="/">главную страницу</a> сайта
          "СКсервис".<br /><br />Мы уже ждем вас там.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  beforeCreate() {
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.overflow = "";
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 750,
    tablet: el => el.width <= 1350 && el.width > 750
  }
};
</script>

<style>
.block {
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
}
.block-with-text:before {
    content: "";
    background: url("../assets/img/Mask Group.png") no-repeat;
    width: 100%;
    height: 90vh;
    top: 10%;
    left: 24%;
    position: absolute;
    z-index: -1;
}
.block-with-text.small:before{
    display: none;
}
.block-with-text.tablet:before{
    width: 75%;
}
.block-with-text.tablet {
    margin: 40px;
}
.block-with-text p, .block-with-text a {
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    margin-top: 45px;
}
.block-with-text a {
  text-decoration: underline;
}
.block-with-text h2 {
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: #ffffff;
}
.block-with-text h1 {
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 58px;
  color: #ffdb00;
}

/*----------------for small ----------------*/
.block-with-text.small h1 {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: #ffdb00;
}
.block-with-text.small h2 {
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
}
.block-with-text.small p,
a {
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
}
.block.small {
  margin: 0 40px;
}
</style>
