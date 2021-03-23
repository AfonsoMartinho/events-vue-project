
/*
  WELCOME TO THE ACTION BUTTONS BAR COMPONENT
  In here we create a bar with the main app action buttons
  This bar can change from normal to edit state depending on the isEditing Boolean prop
  We emit all the buttons click events back
*/
<template>
    <div class="action-buttons-bar-wrapper">
        <div v-show="!isEditing" class="normal-state bar">
                <app-button
                color="blue"
                text="Edit"
                iconName="edit"
                class="button"
                @click="$emit('edit')"
                />

                <app-button
                color="red"
                text="Delete"
                iconName="trash-alt"
                isWide
                @click="$emit('delete')"
                class="button"
                />
        </div>
        <div v-show='isEditing' class="edit-state bar">
            <app-button
            color="green"
            text="Save"
            iconName="save"
            @click="$emit('save')"
            class="button"
            />

            <app-button
            color="grey"
            text="Cancel"
            iconName="meh"
            @click="$emit('cancel')"
            class="button"
            />

            <app-button
            color="red"
            text="Delete"
            iconName="trash-alt"
            isWide
            @click="$emit('delete')"
            class="button"
            />
        </div>
    </div>
</template>

<script>
import Button from '@/components/generic/Button.vue'

export default {
    name: 'ActionButtonsBar',
    components: {
        'app-button': Button,
    },
    props: {
        isEditing: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
.bar{
    & *{
        margin-left: 10px; // adding some space between buttons
    }
}
</style>