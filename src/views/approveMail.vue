<template>
  <div class="container-login100">
        <div class="wrap-login100 p-t-30 p-b-50">
            <span class="login100-form-title p-b-41">
                Подтверждение почты
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
                <p>Почта успешно подтверждена. Вы автоматически будуте перенаправлены на главную страницу.</p>
            </form>
        </div>
    </div>
</template>

<script>
import axiosAuth from "@/api/axios-auth"
export default {
    props: ['token'],
    beforeCreate(){
        axiosAuth.post('/approve-mail', {token: this.$options.propsData.token}).then(response => {
            console.log(response)
            setTimeout(() => {
                this.$router.push({path: '/'})
            }, 5000)
        })
    }
}
</script>

<style>

</style>