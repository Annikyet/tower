<template>
  <div class="splash-banner">
    <a
      href="https://unsplash.com/photos/SQxcZIIZHV8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">
      <img src="../assets/img/splash.jpeg" alt="Tower" class="img-under">
    </a>
    <!-- put over-img text here -->
    <p class="text-over-img">
    <ul>
      <li>mewo meow meow</li>
      <li>mewo meow meow</li>
      <li>mewo meow meow</li>
    </ul>
    </p>
  </div>
  <FilterBar />
  <div class="event-grid">
    <div v-for="e in events" :key="e.id">
      <EventCard :event="e" />
    </div>
  </div>
</template>

<!-- Events can be sorted by type -->

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { eventsService } from '../services/EventsService'

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        // call the events service
        await eventsService.getAll()
      } catch (error) {
        Pop.error(error)
      }
    })
    return {
      events: computed(() => AppState.events)
    };
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.splash-banner {
  // background-color: darkred;
  // color: white;
  margin: var(--page-margins);
  height: 30vh;
  width: calc(100vw - (2 * var(--page-margins)));
  // object-fit: cover;
  position: relative;
}

// text over img styling
.img-under {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-over-img {
  position: relative;
  color: var(--color-2);
  text-shadow: 0px 0px 4px #000000d0;
  font-size: 2em;
  // margin: var(--page-margins);
}

.event-grid {
  margin-left: var(--page-margins);
  display: flex;
  flex-wrap: wrap;
}
</style>
