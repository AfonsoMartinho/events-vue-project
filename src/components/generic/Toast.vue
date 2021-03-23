/*
  WELCOME TO THE TOAST COMPONENT
  This component was created to show useful information for the user (for instance when an event was deleted successfuly)
  All the toast elements are created by bootrap library and I added some transition css effects
  
  This component just needs to recive a type and a message properties.
  The type can be primary secondary success danger warning info light or dark this only changes the Toast color
  The message property is a String but you can add html tags to it
  To create a toast send it by EventBus like this example:
                EventBus.$emit('show-toast', 'success', `O evento <strong>EVENTO 1</strong> foi <strong>eliminado</strong> com sucesso`)
*/
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
        setTimeout(() => { // this will close the toast after 2.5s of showing up message
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