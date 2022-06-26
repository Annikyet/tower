<template>
  <div class="ticket-card">
    <img :src="ticket.event.coverImg" :alt="ticket.event.name" class="ticket-img">
    <div class="ticket-pane">
      <h4>{{ ticket.event.name }}</h4>
      <h5>{{ ticket.event.location }}</h5>
      <h5>{{ prettyTime.dateString }} at {{ prettyTime.timeString(24) }}</h5>
      <div class="d-flex justify-content-end">
        <button class="btn btn-danger" @click="removeTicket">Relinquish Ticket</button>
      </div>
    </div>

  </div>
</template>


<script>
import { PrettyDate } from '../utils/PrettyDate'
import { computed } from 'vue'
import Pop from '../utils/Pop'
import { ticketsService } from '../services/TicketsService'
import { accountService } from '../services/AccountService'
export default {
  props: { ticket: { type: Object, required: true } },
  setup(props) {
    return {
      prettyTime: computed(() => new PrettyDate(props.ticket.event.startDate)),
      isBusy: false,
      async removeTicket() {
        if (!this.isBusy) {
          this.isBusy = true
          try {
            await ticketsService.removeTicket(props.ticket)
            await accountService.getAccountTickets()
            this.isBusy = false
          } catch (error) {
            Pop.error(error)
          }
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.ticket-card {
  width: calc(100vw - (2 * var(--page-margins)));
  height: 20vh;
  display: flex;
  margin-bottom: var(--page-margins);
  background-color: var(--color-1);
}

.ticket-img {
  height: 100%;
  width: 40%;
  object-fit: cover;
}

.ticket-pane {
  width: 60%;
  padding: var(--page-margins);
  color: var(--color-2);
}
</style>