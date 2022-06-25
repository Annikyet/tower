<template>
  <div class="event-page">
    <EventSplash :event="event" :myTicket="myTicket" />
    <div class="attendance-list">
      <h5 class="thin-text">Already attending:</h5>
      <div class="attendance-bar">
        <img v-for="t in tickets" :key="t._id" :src="t.account.picture" :alt="t.account.name" :title="t.account.name" class="profile-bubble">
      </div>
    </div>
    <h5 class="thin-text">Chatter:</h5>
    <form class="add-comment-bar" @submit.prevent="createComment">
      <textarea v-model="commentBody" name="addComment" id="addComment" class="bg-dark text-light"></textarea>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary">Add Comment</button>
      </div>
    </form>
    <CommentCard v-for="c in comments" :key="c._id" :comment="c" />
    <!-- :comment="c" is necessary to pass to props -->
  </div>
</template>

<!-- Owners can delete Event -->

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { watchEffect } from 'vue'
import Pop from '../utils/Pop'
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsService"
import { commentsService } from "../services/CommentsService"
import { AppState } from '../AppState'
import CommentCard from '../components/CommentCard.vue'
export default {
    name: "EventPage",
    setup() {
        const route = useRoute();
        watchEffect(async () => {
            try {
                if (route.name == "Event") {
                    // get event details
                    await eventsService.getById(route.params.id);
                    await ticketsService.getByEventId(route.params.id);
                    await commentsService.getEventComments(route.params.id);
                }
            }
            catch (error) {
                Pop.error(error);
            }
        });
        return {
            event: computed(() => AppState.currentEvent),
            tickets: computed(() => AppState.currentEventTickets),
            myTicket: computed(() => AppState.currentEventTickets.find((t) => t.accountId == AppState.account._id)),
            // Componentize the comments Creator
            comments: computed(() => AppState.currentEventComments),
            commentBody: "",

            // Put this inside of a computed instead for reactivity:
            // get isEnabled() {
            //   return 'meow'
            // }

            async createComment() {
              // Prevent submitting empty comments
              if (this.commentBody) {
                try {
                  const myComment = {
                    // creatorId: AppState.account._id,
                        eventId: route.params.id,
                        body: this.commentBody
                    };
                    this.commentBody = ""
                    await commentsService.createComment(myComment);
                }
                catch (error) {
                  Pop.error(error);
                }
              }
            }
        };
    },
    components: { CommentCard }
}
</script>

<style lang="scss" scoped>
:root {
  --event-splash-height: 50vh;
}

.event-page {
  margin: var(--page-margins);

}

// .event-splash {
//   width: 100%;
//   height: var(--event-splash-height);
//   background-color: var(--color-1);
//   color: var(--color-2);
//   position: relative;
//   margin-bottom: var(--page-margins);
// }

// .img-under {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// .over-img {
//   position: relative;
//   height: 100%;
//   width: 100%;
//   display: flex;

//   // margin: var(--page-margins);
// }

// .blur-panel {
//   color: var(--color-2);
//   text-shadow: 0px 0px 4px #000000d0;
//   font-size: 1.4em;
//   background-color: #00000060;
//   backdrop-filter: blur(8px);
//   -webkit-backdrop-filter: blur(8px);
//   align-self: flex-end;
//   width: 100%;
//   margin: 0px;
//   // padding-left: 0.4em;
//   padding-right: var(--page-margins);
//   padding-left: var(--page-margins);
//   padding-top: calc(2 * var(--page-margins));
//   padding-bottom: calc(2 * var(--page-margins));
// }

// .event-splash-img {
//   width: calc(var(--event-splash-height) - (4 * var(--page-margins)));
//   // margin-left: var(--page-margins);
//   margin-right: var(--page-margins);
//   // margin-top: calc(2 * var(--page-margins));
//   // margin-bottom: calc(2 * var(--page-margins));
//     // this doesn't work, hard coding it is
//   // height: calc(var(--page-margins - (2 * var(--page-margins))));
//   height: 46vh;
// }

// .event-card-attr {
//   font-size: 0.8em;
//   color: var(--color-3);
//   // font-weight: lighter;
// }

// .component-title {
//   font-size: 36px;
//   font-weight: 500;
//   font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
// }

// .text-right {
//   text-align: end;
//   font-weight: lighter;
// }

// .bold-text {
//   font-weight: bold;
//   text-shadow: 0px 0px 4px #000000d0;
// }

.thin-text {
  font-weight: lighter;
  font-size: 20px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-shadow: 0px 0px 6px #000000;
  color: #ffffff;
  ;
}

// .small-text {
//   font-size: 16px;
// }

.attendance-bar {
  min-height: 64px;
  width: 100%;
  background-color: var(--color-1);
  padding-left: 8px;
  padding-top: 8px;
  margin-bottom: var(--page-margins);
}

.profile-bubble {
  height: 48px;
  width: 48px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 8px;
}

.add-comment-bar {
  background-color: var(--color-1);
  width: 100%;
  height: 30vh;
  padding: var(--page-margins);
  display: flex;
  flex-direction: column;
  margin-bottom: calc(2 * var(--page-margins));
}

.add-comment-bar textarea {
  border: 0px;
  resize: none;
  width: 100%;
  height: 100%;
  margin-bottom: var(--page-margins);
}

.btn {
  border-radius: 0px;
}
</style>