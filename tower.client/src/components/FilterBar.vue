<template>
  <div class="filter-bar">
    <button class="btn btn-secondary" @click="setFilter('')">All</button>
    <button class="btn btn-secondary" @click="setFilter('concert')">Concerts</button>
    <button class="btn btn-secondary" @click="setFilter('convention')">Conventions</button>
    <button class="btn btn-secondary" @click="setFilter('sport')">Sports</button>
    <button class="btn btn-secondary" @click="setFilter('digital')">Digital</button>
  </div>
</template>


<script>
import { eventsService } from '../services/EventsService'

export default {
  // emits: [eventsFilter],
  setup(){
    return {
      setFilter(filter) {
        eventsService.filterEvents(filter)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .filter-bar {
    margin: var(--page-margins);
    margin-top: 0px;
    background-color: var(--color-1);
    color: var(--color-2);
    padding-left: var(--page-margins);
    padding-right: var(--page-margins);
    padding-top: calc(var(--page-margins) / 2);
    padding-bottom: calc(var(--page-margins) / 2);
  }
</style>