import axios from '@/api/setup'
import constants from '@/assets/constants'
// import store from '@/store/store'

const getEvents = function () {
    return axios.get('event/getall', {
        headers: {
            'Authorization': `Bearer ${constants.TOKEN}`
          }
    })
}

const updateEvent = function (eventObject) {
    return axios({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${constants.TOKEN}`
        },
		method: 'POST',
		url: 'event/edit ',
		data: JSON.stringify(eventObject)
	})
}

const deleteEvent = function (eventObject) {
    return axios({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${constants.TOKEN}`
        },
		method: 'POST',
		url: 'event/delete ',
		data: JSON.stringify(eventObject)
	})
}

export default {
    getEvents,
	updateEvent,
    deleteEvent
}