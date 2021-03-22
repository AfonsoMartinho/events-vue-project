<template>
    <div class="availability-bar" :class="color"></div>
</template>

<script>
export default {
    name: 'AvailabilityBar',
    props: {
        capacity: {
            type: Number,
            required: true
        },
        booked: {
            type: Number,
            required: true
        }
    },
    computed: {
        color() {
            let percentage = (this.booked * 100) / this.capacity  
            if (percentage <= 20 ) {
                return 'green'
            }
            else if (20 < percentage && percentage <= 90 ) {
                return 'yellow'
            }
            else if (percentage > 90){
                return 'red'
            } else {
                return 'red'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/generic.scss';
 .availability-bar{
        width: 20px;
        height: 100%;

        position: absolute;
        left: 0;
        top: 0;
        
        &.green{
            background-color: palette(availability, high);
        }
        &.yellow{
            background-color: palette(availability, medium);
        }
        &.red{
            background-color: palette(availability, low);
        }
    }
</style>