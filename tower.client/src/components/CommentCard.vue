<template>
  <div class="comment-card">
    <div class="d-flex flex-column justify-comment-between">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <img :src="comment.creator.picture" :alt="comment.creator.name" class="comment-profile-bubble">
          <h4 class="component-title comment-name">{{ comment.creator.name }}</h4>
        </div>
        <i v-if="comment.creator._id == accountId" class="mdi mdi-delete delete-btn" @click="removeComment"></i>
      </div>
      <p>{{ comment.body }}</p>
    </div>
    <!-- add a way to delete your own comments -->
  </div>
</template>


<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import { commentsService } from '../services/CommentsService'


export default {
  props: { comment: { type: Object, required: true } },
  isBusy: false,
  setup(props) {
    return {
      // This is
      accountId: computed(() => AppState.account._id),

      async removeComment() {
        if (!this.isBusy) {
          this.isBusy = true
        await commentsService.removeComment(props.comment._id)
        this.isBusy = false
        }
      }
    }
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
  padding-top: 0px;
  padding-right: 2px;
  margin-bottom: calc(2 * var(--page-margins));
}

.comment-card p {
  padding-right: calc(var(--page-margins) - 2px);
}

.comment-profile-bubble {
  border-radius: 50%;
  height: calc(2 * var(--page-margins));
  width: calc(2 * var(--page-margins));
  object-fit: cover;
  position: relative;
  top: calc(-1 * var(--page-margins));
}

.comment-name {
  font-size: 28px;
  font-weight: 500;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.delete-btn {
  color: #ffffff80;
}

.delete-btn:hover {
  color: #801010;
  cursor: pointer;
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