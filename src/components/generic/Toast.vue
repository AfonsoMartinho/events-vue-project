<template>
    <transition name="showing-toast" appear>
        <div 
        :class="`toast-wrapper alert alert-${type}`" 
        role="alert"
        v-html="message">
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        type: String,
        message: String
    },
    created () {
        setTimeout(() => {
            this.$emit('closeToast')
        }, 2500)
    }
}
</script>

<style lang="scss" scoped>
.toast-wrapper{
    width: 80%;
    max-width: 1200px;
    position: absolute;
    top: 20px;
	left: 50%;
    transform: translateX(-50%);
    z-index: 200;

    transition: top 0.5s ease;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.64);
}
.showing-toast-enter-to, .showing-toast-leave {
    top: 20px;
}

.showing-toast-enter, .showing-toast-leave-to {
    top: -60px;
}
</style>