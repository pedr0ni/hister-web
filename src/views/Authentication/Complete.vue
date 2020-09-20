<template>
    <div class="complete-holder">
        <h1 class="login-title">{{ title ? title : 'Title' }}</h1>
        <img src="~@/assets/img/complete-placeholder.png" alt="">
        <div class="login-card-form">
            <p class="body-one text-center">{{ content ? content : 'Content' }}</p>
            <button style="height: 65px;" class="button primary-button ripple mt-20" @click="buttonAction ? buttonAction() : () => {}">{{ buttonText ? buttonText : 'Button text' }}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        content: String,
        buttonText: String,
        buttonAction: Function
    }    
}
</script>
