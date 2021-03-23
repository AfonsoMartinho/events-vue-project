/*
  WELCOME TO THE MAIN APP VIEW
  In here we render the main components of the website
*/
<template>
  <div id="app">
    <app-events/>
    
    <!-- Toast -->
    <!-- This gives the user feedback messages (is trigered by the 'show-toast' event bus) -->
		<app-toast
    v-if="showToast"
    :type="toastType"
    :message="toastMessage"
    @closeToast="showToast=false"
    />

    <!-- Error Modal -->
    <!-- This gives the user feedback main error messages (is trigered by the 'show-error-modal' event bus) -->
    <app-error-modal
    v-if="showModal"
    :header="modalHeader"
    :message="modalMessage"
    @closeModal="showModal = false"
    />
    <!-- <app-afonso-playground/> -->
  </div>
</template>

<script>
// import AfonsoPlayground from '@/components/playgrounds/AfonsoPlayground.vue'
import Events from '@/views/Events.vue'
import Toast from '@/components/generic/Toast.vue'
import ErrorModal from '@/components/generic/ErrorModal.vue'

import { EventBus } from '@/event-bus.js'

export default {
  name: 'App',
  components: {
    // 'app-afonso-playground': AfonsoPlayground,
    'app-events': Events,
    'app-toast': Toast,
    'app-error-modal': ErrorModal
  },
  data() {
    return{
      toastMessage: '',
      toastType:'',
      showToast: false,
      modalMessage: '',
      modalHeader:'',
      showModal: false
    }
  },
  methods:{
    // In here we trigger all the event bussses we whant for the app to be listening to
    triggerEventBus(){
      // Show Toast Event Bus 
      EventBus.$on('show-toast', (type, message) => {
        // Showing toast and sending type and message vars to it
          this.toastMessage = message.toString();
          this.toastType = type.toString();
          this.showToast = true
        })
      // Show Error Modal Event Bus 
      EventBus.$on('show-error-modal', (header, message) => {
        // Showing Modal and sending  and header and message vars to it
          this.modalHeader = header.toString();
          this.modalMessage = message.toString();
          this.showModal=true
        })
    }
  },
  mounted() {
      this.triggerEventBus()
  }
}
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
}
</style>
