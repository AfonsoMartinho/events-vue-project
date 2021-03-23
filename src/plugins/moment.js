/*
    MOMENT.js configuration
    momemnt its a plugin that allow us to parse all the variables of type DATE
    In here we add $moment to the VUE prototype Object so that you can access it like this:
    $moment()
*/
import Vue from 'vue'
import Moment from 'moment'

Moment.locale('pt')
Vue.prototype.$moment = Moment