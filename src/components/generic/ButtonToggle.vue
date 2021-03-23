/*
  WELCOME TO BUTTON TOGGGLE COMPONENT
  The color of the button toggle component is a bootrap light button medium sized
  This button has 2 states, an open and a close one that changes the button text to 'Close' and 'Open'respectively

  You need to pass the elementToToggle prop:
  Its a String type prop that allows you to refer the id of the elemnt you whant to toggle
  This prop exists so that bootstrap js can show/hide the element you whant :)
*/
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