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
            <span class="login100-form-title p-b-41" v-if="registrationStep != 3">
                Давайте начнем
            </span>
            <span class="login100-form-title p-b-41" v-else>
                Спасибо!
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
                <div v-if="registrationStep === 1">
                    <p>Шаг 1 из 2</p>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Имя
                        </span>
                        <input 
                            v-model.trim="$v.username.$model"
                            @focus="registrationError=''"
                            @blur="registrationError=''" 
                            class="input100" 
                            type="text" 
                            name="username" 
                            placeholder="Введите имя"
                            id="phonefield"
                            >
                        <p class="validate-error" v-if="$v.username.$invalid && !registrationError">
                            <template v-if="!$v.username.required">
                                Обязательное поле
                            </template>
                            <template v-if="!$v.username.minLength">
                                Имя должно быть не менее {{ $v.username.$params.minLength.min }} <br>символов
                            </template>
                            <template v-if="!$v.username.maxLength">
                                Имя должно быть не более {{ $v.username.$params.maxLength.max }} <br>символов
                            </template>
                        </p>
                    </div>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Фамилия
                        </span>
                        <input 
                            v-model.trim="$v.usersurname.$model"
                            @focus="registrationError=''"
                            @blur="registrationError=''" 
                            class="input100" 
                            type="text" 
                            name="usersurname" 
                            placeholder="Введите фамилию"
                            >
                        <p class="validate-error" v-if="$v.usersurname.$invalid && !registrationError">
                            <template v-if="!$v.usersurname.required">
                                Обязательное поле
                            </template>
                            <template v-if="!$v.usersurname.minLength">
                                Фамилия должна быть не менее {{ $v.usersurname.$params.minLength.min }} <br>символов
                            </template>
                            <template v-if="!$v.usersurname.maxLength">
                                Фамилия должна быть не более {{ $v.usersurname.$params.maxLength.max }} <br>символов
                            </template>
                        </p>
                    </div>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Отчество
                        </span>
                        <input 
                            v-model.trim="$v.usersubname.$model" 
                            @focus="registrationError=''"
                            @blur="registrationError=''" 
                            class="input100" 
                            type="text" 
                            name="usersubname" 
                            placeholder="Введите отчество"
                            >
                        <p class="validate-error" v-if="$v.usersubname.$invalid && !registrationError">
                            <template v-if="!$v.usersubname.minLength">
                                Отчество должно быть не менее {{ $v.usersubname.$params.minLength.min }} <br>символов
                            </template>
                            <template v-if="!$v.usersubname.maxLength">
                                Отчество должно быть не более {{ $v.usersubname.$params.maxLength.max }} <br>символов
                            </template>
                        </p>
                    </div>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Название компании
                        </span>
                        <input 
                            v-model.trim="$v.companyname.$model"
                            @focus="registrationError=''"
                            @blur="registrationError=''" 
                            class="input100" 
                            type="text" 
                            name="companyname"
                            placeholder="Введите название компании"
                            >
                        <p class="validate-error" v-if="$v.companyname.$invalid && !registrationError">
                            <template v-if="!$v.companyname.required">
                                Обязательное поле
                            </template>
                            <template v-if="!$v.companyname.minLength">
                                Название компании должно быть не менее {{ $v.companyname.$params.minLength.min }} <br>символов
                            </template>
                            <template v-if="!$v.companyname.maxLength">
                                Название компании должно быть не более {{ $v.companyname.$params.maxLength.max }} <br>символов
                            </template>
                        </p>
                    </div>
                    <div class="container-login100-form-btn m-t-32">
                        <button 
                            class="login100-form-btn" 
                            @click.prevent='nextStep()' 
                            :disabled="$v.companyname.$invalid || $v.usersubname.$invalid || $v.usersurname.$invalid || $v.username.$invalid">
                            Далее
                        </button>
                    </div>
                </div>
                <div v-if="registrationStep === 2">
                    <p>Шаг 2 из 2</p>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Телефон
                        </span>
                        <input 
                            v-model.trim="$v.phonenumber.$model"
                            @focus="registrationError=''"
                            @blur="registrationError=''" 
                            class="input100"
                            type="text"
                            name="phonenumber"
                            placeholder="Введите телефон"
                            >
                        <p class="validate-error" v-if="$v.phonenumber.$invalid && !registrationError">
                            <template v-if="!$v.phonenumber.required">
                                Обязательное поле
                            </template>
                            <template v-if="!$v.phonenumber.isPhone">
                                Неверный формат номера телефона.<br/> Верный формат: +79999999999
                            </template>
                        </p>
                    </div>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Адрес электронной почты
                        </span>
                        <input 
                            v-model.trim="emailaddress"
                            @focus="registrationError=''"
                            @blur="registrationError=''" 
                            class="input100" 
                            type="text" 
                            name="emailaddress" 
                            placeholder="Введите адрес электронной почты"
                            >
                        <p class="validate-error" v-if="$v.emailaddress.$invalid && !registrationError">
                            <template v-if="!$v.emailaddress.required">
                            Обязательное поле
                            </template>
                            <template v-else>
                            Неверный формат почты
                            </template>
                        </p>
                    </div>
                    <div class="wrap-input100">
                        <span class="txt1">
                            Пароль
                        </span>
                        <input 
                            v-model.trim="password" 
                            @focus="registrationError=''"
                            @blur="registrationError=''" 
                            class="input100" 
                            type="password" 
                            name="password" 
                            placeholder="Введите пароль"
                            >
                        <p class="validate-error" v-if="$v.password.$invalid && !registrationError">
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
                    <div class="policy-checkbox-wrap">
                        <input
                            v-model.trim="$v.agreePolice.$model" 
                            type="checkbox"
                            @focus="registrationError=''"
                            @blur="registrationError=''"
                            name="policy_agree">
                        <span class="form-policy-span">Я согласен с условиями <br/>
                            <a class="form-policy-a" href="/policy">политики конфиденциальности</a>
                        </span>
                    </div>
                    <p class="validate-error" v-if="$v.agreePolice.$invalid && !registrationError">
                        <template v-if="!$v.agreePolice.checked">
                            Обязательное поле
                        </template>
                    </p>
                    <p class="validate-error" v-if="registrationError">
                    Ошибка регистрации:<br/>{{registrationError}}
                    </p>
                    <div class="container-login100-form-btn m-t-65">
                        <button 
                            class="login100-form-btn" 
                            @click.prevent='submit()' 
                            :disabled="$v.phonenumber.$invalid || $v.emailaddress.$invalid || $v.password.$invalid || $v.agreePolice.$invalid">
                            Создать аккаунт
                        </button>
                    </div>
                </div>
                <div v-if="registrationStep === 3">
                    <p>Письмо с инструкциями по активации аккаунта было отправлено вам на почту</p>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import authAxios from "@/api/axios-auth"
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            registrationStep: 1,
            username: '',
            usersurname: '',
            usersubname: '',
            companyname: '',
            phonenumber: '+7',
            emailaddress: '',
            password: '',
            agreePolice: false,
            registrationError: ''
        }
    },
    methods: {
        nextStep(){
            this.registrationStep++
        },
        submit(){
            let dataToPost = {
                "email": this.emailaddress.toLowerCase(),
                "user_name": [this.username, this.usersubname, this.usersurname].join(' '),
                "phone": this.phonenumber,
                "company_name": this.companyname,
                "password": this.password,
            }
            authAxios.post('/api/register', dataToPost).then(() => {
                this.registrationStep++
                setTimeout(() => {
                    this.$router.push({path: '/'})
                }, 5000)
            }).catch((error) =>{
                this.registrationError = error.response.data.reasons[0]
            })
        }
    },
    validations: {
        username: {
            required,
            maxLength: maxLength(16),
            minLength: minLength(4),
        },
        usersurname: {
            required,
            maxLength: maxLength(16),
            minLength: minLength(3),
        },
        usersubname: {
            maxLength: maxLength(16),
            minLength: minLength(4),
        },
        companyname: {
            required,
            maxLength: maxLength(24),
            minLength: minLength(3)
        },
        phonenumber: {
            required,
            isPhone(phone){
                const regex = /^\+7[0-9]{10}$/;
                return regex.test(phone);
            }
        },
        emailaddress: {
            required,
            email
        },
        password: {
            required,
            maxLength: maxLength(16),
            minLength: minLength(8)
        },
        agreePolice: {
            checked (val) {
                return val
            }
        }
    }
}
</script>

<style>
span.form-policy-span {
    font-family: "Exo 2";
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;
    color: #1D1D1B;
    margin-left: 10px;
}
a.form-policy-a {
    font-family: "Exo 2";
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;
    color: #1D1D1B!important;
    text-decoration: underline;
}

.policy-checkbox-wrap {
    display: flex;
    flex-flow: row;
    align-items: center;
    margin: 18px 0 5px 0;
}
</style>