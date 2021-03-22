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
    },
    data() {
        return {
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>

</style>