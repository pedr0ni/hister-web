<template>
    <Complete 
    title="TUDO OK!" 
    content="Um e-mail foi enviado para sua caixa de entrada. Verifique para completar seu registro." 
    buttonText="ENTRAR"
    :buttonAction="clickedButton"
    v-if="hasFinished"/>
    <div v-else>
        <h1 class="login-title">Nova Conta</h1>
        <img src="~@/assets/img/register-placeholder.png" alt="">
        <div class="login-card-form">
            <div class="input-holder login-input">
                <label>RA</label>
                <input type="text" placeholder="XXXXX">
            </div>
            <div class="input-holder login-input mt-20">
                <label>Email</label>
                <input type="text" placeholder="exemplo@exemplo.com">
            </div>
            <div class="input-holder login-input mt-20">
                <label>SENHA</label>
                <input type="password" placeholder="********">
            </div>

            <button v-if="isLoading" class="button login-button primary-button ripple mt-20">
                <Spinner size="small" />
            </button>
            <button v-else class="button login-button primary-button ripple mt-20" @click="login">
                CRIAR
            </button>
            

            <router-link to="login" class="centered-link">Já possui uma conta? Entrar</router-link>
        </div>
    </div>
</template>

<script>
import Snackbar from '../../components/Snackbar'
import Complete from './Complete'

export default {
    data() {
        return {
            isLoading: false,
            hasFinished: false
        }
    },
    methods: {
        login() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
                this.hasFinished = true
            }, this.$fakeDelay)
        },

        clickedButton() {
            this.$router.push({name: 'Login'})
        }
    },
    components: {
        Complete
    }
}
</script>