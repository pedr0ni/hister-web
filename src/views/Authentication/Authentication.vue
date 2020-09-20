<template>
    <div id="login-background" class="login-background">
        <div class="login-card">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Authentication',
    mounted() {
        let background = document.getElementById('login-background')
        let random = Math.floor(Math.random() * 4 + 1)
        background.style.backgroundImage = `url(${require(`../../assets/img/backgrounds/auth-bg-${random}.png`)})`
    }
}
</script>