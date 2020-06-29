<template>
  <div class="container-login100">
        <div class="wrap-login100 p-t-30 p-b-50">
            <span class="login100-form-title p-b-41"  v-if="forgotStep == 1">
            Придумайте новый пароль
            </span>
            <span class="login100-form-title p-b-41" v-if="forgotStep != 1">
            Спасибо!
            </span>
            <form class="login100-form p-b-33 p-t-5">
                <div v-if="forgotStep == 1">
                    <div class="wrap-input100 ">
                        <span class="txt1">
                            Новый пароль
                        </span>
                        <input 
                            v-model.trim="$v.password.$model" 
                            @focus="authError=''"
                            @blur="authError=''"  
                            class="input100" 
                            type="password" 
                            placeholder="Введите новый пароль"
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
                    </div>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Повторите пароль
                        </span>
                        <input 
                            v-model.trim="$v.newPassword.$model"
                            @focus="authError=''"
                            @blur="authError=''"  
                            class="input100" 
                            type="password" 
                            placeholder="Введите новый пароль еще раз"
                            >
                        <p class="validate-error" v-if="$v.newPassword.$invalid && !authError">
                            <template v-if="!$v.newPassword.required">
                                Обязательное поле
                            </template>
                            <template v-if="!$v.newPassword.sameAsPassword">
                                Пароли должны совпадать
                            </template>
                        </p>
                        <p class="validate-error" v-if="authError">
                        {{authError}}
                        </p>
                    </div>
                    <div class="container-login100-form-btn m-t-32">
                        <button @click.prevent="onSubmit()" class="login100-form-btn" :disabled="$v.$invalid">
                        Войти
                        </button>
                    </div>
                </div>
                <div v-if="forgotStep == 2">
                    <p>Пароль успешно изменен. Вы автоматически будете переадресованы на страницу авторизации.</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axiosAuth from '@/api/axios-auth'
import { required, minLength, sameAs, maxLength } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            password: '',
            newPassword: '',
            forgotStep: 1,
            authError: ''
        }
    },
    props: ['token'],
    methods: {
        onSubmit(){
            let reqData = {
                password: this.password,
                token: this.token
            }
            axiosAuth.post('/api/reset-password-with-token', reqData).then(() => {
                this.forgotStep++
                setTimeout( () => this.$router.push({ path: '/lk'}), 5000);
            }).catch((error) => {
                this.registrationError = error.response.data.reasons[0]
            })
        }
    },
    validations: {
        password: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(16)
        },
        newPassword: {
            required,
            sameAsPassword: sameAs('password')
        }
    }
}
</script>

<style>

</style>