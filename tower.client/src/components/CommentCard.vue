<template>
  <div class="comment-card">
    <p>{{comment}}</p>

  </div>
</template>


<script>

export default {
  props: {comment: {type: Object, required: true}},
  setup(props){
    return {}
  }
}
</script>


<style lang="scss" scoped>

.comment-card {
background-color: var(--color-1);
width: 100%;
min-height: 10vh;
max-height: 60vh;
padding: var(--page-margins);
margin-bottom: var(--page-margins);
}

</style>

<!-- .add-comment-bar {
  background-color: var(--color-1);
  width: 100%;
  height: 30vh;
  padding: var(--page-margins);
  display: flex;
  flex-direction: column;
} -->