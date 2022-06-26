<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 d-flex justify-content-between">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
    <div>
      <h1>
        <i class="mdi mdi-radio-tower"></i>
        Tower
      </h1>
    </div>
    </router-link>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText"> -->
      <!-- <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'Event' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Event
          </router-link>
        </li>
      </ul> -->
      <!-- LOGIN COMPONENT HERE -->
      <div class="d-flex">
        <!-- Put Modal to create new event here -->
        <!-- Button trigger modal -->
        <!-- IDK I can get this working later... MVP, right? -->
        <!-- <button v-show="account._id" class="btn btn-primary" @click="showCreateEvent = !showCreateEvent">Create Event</button> -->
        <Login />
      </div>
    <!-- </div> -->
  </nav>
  <CreateEvent v-show="showCreateEvent" />
</template>

<!-- Events can be created from navbar from any page, as long as logged in -->
<!-- Use a modal for creation of event, use Vue gregslist as reference -->

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      showCreateEvent: false
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.btn {
  height: 40px;
  align-self: center;
  margin-right: 16px;
}
</style>
