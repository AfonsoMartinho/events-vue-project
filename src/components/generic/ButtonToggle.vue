<template>
    <div 
    class="btn btn-lg btn-light toggle"
    :class="[{'close':isToggled}, {'open':!isToggled}]"
    @click="buttonHandler"
    data-bs-toggle="collapse"
    :data-bs-target="`#${elementToToggle}`"
    >
        <span>{{buttonText}}</span>
    </div >
</template>

<script>
export default {
    name: 'Button',
    props: {
        elementToToggle: {
            type: String,
            default: ''
        }
    },
    data() {
        return { 
            isToggled: false
        }
    },
    computed:{
        buttonText(){
            return this.isToggled ? 'Close' : 'Open'
        }
    },
    methods: {
        buttonHandler() {
            this.$emit('click')
            this.isToggled=!this.isToggled
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/generic.scss';
</style>