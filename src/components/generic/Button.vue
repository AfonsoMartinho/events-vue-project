/*
  WELCOME TO BUTTON COMPONENT
  A bootrap and font awesome button friendly was created
  
  The main div represents a bootstrap button that can be costumized by color and size
  The color prop allows 'grey','green','red' and 'blue' values
  The size property allows 'small','medium' and 'large' values
  You can also pass a isWide BPorpertyy that makes the button wider 
  
  The i tag nested in the main div represents the font awesome icon
  The iconName prop receives the font awesome icon name
  The iconStyle prop can receive 'solid','regular','light','duotone' and 'brands' font awesome style values

  The text property inserts the button text
*/
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
        // in here we convert the size prop to the respective bootstrap class
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
        // in here we convert the size color to the respective bootstrap class
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
        // in here we convert the iconStyle prop to the respective font awesome class
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