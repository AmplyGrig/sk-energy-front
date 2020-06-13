<template>
  <div>
    <div class="container">
        <div class="panel-header">
            <a href="/" class="navbar-brand panel">
                <div></div>
            </a>
        </div>
    </div>
    <div class="container-login100">
        <div class="wrap-login100 p-t-30 p-b-50">
            <span class="login100-form-title p-b-41" v-if="forgotStep == 1">
            Забыли пароль?
            </span>
            <span class="login100-form-title p-b-41" v-if="forgotStep != 1">
            Спасибо!
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
                <div v-if="forgotStep == 1">
                    <div class="wrap-input100" :class="{ 'input-error': $v.email.$invalid || authError }">
                        <span class="txt1">
                            Адрес электронной почты
                        </span>
                        <input 
                            @focus="authError=''"
                            @blur="authError=''" 
                            v-model.trim="$v.email.$model" 
                            class="input100" 
                            type="text" 
                            name="email" 
                            placeholder="Введите адрес"
                            >
                        <p class="validate-error" v-if="$v.email.$invalid && !authError">
                            <template v-if="!$v.email.required">
                            Обязательное поле
                            </template>
                            <template v-else>
                            Неверный формат почты
                            </template>
                        </p>
                        <p class="validate-error" v-if="authError">
                        {{authError}}
                        </p>
                    </div>
                    <div class="container-login100-form-btn m-t-32">
                        <button class="login100-form-btn" @click.prevent="onSubmit()" :disabled="$v.$invalid">
                        Сбросить пароль
                        </button>
                    </div>
                </div>
                <div v-if="forgotStep == 2">
                    <p>Письмо с инструкциями по восстановлению пароля было отправлено вам на почту</p>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import axiosAuth from '@/api/axios-auth'
import { required, email } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            email: '',
            forgotStep: 1,
            authError: ''
        }
    },
    methods: {
        onSubmit(){
            axiosAuth.post('/api/reset-password', {"email" : this.email} ).then(() => {
                this.forgotStep++
                setTimeout( () => this.$router.push({ path: '/'}), 5000);
            }).catch((error) => {
                this.authError = error.response.data.reasons[0]
            })
        }
    },
    validations: {
        email: {
            required,
            email
        }
    }
}
</script>

<style>

</style>