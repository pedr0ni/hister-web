<template>
    
    <div>
        <header class="dashboard-header shadow-two">
            <div class="logo-holder">
                <img src="~@/assets/logo.png" alt="">
                <div class="vertical-separator"></div>
            </div>
            <div class="menu-items">
                <router-link to="/dashboard/overview">PAINEL</router-link>
                <router-link to="/dashboard/library">BIBLIOTECA</router-link>
                <router-link to="/dashboard/students">ALUNOS</router-link>
            </div>
            <div class="menu-icons">
                <a>
                    <Icon name="more_vert" type="action-icon">
                        <router-link to="/dashboard/profile/my"><Icon name="account_circle" /> Meu perfil</router-link>
                        <a @click="logout()"><Icon name="exit_to_app" /> Sair</a>
                    </Icon>
                </a>
            </div>
        </header>
        <div class="dashboard">
            <div class="breadcrumb" @click="$router.go(-1)">
                <i class="material-icons">chevron_left</i>
                <h6 class="headline-6">{{ $route.name }}</h6>
            </div>
            <transition name="slide-fade">
                <router-view />
            </transition>
        </div>
        
    </div>

</template>

<script>
import UserService from '../../services/UserService'
export default {
    data () {
        return {
            transitionName: 'slide-left'
        }
    },
    methods: {
        logout() {
            UserService.logout()
            this.$router.push({
                name: 'Login'
            })
        }
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    }
}
</script>
