/*
    EVENTS STORE MODULE
    in here we syncronize all the events api data with the store  
*/

import eventsAPI from '@/api/events'

// events state should be an object with total events Number property an events Array
const state = {
    events: {}
}

const getters = {
    getEventsList: state => {
        return state.events.events
    },
    getTotalEvents: state => {
        return state.events.totalEvents
    }
}

const mutations = {
    SET_EVENTS: (state, payload) => {
        state.events = payload
    },
    SET_EVENTS_LIST: (state, payload) => { //Only changes the events array of object
        state.events.events = payload
    }
}

const actions = {
    fetchEvents: async (context) => {
		const res = await eventsAPI.getEvents()
		context.commit('SET_EVENTS', res.data)
		return res
    },
    editEvent: async (context, payload) => {
        const res = await eventsAPI.updateEvent(payload)
		context.commit('SET_EVENTS', res.data)
        return res
    },
    deleteEvent: async (context, payload) => {
        const res = await eventsAPI.deleteEvent(payload)
		context.commit('SET_EVENTS', res.data)
        return res
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
