<template>
  <div>
    <div class="container">
        <div class="panel-header">
            <a href="/" class="navbar-brand panel">
                <div></div>
            </a>
            <p>Нет аккаунта? <a href="/sign-up">Создать</a></p>
        </div>
    </div>
    <div class="container-login100">
        <div class="wrap-login100 p-t-30 p-b-50">
            <span class="login100-form-title p-b-41">
            Войдите в свою учетную запись
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
                <div class="wrap-input100" :class="{ 'input-error': $v.email.$invalid || authError }">
                    <span class="txt1">
                        Адрес электронной почты
                    </span>
                    <input 
                        v-model.trim="$v.email.$model"
                        @focus="authError=0"
                        @blur="authError=0" 
                        class="input100" 
                        type="text" 
                        name="email" 
                        placeholder="Введите адрес"
                        >
                    <p class="validate-error" v-if="$v.email.$invalid">
                        <template v-if="!$v.email.required">
                        Обязательное поле
                        </template>
                        <template v-else>
                        Неверный формат почты
                        </template>
                    </p>
                </div>
                <div class="wrap-input100" :class="{ 'input-error': $v.password.$invalid || authError }">
                    <span class="txt1">
                        Пароль
                    </span>
                    <input 
                        v-model.trim="$v.password.$model" 
                        @focus="authError=0"
                        @blur="authError=0" 
                        class="input100" 
                        type="password" 
                        name="pass" 
                        placeholder="Введите пароль"
                        >
                    <p class="validate-error" v-if="$v.password.$invalid && !authError">
                        <template v-if="!$v.password.required">
                            Обязательное поле
                        </template>
                        <template v-if="!$v.password.minLength">
                            Пароль должен быть не менее {{ $v.password.$params.minLength.min }} <br>символов
                        </template>
                        <template v-if="!$v.password.maxLength">
                            Пароль должен быть не более {{ $v.password.$params.maxLength.max }} <br>символов
                        </template>
                    </p>
                    <p class="validate-error" v-if="authError">
                    Ошибка авторизации. <br>Неверно введен логин или пароль.
                    </p>
                    <router-link to="/forgot-password" class="forgot-password">
                        Забыли пароль?
                    </router-link>
                </div>
                <div class="container-login100-form-btn m-t-32">
                    <button @click.prevent="onSubmit()" class="login100-form-btn" :disabled="$v.$invalid">
                    Войти
                    </button>
                </div>
            </form>

        </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            email: '',
            password: '',
            invalidCredentials: false,
            authError: 0
        }
    },
    methods: {
        onSubmit() {
            let formData = {
                email: this.email,
                password: this.password,
            }
            this.$store.dispatch('auth/login', formData).then(() => {
                this.$router.push('/adminpage');
            }, () => {
                this.authError = 1
            })
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(16)
        }
    }
}
</script>

<style>
.wrap-input100 input[type="text"], .wrap-input100 input[type="password"] {
    background: transparent;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border: 1px solid #626769;
    display: block;
    margin: 0;
    font-family: "Exo 2", sans-serif;
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
}
.panel-header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    align-items: center;
}
.panel-header p>a {
    color: yellow;
}
.panel-header p {
    color: white;
}

.container-login100 {
    width: 100%;
    min-height: 88vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;
}
.p-t-30 {
    padding-top: 30px;
}
.p-b-50 {
    padding-bottom: 50px;
}
.p-b-41 {
    padding-bottom: 41px;
}
.p-t-5 {
    padding-top: 5px;
}
.p-b-33 {
    padding-bottom: 33px;
}
.m-t-32 {
    margin-top: 32px;
}
.m-t-65 {
    margin-top: 65px;
}
.wrap-login100 {
    width: 500px;
    border-radius: 10px;
    overflow: hidden;
    background: transparent;
}
.login100-form {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    padding: 12% 20%;
}
.login100-form-title {
    font-family: "Exo-2";
    color: #FFFFFF;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    text-align: center;
    display: block;
}
.wrap-input100 {
    width: 100%;
    padding: 14px 0;
}
.wrap-input100 input {
    padding-left: 14px;
    border-radius: 6px;
}
.validate-input {
    position: relative;
}
span.txt1 {
    display: block;
    margin-bottom: 6px;
}
a.forgot-password {
    float: right;
    margin: 4px 4px;
    text-decoration: underline;
    color: rgba(29, 29, 27, 0.4)!important;
    cursor: pointer;
}
.container-login100-form-btn {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.login100-form-btn {
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 160px;
    height: 42px;
    border-radius: 4px;
    background: #222221;
    border: none;
    position: relative;
    z-index: 1;
    transition: all 0.4s;
    cursor: pointer;
}
.input100 {
    font-size: 20px;
    color: #555555;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 50px;
    background: transparent;
    padding: 0 10px 0 80px;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}
input {
    outline: none;
    border: none;
}
button, input {
    overflow: visible;
}
.focus-input100 {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>