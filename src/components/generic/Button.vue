<template>
    <div 
    class="btn"
    :class="[bootstrapColor, bootstrapSize, {'wide' : isWide}]"
    @click="$emit('click')"
    >
        <i 
        v-if="iconName" 
        :class="[fontawesomeStyle, `fa-${iconName}`]"
        ></i>
        <span>{{text}}</span>
    </div >
</template>

<script>
export default {
    name: 'Button',
    props: {
        'text': String,
        'color': {
            type: String,
            default: 'grey',
            validator (value) {
                return ['grey','green','red','blue'].includes(value)
            }
        },
        'size': {
            type: String,
            default: 'large',
            validator (value) {
                return ['small','medium','large'].includes(value)
            }
        },
        'isWide': {
            type: Boolean,
            default: false
        },
        'iconName': String,
        'iconStyle': {
            type: String,
            default: 'regular',
            validator (value) {
                return ['solid','regular','light','duotone','brands'].includes(value)
            }
        }
    },
    computed: {
        bootstrapSize() {
            let className = ''
            switch (this.size) {
                case 'small':
                    className = 'btn-sm';
                    break
                case 'medium':
                    className = ''; // '' cause if its medium goes to the Bootstrap default state (no Class)
                    break
                case 'large':
                    className = 'btn-lg';
                    break
                default:
                    break;
            }
            return className
        },
        bootstrapColor() {
            let className = ''
            switch (this.color) {
                case 'grey':
                    className = 'btn-light';
                    break
                case 'green':
                    className = 'btn-success';
                    break
                case 'red':
                    className = 'btn-danger';
                    break
                case 'blue':
                    className = 'btn-primary';
                    break
                default:
                    break;
            }
            return className
        },
        fontawesomeStyle() {
            let className = ''
            switch (this.iconStyle) {
                case 'solid':
                    className = 'fas';
                    break
                case 'regular':
                    className = 'far';
                    break
                case 'light':
                    className = 'fal';
                    break
                case 'duotone':
                    className = 'fad';
                    break
                case 'brans':
                    className = 'fab';
                    break
                default:
                    break;
            }
            return className
        }
    }
}
</script>

<style lang="scss" scoped>
span{
    margin-left: 3px;
}
</style>