/*
  WELCOME TO THE EVENT CARD COMPONENT
  In here we create a card with the help of a event Object prop
  This Card can expand to show the card-bottom content with more options and details abou the event
  We also render the action-buttons-bar component that adds buttons to this card.
  We handle the update and delete functions that send the user data to the store as a payload
*/
<template>
    <div class="card-wrapper">
        <div v-if="!isLoading" class="card-top">
            <div class="left-content">
                <app-availability-bar
                :capacity="event.capacity"
                :booked="event.booked"/>

                <span class="text font-big">{{event.name}}</span>

                <app-date-time-text
                :start="event.eventStart"
                :end="event.eventEnd"
                />
            </div>
            <div class="right-content">
                <div class="availability">
                    <span class="text font-small">Availability</span>
                    <span class="text font-medium">{{event.booked}}/{{event.capacity}}</span>
                </div>

                <app-button-toggle
                class="toggle"
                :elementToToggle="`card-${event.id}-content`"
                />
            </div>
        </div>
        <div v-if="!isLoading" :id="`card-${event.id}-content`" class="collapse card-bottom">
            <div class="description">
                <span v-if="!isEditing" class="font-small">
                    {{event.description}}
                </span>

                <textarea 
                v-else 
                name="description" 
                class="form-control" 
                rows="4" 
                v-model="event.description"
                ></textarea>
            </div>
                <app-action-buttons-bar
                class="action-buttons-wrapper"
                :isEditing="isEditing"
                @delete="deleteHandler"
                @edit="editHandler"
                @cancel="cancelHandler"
                @save="saveHandler"
                />
        </div>
        <div v-else>
            <app-spinner/>
        </div>
    </div>
</template>

<script>
import ButtonToggle from '@/components/generic/ButtonToggle.vue'
import ActionButtonsBar from '@/components/generic/ActionButtonsBar.vue'
import AvailabilityBar from '@/components/generic/AvailabilityBar.vue'
import DateTimeText from '@/components/generic/DateTimeText.vue'
import Spinner from '@/components/generic/Spinner.vue'

import { EventBus } from '@/event-bus.js'

import { mapGetters, mapActions} from 'vuex'

export default {
    name: 'EventCard',
    components: {
        'app-button-toggle': ButtonToggle,
        'app-action-buttons-bar': ActionButtonsBar,
        'app-availability-bar': AvailabilityBar,
        'app-date-time-text': DateTimeText,
        'app-spinner': Spinner
    },
    props: {
        id: {
            type: Number,
            default: 0
        },
        event:{
            type: Object,
            required: true
        }
    },
    data() {
        return{
            isEditing: false,
            isLoading:false,
            previousEventState:{}
        }
    },
    computed:{
        ...mapGetters('eventsModule', ['getEventsList'])
    },
    methods: {
        ...mapActions('eventsModule', ['editEvent', 'deleteEvent']),
        async deleteHandler () {
            // creating the payload to send to the store
            let eventData = {
                'id': this.event.id,
                'name': this.event.name,
                'description': this.event.description,
                'eventStart': this.event.eventStart,
                'eventEnd': this.event.eventEnd,
                'capacity': this.event.capacity,
                'booked': this.event.booked
            }

            try {
                this.isLoading = true // while processing data we show the load card spinner
                await this.deleteEvent(eventData)// trigger store action and send the payload
                // creating the toast
                // sending event to show the succes toast in App view
                EventBus.$emit('show-toast', 'success', `O evento <strong>${this.event.name}</strong> foi <strong>eliminado</strong> com sucesso`)
            } catch(error) {
                // sending event to show the error toast in App view
                EventBus.$emit('show-toast', 'danger', `Ocorreu um <strong>erro</strong> ao eliminar o evento  <strong>${this.event.name}</strong>`)
            } finally {
                // at the end we hide the spinner and action-buttons-bar goes to its original state
                this.isLoading = false
                this.isEditing = false
            }
        },
        editHandler(){
            //  storing all event data in an Object so if the user cancels the editing we can rollback in the cancelHandler function
            this.previousEventState = JSON.parse(JSON.stringify(this.event));
            this.isEditing = true // changing the action-buttons-bar state 
            // this event is going to close all other action bars with the edit state active so that thje user cant edit 2 events at the same time
            EventBus.$emit('is-editing-other-event', this.event.id)
        },
        async saveHandler () {
            // creating the payload to send to the store
            let eventData = {
                'id': this.event.id,
                'name': this.event.name,
                'description': this.event.description,
                'eventStart': this.event.eventStart,
                'eventEnd': this.event.eventEnd,
                'capacity': this.event.capacity,
                'booked': this.event.booked
            }

            try {
                this.isLoading = true // while processing data we show the load card spinner
                await this.editEvent(eventData) // trigger store action and send the payload
                // sending event to show the error toast in App view
                EventBus.$emit('show-toast', 'success',  `O evento <strong>${this.event.name}</strong> foi <strong>editado</strong> com sucesso`)

            } catch (error){
                 // sending event to show the error toast in App view
                EventBus.$emit('show-toast', 'danger', `Ocorreu um <strong>erro</strong> a editar o evento <strong>${this.event.name}</strong>`)
            } finally {
                // at the end we hide the spinner and action-buttons-bar goes to its original state
                this.isLoading = false
                this.isEditing = false
            }
        },
        cancelHandler(){
            // We rollback the event to his previous state and action-buttons-bar goes to its original state
            Object.assign(this.event, this.previousEventState);
            this.isEditing = false
        }
    },
    mounted(){
    // When a card is mounted we listen to the is-edithing-an-event event so that we know if another event card is in edit mode...
    // if the event triggers this mneans that a card is on edit mode and we need to close all edit modes in all cards except the one that whit the respective  id ...
    // wee do this in order to not let the user edit two events at the same time  
    EventBus.$on('is-editing-other-event', (eventId) => {
            if (this.event.id == eventId) return // if the edit buttoin clicked is of this card dont close it
            this.isEditing = false // if the edit button clicked is from another card we need to exit edit mode in this one
        })
    }
}
</script>

<style lang="scss" scoped>
.card-wrapper{
    width: 100%;
    position: relative;
    padding: 15px 15px 15px 60px;

    background-color: palette(card, body);
    border-bottom: 2px solid palette(generic, separator);

    .card-top{
        display: flex;
        justify-content: space-between;
        align-items: center;


        .left-content{
            display: flex;
            flex-direction: column;
        }

        .right-content{
            display: flex;
            align-items: center;

            .availability{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }

            .toggle{
                margin-left: 80px;
            }
        }
    }
    .card-bottom{
        box-sizing: border-box;

        display: flex;
        justify-content: space-between;

        .description{
            padding-top: 30px;
            width: 45%;
            min-height: 150px; // description is the element that sets the card-bottom component min height
        
            textarea { 
                resize: none; 
                border: none;
            }
        }
        .action-buttons-wrapper{
            width: 45%;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
        }

        &.collapse:not(.show) { // the display flex property of card-bottom overwrites the display none of the bootstrap .collapse class so we need to add the display none to this class again
            display: none;
        }
    }
}

</style>