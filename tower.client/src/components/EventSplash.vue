<template>
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
              <h5 class="event-card-attr">{{prettyDate.dateString}}</h5>
              <h5 class="event-card-attr">At {{prettyDate.timeString(24)}}</h5>

            </div>
          </div>
          <p class="thin-text small-text">{{event.description}}</p>
        </div>
        <div class="d-flex justify-content-between">

          <h5 v-if="!event.isCanceled" class="text-right"><span class="bold-text"
              :style="event.capacity <= 0 ? 'color: #801010;' : ''">
              {{event.capacity}}</span><span class="thin-text"> tickets
              left.</span>
          </h5>
          <h5 v-if="event.isCanceled" class="text-right bold-text" style="color: #801010">Cancelled.</h5>
          <!-- disable for zero tickets and no logged in -->
          <!-- disable for isCancelled -->
          <!-- disable when awaiting server response -->
          <!-- Maybe the button should be it's own component, so much if logic... -->
          <!-- Or functionalize these if statements -->
          <button v-show="!event.isCanceled && !myTicket && event.capacity > 0" class="btn btn-primary"
            @click="createTicket">
            Reserve Ticket
          </button>
          <button v-show="!event.isCanceled && myTicket" class="btn btn-danger" @click="removeTicket">
            Relinquish Ticket
          </button>
          <button v-show="!event.isCanceled && !myTicket && event.capacity <= 0" class="btn bg-grey" disabled>Sold
            Out</button>
        </div>
      </div>
    </div>
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
import { PrettyDate } from '../utils/PrettyDate'
export default {
  props: {
    // event: {type: Object, required: true},
    
  },
  setup(props){
    return {
      event: computed(() => AppState.currentEvent),
      myTicket: computed(() => AppState.currentEventTickets.find((t) => t.accountId == AppState.account._id)),
      prettyDate: computed(() => new PrettyDate(AppState.currentEvent.startDate)),
      isTicketLoading: false,
      // immediately disable button while w,aitinf for server
      async createTicket() {
        if (!this.isTicketLoading) {
          try {
            this.isTicketLoading = true
            await ticketsService.createTicket(this.event._id);
            this.isTicketLoading = false
          }
          catch (error) {
            Pop.error('createTicket() ' + error);
          }
        }
      },
      async removeTicket() {
        if (!this.isTicketLoading) {
          try {
            this.isTicketLoading = true
            await ticketsService.removeTicket(this.myTicket);
            this.isTicketLoading = false
          }
          catch (error) {
            Pop.error('removeTicket() ' + error);
          }
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
// :root {
//   --event-splash-height: 50vh;
// }

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

.btn {
  border-radius: 0px;
}
</style>