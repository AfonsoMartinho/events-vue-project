/*
  WELCOME TO THE EVENTS LIST COMPONENT
  In here we create a list of cards components with the help of a eventsList Array of Objects prop
*/
<template>
    <div class="events-list-wrapper">
        <app-event-card
        v-for="event in eventsList"
        :key="event.id"
        :event="event"
        />
    </div>
</template>

<script>
import EventCard from '@/components/events/EventCard.vue'
export default {
    components:{
        'app-event-card': EventCard
    },
    props:{
         eventsList: {
            type: Array,
            default(){
               return []
            },
            required:true
        }
    }
}
</script>

<style lang="scss" scoped>
</style>