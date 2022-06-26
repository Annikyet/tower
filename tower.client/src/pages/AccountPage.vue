<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  
  <div class="ticket-container">
    <h1>Tickets: {{tickets.length}}</h1>
    <div v-for="t in tickets" :key="t._id">
      <TicketCard :ticket="t"/>
    </div>
  </div>
</template>

<!-- Users can delete their ticket -->
<!-- Also display the tickets -->
<!-- Also display your events -->

<script>
import { computed } from 'vue'
import { watchEffect } from 'vue'
import { onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
import TicketCard from '../components/TicketCard.vue'
export default {
    name: "Account",
    setup() {
        const route = useRoute();
        onMounted(async () => {
            try {
                if (route.name == "Account") {
                    await accountService.getAccountTickets();
                }
            }
            catch (error) {
                Pop.error(error);
            }
        });
        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.accountTickets)
        };
    },
    components: { TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.ticket-container {
  display: flex;
  flex-direction: column;
  margin: var(--page-margins);
}
</style>
