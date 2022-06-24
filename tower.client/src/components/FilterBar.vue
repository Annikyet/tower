<template>
  <div class="filter-bar">

    meow meow, i'm a filter bar
  </div>
</template>


<script>
export default {
  setup(){
    return {}
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