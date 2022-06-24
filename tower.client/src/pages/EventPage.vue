<template>
  <div class="about">
    <h1>This is the event page</h1>
    <h2>ID: {{eventId}}</h2>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { watchEffect } from 'vue'
import Pop from '../utils/Pop'
export default {
  name: 'EventPage',
  setup() {
    const route = useRoute()
    // watchEffect(async () => {
    //   try {
    //     if (route.name == 'Event') {
    //       // get event details
    //     }
    //   } catch(error) {
    //     Pop.error(error)
    //   }
    // })
    return {
      eventId: computed(() => route.params.id)
    }
  }
}
</script>

<!-- in events page -->
  <!-- setup() {
    const route = useRoute()
    const filterTier = ref('')
    watchEffect(async () => {
      try {
        if (route.name == 'ProjectDetails') {
          // this is to re-run gets if you support a project
          AppState.supportedProjects.length
          await projectsService.getProject(route.params.id)
          await tiersService.getTiersByProject(route.params.id)
          await postsService.getPostsByProject(route.params.id)
          await supportsService.getSupportsByProject(route.params.id)
        } -->