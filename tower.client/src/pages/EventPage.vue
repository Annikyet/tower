<template>
  <div class="event-page">
    <!-- <h1>This is the event page</h1>
    <h2>ID: {{ eventId }}</h2> -->
    <div class="event-splash">
      <img :src="event.coverImg" alt="" class="img-under">
      <div class="over-img blur-panel d-flex">
        <img :src="event.coverImg" alt="" class="event-splash-img">
        <div class="d-flex flex-column justify-content-between">

          <div class="d-flex flex-column">
          <div class="d-flex justify-content-between w-100">

              <div class="d-flex flex-column">
                <h4 class="component-title">{{event.name}}</h4>
              <h5 class="event-card-attr">{{event.location}}</h5>

            </div>
            <div class="d-flex flex-column">
              <!-- need a method to prettify this -->
              <h5 class="event-card-attr">{{event.startDate}}</h5>
              <h5 class="event-card-attr">{{event.startDate}}</h5>

            </div>
          </div>
          <p class="thin-text small-text">{{event.description}}</p>
            </div>
          <div class="d-flex justify-content-between">
            
            <h5 class="text-right"><span class="bold-text" :style="event.capacity <= 0 ? 'color: #801010;' : ''">{{event.capacity}}</span><span class="thin-text"> tickets
              left.</span></h5>
            <button v-show="!myTicket && event.capacity > 0" class="btn btn-primary" @click="createTicket">Reserve Ticket</button>
            <button v-show="myTicket" class="btn btn-secondary" @click="removeTicket">Relinquish Ticket</button>
            <button v-show="!myTicket && event.capacity <= 0" class="btn btn-danger">Sold Out</button>
          </div>
        </div>
      </div>
    </div>
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
    <p v-for="c in comments" :key="c._id">{{c}}</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { watchEffect } from 'vue'
import Pop from '../utils/Pop'
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsService"
import { commentsService } from "../services/CommentsService"
import { AppState } from '../AppState'
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
            comments: computed(() => AppState.currentEventComments.find((c) => c.eventId == route.params.id)),
            commentBody: "",
            async createTicket() {
                try {
                    await ticketsService.createTicket(route.params.id);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async removeTicket() {
                try {
                    await ticketsService.removeTicket(this.myTicket);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async createComment() {
                try {
                    const myComment = {
                        // creatorId: AppState.account._id,
                        eventId: route.params.id,
                        body: this.commentBody
                    };
                    await commentsService.createComment(myComment);
                }
                catch (error) {
                    Pop.error(error);
                }
            }
        };
    }
}
</script>

<style lang="scss" scoped>
:root {
  --event-splash-height: 50vh;
}

.event-page {
  margin: var(--page-margins);

}

.event-splash {
  width: 100%;
  height: var(--event-splash-height);
  background-color: var(--color-1);
  color: var(--color-2);
  position: relative;
  margin-bottom: var(--page-margins);
}

.img-under {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.over-img {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;

  // margin: var(--page-margins);
}

.blur-panel {
  color: var(--color-2);
  text-shadow: 0px 0px 4px #000000d0;
  font-size: 1.4em;
  background-color: #00000060;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  align-self: flex-end;
  width: 100%;
  margin: 0px;
  // padding-left: 0.4em;
  padding-right: var(--page-margins);
  padding-left: var(--page-margins);
  padding-top: calc(2 * var(--page-margins));
  padding-bottom: calc(2 * var(--page-margins));
}

.event-splash-img {
  width: calc(var(--event-splash-height) - (4 * var(--page-margins)));
  // margin-left: var(--page-margins);
  margin-right: var(--page-margins);
  // margin-top: calc(2 * var(--page-margins));
  // margin-bottom: calc(2 * var(--page-margins));
    // this doesn't work, hard coding it is
  // height: calc(var(--page-margins - (2 * var(--page-margins))));
  height: 46vh;
}

.event-card-attr {
  font-size: 0.8em;
  color: var(--color-3);
  // font-weight: lighter;
}

.component-title {
  font-size: 36px;
  font-weight: 500;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.text-right {
  text-align: end;
  font-weight: lighter;
}

.bold-text {
  font-weight: bold;
  text-shadow: 0px 0px 4px #000000d0;
}

.thin-text {
  font-weight: lighter;
  font-size: 20px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-shadow: 0px 0px 6px #000000;
  color: #ffffff;
  ;
}

.small-text {
  font-size: 16px;
}

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
  margin-bottom: var(--page-margins);
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