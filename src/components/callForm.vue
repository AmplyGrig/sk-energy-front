<template>
  <div>
      <form action="#" method="post" class="callForm">
        <div class="input-wrapper">
          <input
            v-model.trim="name"
            @blur="submitStatus=null"
            @focus="submitStatus=null"
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
            v-model.trim="email"
            @blur="submitStatus=null"
            @focus="submitStatus=null"
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
            v-model.trim="phone"
            @blur="submitStatus=null"
            @focus="submitStatus=null"
            type="text"
            placeholder="НОМЕР ТЕЛЕФОНА"
            class="form-control"
          />
          <div class="input-icon">
            <img src="@/assets/img/phone-call.png" class="icon icon-arrow-down" />
          </div>
        </div>
        <p class="callform-validate-error">
            <template v-if="submitStatus==='ERROR_NAME'">
                Пожалуйста, заполните корректно поле с именем
            </template>
            <template v-if="submitStatus==='ERROR_EMAIL'">
                Пожалуйста, заполните корректно поле с электронной почтой
            </template>
            <template v-if="submitStatus==='ERROR_PHONE'">
                Пожалуйста, заполните корректно поле с номером телефона
            </template>
            <template v-if="submitStatus==='ERROR_SERVER'">
                Произошла ошибка. Попробуйте позже
            </template>
        </p>
        <button @click="callMe()" type="button" class="btn btn-theme btn-form">
          Отправить
        </button>
    </form>
    <div class="b-fullscreen" v-if="isCallMeClicked">
        <div class="b-popup-content">
            <a class="close-frm" @click="callMeClose()"><span>×</span></a>
            <p class="my-yellow">Спасибо!</p>
            <p class="my-white">Наш менеджер сейчас позвонит вам</p>
        </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: "callForm",
  data(){
    return{
      email: '',
      name: '',
      phone: '+7',
      isCallMeClicked: false,
      submitStatus: null
    }
  },
  methods: {
    callMe(){
        this.$v.$touch()
        if (this.$v.name.$invalid) {
          this.submitStatus = 'ERROR_NAME'
        } else if (this.$v.email.$invalid) {
          this.submitStatus = 'ERROR_EMAIL'
        } else if (this.$v.phone.$invalid) {
          this.submitStatus = 'ERROR_PHONE'
        } else {
          let postData = {
            email: this.email,
            phone: this.phone,
            name: this.name
          }
          axios.post('/call-me', postData).then(response =>{
            if (response.data.hit == 0){
              this.isCallMeClicked = true
            }else{
              this.submitStatus = "ERROR_SERVER"
            }
          }).catch(() => {
            this.submitStatus = "ERROR_SERVER"
          })

        }
    },
    callMeClose(){
      this.isCallMeClicked = false
    }
  },
  validations: {
    email:{
      required,
      email
    },
    phone:{
      required,
      isPhone(phone){
          const regex = /^\+7[0-9]{10}$/;
          return regex.test(phone);
      }
    },
    name:{
      required,
      minLength: minLength(3),
      maxLength: maxLength(24)
    }
  }
};
</script>

<style>
.callform-validate-error{
    font-family: "Exo-2";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    text-align: left!important;
    margin: 4px 0 0 8px!important;
    color: #F61618;
}
.my-yellow{
  color: #FFDB00;
}
.my-white{
  color: white;
}
.b-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999999;
    font-family: arial;
}
.b-popup-content {
    background-color: #1D1D1B;
    min-width: 500px;
    max-width: 500px;
    margin: 200px auto;
    box-sizing: border-box;
    padding: 150px 50px 150px;
    position: relative;
    text-align: center;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    text-transform: uppercase;
}
a.close-frm {
    position: absolute;
    top: 36px;
    right: 36px;
    font-size: 80px;
    color: rgba(255, 255, 255, 0.5)!important;
}
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
