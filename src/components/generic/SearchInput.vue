<template>
    <input
    class="form-control"
    type="search"
    placeholder="Search"
    @input="$emit('typing', $event.target.value)">
</template>