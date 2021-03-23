<template>
    <div class="playground-wrapper">
        <h1>Welcome to Afonso's Playground</h1>
        <h3>I created this playground just to test my generic components and some other stuff.</h3>

        <h2>Fonts</h2>
        <div class="fonts-wrapper container">
            <p class="text font-tiny">This is a "tiny" font</p>
            <p class="text font-small">This is a "small" font</p>
            <p class="text font-medium">This is a "medium" font</p>
            <p class="text font-big">This is a "big" font</p>
        </div>

        <h2>Buttons</h2>
        <div class="buttons-wrapper container">
            <app-button
            color="grey"
            text="Close"
            @click="doSomething"
            />

            <app-button
            color="grey"
            text="Open"
            @click="doSomething"
            />
            
            <app-button
            color="grey"
            text="Cancel"
            iconName="meh"
            @click="doSomething"
            />

            <app-button
            color="red"
            text="Delete"
            iconName="trash-alt"
            @click="doSomething"
            />

            <app-button
            color="blue"
            text="Edit"
            iconName="edit"
            @click="doSomething"
            />

             <app-button
            color="green"
            text="Save"
            iconName="save"
            @click="doSomething"
            />
        </div>

        <h2>Toggle Buttons</h2>
        <div class="container">
            <app-button-toggle
            elementToToggle="my-toggle"
            />
            <div class="collapse" id="my-toggle">
                <div class="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
            </div>
        </div>

        <h2>Card</h2>
        <div class="container">
            <app-card
            
            />
        </div>
    </div>
</template>

<script>
import Button from '@/components/generic/Button.vue'
import ButtonToggle from '@/components/generic/ButtonToggle.vue'
import EventCard from '@/components/generic/EventCard.vue'

export default {
    name: 'AfonsoPlayground',
    components: {
        'app-button': Button,
        'app-button-toggle': ButtonToggle,
        'app-card': EventCard
    },
    data() {
        return{
            ButtonToggleText: 'Open'
        }
    },
    methods:{
        doSomething(){
            alert('Something')
        }
    }
}
</script>


<style lang="scss" scoped>


.playground-wrapper{
    padding: 2%;

    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .fonts-wrapper{
        .font-tiny{
            @include generic-font-style(tiny)
        }
        .font-small{
            @include generic-font-style(small)
        }
        .font-medium{
            @include generic-font-style(medium)
        }
        .font-big{
            @include generic-font-style(big)
        }
    }


    
}   
</style>