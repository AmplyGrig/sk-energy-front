<template>
  <form action="#" method="post" class="callForm">
    <div class="input-wrapper">
      <input
        id="txtName"
        name="txtName"
        type="text"
        placeholder="ИМЯ"
        class="form-control"
      />
      <div class="input-icon">
        <img src="@/assets/img/user_(12).png" class="icon icon-arrow-down" />
      </div>
    </div>
    <div class="input-wrapper">
      <input
        id="txtMail"
        name="txtMail"
        type="text"
        placeholder="E-MAIL"
        class="form-control"
      />
      <div class="input-icon">
        <img src="@/assets/img/email.png" class="icon icon-arrow-down" />
      </div>
    </div>
    <div class="input-wrapper">
      <input
        id="txtPhoneNumber"
        name="txtPhoneNumber"
        type="text"
        placeholder="НОМЕР ТЕЛЕФОНА"
        class="form-control"
      />
      <div class="input-icon">
        <img src="@/assets/img/phone-call.png" class="icon icon-arrow-down" />
      </div>
    </div>
    <button name="" type="button" class="btn btn-theme btn-form">
      Отправить
    </button>
  </form>
</template>

<script>
export default {
  name: "callForm"
};
</script>

<style>
.callForm {
  display: flex;
  justify-content: center;
  flex-flow: column;
  max-width: 370px;
  margin: 30px auto;
}
.callForm input[type="text"]{
  background: transparent;
  font-family: inherit;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border: 1px solid #626769;
  display: block;
  margin: 0;
  font-family: "Exo 2", sans-serif;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 45px;
  width: 100%;
  transition: all 0.2s linear;
  color: #141414;
  font-size: 16px;
  font-weight: 400;
  outline: 0;
  box-shadow: none !important;
  position: relative;
  -webkit-appearance: none;
  padding-left: 65px;
}
.input-wrapper {
  position: relative;
  z-index: 12;
  overflow: hidden;
  margin-top: 16px;
}

.input-icon {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 46px;
  background: #d8dade;
  display: block;
  z-index: -1;
  transition: all 0.3s ease;
}
.input-icon img {
  padding: 13px;
}
</style>
