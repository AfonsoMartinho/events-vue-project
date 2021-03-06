/*
  WELCOME TO THE EVENTS VIEW
  In here we render the app-events-list component requesting and fetching the events list data
  We also have a search input field that filters the events list by name and description with the help of the searchHandler function
  While the Events List isnt fetched we show a nice bootstrap spinner component instead
*/

<template>
    <div class="events-view-wrapper">
        <div class="events-top-wrapper">
            <div class="text font-big">Next Events</div>

            <app-search-input
            class="search-input"
            @typing="searchHandler"
            />        
        </div>
        <div class="list-wrapper">
            <app-spinner
            class="spinner"
            v-if="isLoading"/>

            <app-events-list
            v-if="!isLoading"
            :eventsList="eventsListSearchResults"
            />
        </div>
    </div>
</template>

<script>
import EventsList from '@/components/events/EventsList.vue'
import SearchInput from '@/components/generic/SearchInput.vue'
import Spinner from '@/components/generic/Spinner.vue'
/* Assets and Mappers */
import { mapGetters, mapActions} from 'vuex'

export default {
    components: {
        'app-events-list': EventsList,
        'app-search-input': SearchInput,
        'app-spinner': Spinner
    },
    data(){
        return {
            isLoading: false,
            searchQuery: ''
        }
    },
    computed: {
        ...mapGetters('eventsModule', ['getEventsList']),
        // this function will search if the search input value(searchQuery) matches the event name or the event description
        eventsListSearchResults() {
            if(!this.searchQuery) return this.getEventsList // if theres no search value render the whole list
            let eventsToDisplay = this.getEventsList.filter(eventFromStore => {
                let matchingEventName = eventFromStore.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                let matchingEventDescription = eventFromStore.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                return matchingEventName || matchingEventDescription 
            })
            return eventsToDisplay
        }
    },
    methods: {
        ...mapActions('eventsModule', ['fetchEvents']),
        // in here we put all the initial requests we need to fetch all the list data
        getInitialRequests () {
            this.requestEvents()
        },
        // This function allow us to call the fetchEvents action from the store
        async requestEvents() {
            this.isLoading = true
            try {
                await this.fetchEvents()
            } finally {
                this.isLoading = false
            }
        },
        searchHandler(stringToSearch) {
            this.searchQuery = stringToSearch
        }
    },
    mounted () {
        this.getInitialRequests()
    }
}
</script>

<style lang="scss" scoped>
.events-view-wrapper{
    width: 100%;
    height: 100%;
    padding: 0 15%;
    .events-top-wrapper{
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .search-input{
            width: 30%;
        }
    }
    .list-wrapper{
        width: 100%;
        height: 100%;

        .spinner{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: palette(card, body);
        }
    }
}

</style>