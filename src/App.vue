<template>
  <div id="app">
    <app-events/>
    <!-- Toast -->
		<app-toast
    v-if="showToast"
    :type="toastType"
    :message="toastMessage"
    @closeToast="showToast=false"
    />

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
  },
  mounted() {
      EventBus.$on('show-toast', (type, message) => {
          this.toastMessage = message.toString();
          this.toastType = type.toString();
          this.showToast = true
        })
      EventBus.$on('show-error-modal', (header, message) => {
          this.modalHeader = header.toString();
          this.modalMessage = message.toString();
          this.showModal=true
        })
  }
}
</script>

<style lang="scss">
@import '@/styles/main.scss';
#app {
    width: 100%;
    height: 100%;
}
</style>
