<template>
  <div class="container-login100">
        <div class="wrap-login100 p-t-30 p-b-50">
            <span class="login100-form-title p-b-41">
                Подтверждение почты
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
                <p v-if="!approveError">Почта успешно подтверждена. Вы автоматически будуте перенаправлены на главную страницу.</p>
                <p v-else>{{approveError}}</p>
            </form>
        </div>
    </div>
</template>

<script>
import axiosAuth from "@/api/axios-auth"
export default {
    props: ['token'],
    data() {
        return {
            approveError: ''
        }
    },
    beforeCreate(){
        axiosAuth.post('/api/approve-email', {token: this.$options.propsData.token}).then( () => {
            setTimeout(() => {
                this.$router.push({path: '/'})
            }, 5000)
        }).catch(error => {
            if (error.response.status >= 500){
                this.approveError = 'Произошла ошибка, почтовый адрес не подтвержден, попробуйте еще раз.'
            }
            else{
                this.approveError = error.response.data.reasons[0]
            }
        })
    }
}
</script>

<style>

</style>