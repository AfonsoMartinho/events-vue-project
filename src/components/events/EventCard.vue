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
        ...mapGetters('eventsModule', ['getEventsList']),
    },
    methods: {
        ...mapActions('eventsModule', ['editEvent', 'deleteEvent']),
        async deleteHandler () {
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
                this.isLoading = true
                await this.deleteEvent(eventData)
                // creating the toast
                // sending event to show the toas in App view
                EventBus.$emit('show-toast', 'success', `O evento <strong>${this.event.name}</strong> foi <strong>eliminado</strong> com sucesso`)
            } catch(error) {
                EventBus.$emit('show-toast', 'danger', `Ocorreu um <strong>erro</strong> ao eliminar o evento  <strong>${this.event.name}</strong>`)
            } finally {
                this.isLoading = false
                this.isEditing = false
            }
        },
        editHandler(){
            //  storing all event data in an Object so if the user cancels the editing we can rollback
            this.previousEventState = JSON.parse(JSON.stringify(this.event));
            this.isEditing = !this.isEditing
        },
        async saveHandler () {
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
                this.isLoading = true
                await this.editEvent(eventData)
                EventBus.$emit('show-toast', 'success',  `O evento <strong>${this.event.name}</strong> foi <strong>editado</strong> com sucesso`)

            } catch (error){
                EventBus.$emit('show-toast', 'danger', `Ocorreu um <strong>erro</strong> a editar o evento <strong>${this.event.name}</strong>`)
            } finally {
                this.isLoading = false
                this.isEditing = false
            }
        },
        cancelHandler(){
            // Now we rollback the event to his previous state
            Object.assign(this.event, this.previousEventState);
            this.isEditing = false
        },
        createToast(type,message){
            this.toastType = type
            this.toastMessage = message
            this.showToast = true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
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