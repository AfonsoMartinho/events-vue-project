/*
    EVENTS API
    In here goes all the /event http requests

    NOTE:
 acording to the events api eventObject is like this
    {"id":1,
    "name":"Passeio de Barco",
    "description":"hey im a desscription",
    "eventStart":"2021-03-24T10:00:00+00:00",
    "eventEnd":"2021-03-24T13:00:00+00:00",
    "capacity":52,
    "booked":10}
*/
import axios from '@/api/setup'
import constants from '@/assets/constants'

// returns a list of all the events
const getEvents = function () {
    return axios.get('event/getall', {
        headers: {
            'Authorization': `Bearer ${constants.TOKEN}`
          }
    })
}

// updates an event
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

// deletes an event
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