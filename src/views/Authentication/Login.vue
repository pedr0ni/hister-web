<template>
    <div>
        <h1 class="login-title">HISTER</h1>
        <img src="~@/assets/img/login-placeholder.png" alt="">
        <div class="login-card-form">
            <div class="input-holder login-input">
                <label>Email</label>
                <input v-model="authentication.email" type="text" placeholder="exemplo@exemplo.com">
            </div>
            <div class="input-holder login-input mt-20">
                <label>SENHA</label>
                <input v-model="authentication.password" type="password" placeholder="********">
            </div>

            <div class="md-checkbox mt-15">
                <input id="test" type="checkbox" checked>
                <label for="test">Mantenha-me logado</label>
            </div>

            <button v-if="!isLoading" class="button primary-button login-button ripple mt-20" @click="login">
                ACESSAR
            </button>
            <button v-else class="button primary-button login-button ripple mt-20">
                <Spinner size="small" />
            </button>

            <router-link to="register" class="centered-link">Não possui uma conta? Registrar</router-link>
        </div>
    </div>
</template>

<script>
import Snackbar from '../../components/Snackbar'
import UserService from '../../services/UserService'

export default {
    data() {
        return {
            isLoading: false,
            authentication: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login() {
            this.isLoading = true
            UserService.authenticate(this.authentication).then(response => {
                UserService.setToken(response.data.token)
                this.$router.push({name: 'Overview'})
            }).catch(error => {
                Snackbar.show(error.response.data.message)
            }).then(() => {
                this.isLoading = false
            })
        }
    }
}
</script>