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
            <div class="input-holder login-input mt-20">
                <label>NOME COMPLETO</label>
                <input v-model="auth.name" type="text" placeholder="Matheus Pedroni">
            </div>
            <div class="input-holder login-input mt-20">
                <label>Email</label>
                <input v-model="auth.email" type="text" placeholder="exemplo@exemplo.com">
            </div>
            <div class="input-holder login-input mt-20 password-input">
                <label>SENHA</label>
                <input v-model="auth.password" @input="inputChange" type="password" placeholder="********">
            </div>

             <div class="input-holder login-input mt-20 password-input">
                <label>REPETIR SENHA</label>
                <input v-model="auth.repeatPassword" @input="inputChange" type="password" placeholder="********">
            </div>

            <button v-if="isLoading" class="button login-button primary-button ripple mt-20">
                <Spinner size="small" />
            </button>
            <button v-else class="button login-button primary-button ripple mt-20" @click="register">
                CRIAR
            </button>
            

            <router-link to="login" class="centered-link">Já possui uma conta? Entrar</router-link>
        </div>
    </div>
</template>

<script>
import Snackbar from '../../components/Snackbar'
import UserService from '../../services/UserService'
import Complete from './Complete'

export default {
    data() {
        return {
            isLoading: false,
            hasFinished: false,
            auth: {
                name: '',
                email: '',
                password: '',
                repeatPassword: ''
            }
        }
    },
    methods: {
        async register() {
            this.isLoading = true
            
            const response = await UserService.register(this.auth)

            if (response) {
                
                this.hasFinished = true
            }

            this.isLoading = false
        },

        clickedButton() {
            this.$router.push({name: 'Login'})
        },

        inputChange(e) {
            this.setPasswordsDanger(this.auth.password != this.auth.repeatPassword)
        },

        setPasswordsDanger(danger) {
            let passwords = document.getElementsByClassName('password-input')
            if (danger) {
                passwords.forEach(entry => {
                    if (!entry.classList.contains('input-danger'))
                        entry.classList.add('input-danger')
                })
            } else {
                passwords.forEach(entry => {
                    if (entry.classList.contains('input-danger'))
                        entry.classList.remove('input-danger')
                })
            }
        }
    },
    components: {
        Complete
    }
}
</script>