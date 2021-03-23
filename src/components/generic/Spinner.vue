/*
    WELCOME TO THE SPINNER COMPONENT
    This component is styled by bootstrap
    I just added some generic style so that it fiots the whole parent container
    Fell free to add this to your code when you are for instance making a http request
*/
<template>
    <div class="spinner-wrapper d-flex justify-content-center">
        <div class="spinner-border spinner-grow" role="status">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.spinner-wrapper{
    width: 100%;
    height: 100%;

    align-items: center;
}
</style>