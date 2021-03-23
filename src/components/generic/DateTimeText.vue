/*
  WELCOME TO THE DATE TIME TEXT COMPONENT
  In here we provide a dynamic element that displays the date, time and duration parsed for a user friendlier enviorment
  We received two String props (start and end dates) that are parsed by moment.js plugin
  Then we format the text as a template string
  if we got the same date but with diferent times we display it in a diferent way!   
*/
<template>
    <div class="date-time-text-wrapper text font-tiny">
    <!-- We have 2 possible formatations  for the display of the event date time beacause it can be in different days-->
    <span v-if="sameDay">
        {{`${startDate} from ${startHour} to ${endHour} (${duration}h)`}}
    </span>
    <span v-else>
        {{`${startDate} at ${startHour} to ${endDate} at ${endHour} (${duration}h)`}}
    </span>
    </div>
</template>

<script>
export default {
    props:{
        start:{
            type: String,
            required: true
        },
        end:{
            type: String,
            required: true
        }
    },
    computed:{
        startDate(){
            return this.$moment(this.start).format('DD.MM.YYYY')
        },
        startHour(){
            return this.$moment(this.start).format('HH:mm')
        },
        endDate(){
            return this.$moment(this.end).format('DD.MM.YYYY')
        },
        endHour(){
            return this.$moment(this.end).format('HH:mm')
        },
        duration(){
            // this diff moment function return the time (in hours) between the start and the end date 
            return this.$moment(this.end).diff(this.$moment(this.start), 'hours')
        },
        sameDay(){
            // in here we check if the event start date is in the same day as the end date 
            return this.startDate == this.endDate
        }
    }
}
</script>