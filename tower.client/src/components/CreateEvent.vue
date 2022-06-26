<template>
  <!-- Modal -->
  <!-- Maybe I need to use JS??? -->
  <!-- Screw it, no Modal -->
  <!-- <div class="modal fade" id="createEvent" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="createEventLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Create New Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"> -->
  <form action="" @submit.prevent="createEvent" class="d-flex flex-column">
    <input type="text" name="eventName" v-model="newEvent.name" placeholder="Event Name">
    <input type="text" name="eventLocation" v-model="newEvent.location" placeholder="Event Location">
    <div class="d-flex justify-content-between align-items-center">
      <!-- <p>Starting at:</p> -->
      <!-- <div class="d-flex"> -->
      <!-- <label for="startDate">Date: </label> -->
      <!-- </div> -->
      <!-- <div class="d-flex"> -->
      <!-- <label for="startTime">Time: </label> -->
      <input type="date" name="startDate" v-model="newEvent.startDate">
      <input type="time" name="startTime" v-model="newEvent.startTime">
      <input type="number" name="eventCapacity" v-model="newEvent.capacity" placeholder="Event Capacity" min="0">
      <select name="eventType" v-model="newEvent.type" placeholder="Event Type">
        <option value="" selected disabled>Event Type</option>
        <option value="concert">concert</option>
        <option value="convention">convention</option>
        <option value="sport">sport</option>
        <option value="digital">digital</option>
      </select>
      <!-- </div> -->
    </div>
    <input type="url" name="eventCoverImg" v-model="newEvent.coverImg" placeholder="Image URL">
    <textarea name="eventDescription" v-model="newEvent.description" placeholder="Event Description"></textarea>
    <div class="d-flex">
      <!-- <label required for="eventType">Event Type: </label> -->
    </div>
    <div class="modal-footer">
      <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
      <input type="submit" value="Create" class="btn btn-primary">
    </div>
  </form>
  <!-- </div>
      </div>
    </div>
  </div> -->
</template>


<script>
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { eventsService } from '../services/EventsService'
import { logger } from '../utils/Logger'
export default {
  setup() {
    const router = useRouter()
    return {
      newEvent: {
        name: "",
        location: "",
        startDate: "",
        startTime: "",
        capacity: "",
        type: "",
        imgUrl: "",
        description: ""
      },
      isBusy: false,
      // createEventModal: new Modal(document.getElementById('createEvent')),

      // Two really weird issues
      // The form stays populated after event creation
      // Subsequent event creation results in 400 error
      // The styling for events created through this form are permanently disfigured
      async createEvent() {
        // logger.log('create an event here')
        if (!this.isBusy) {
          this.isBusy = true
          // console.log('meow')
          // do thing
          // logger.log(this.newEvent.startTime)
          const newEventId = await eventsService.createEvent(this.newEvent)
          // this.createEventModal.hide()
          this.newEvent = {
            name: "",
            location: "",
            startDate: "",
            startTime: "",
            capacity: "",
            type: "",
            imgUrl: "",
            description: ""
          }
          this.isBusy = false
          router.push({ name: 'Event', params: { id: newEventId } })
        }
      }
      // createEvent method
      // then goto the page for that event
    }
  }
}
</script>


<style lang="scss" scoped>
</style>