/*
  WELCOME TO THE SEARCH INPUT COMPONENT
  This input is styled by the form-control bootstrap class
  We then emit an event when the user is typing on it
*/
<template>
    <input
    class="form-control"
    type="search"
    placeholder="Search"
    @input="$emit('typing', $event.target.value)">
</template>