import axios from 'axios'
import constants from '@/assets/constants'
// import store from '@/store/store'
import { EventBus } from '@/event-bus.js'


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

let instance = axios.create({
    baseURL: constants.BASE_URL,
    'Authorization': `Bearer ${constants.TOKEN}`
})

// This is the global service interceptor in case you whant to do something in all responses
instance.interceptors.response.use(config => {
    return config
}, error => {
    if (!error.response) {
        // if theres no response on the error create a global default error modal
		EventBus.$emit('show-error-modal', 'Desconhecido', 'Algo correu mal, por favor tente mais tarde!')

		return Promise.reject(error)
	}
    // creating the global error message with error.response
    EventBus.$emit('show-error-modal', error.response.status, error.response.statusText,)

    return Promise.reject(error)
})

export default instance
