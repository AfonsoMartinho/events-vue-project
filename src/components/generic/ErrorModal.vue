/*
  WELCOME TO THE ERROR MODAL COMPONENT
  All the error modal elements are created by bootrap library
  I just added the@click event so that the parent component can toggle the instance of the modal
  This component just needs to recive an header and a message properties.
  this properties will be added to the element in the respective positions

  To create an error message send it by EventBus like this example:
		EventBus.$emit('show-error-modal', 'desconhecido', 'Algo correu mal, por favor tente mais tarde!')
*/
<template>
<!-- Bootstrap Modal -->
    <div>
        <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{`Erro com código ${header}`}}</h5>
                    <button type="button" class="btn btn-danger close" data-dismiss="modal" @click="$emit('closeModal')" aria-label="Close">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{message}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="$emit('closeModal')">Fechar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
export default {
    props:{
        header: String,
        message: String
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>