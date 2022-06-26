
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { useRouter } from "vue-router"


class EventsService {


  async getAll() {
    const res = await api.get('api/events')
    // logger.log('getAll(events): ' + res.data)
    AppState.events = res.data
  }

  async filterEvents(filter) {
    if (filter == '') {
      await this.getAll()
    } else {
      const res = await api.get('api/events')
      AppState.events = res.data.filter((e) => e.type == filter)
    }
  }

  async getById(id) {
    const res = await api.get('api/events/' + id)
    // logger.log(res.data)
    AppState.currentEvent = res.data
  }

  async createEvent(event) {
    // const router = useRouter()
    // logger.log(event)
    event.startDate = new Date(event.startDate + 'T' + event.startTime + ':00.000Z') - (new Date().getTimezoneOffset() * 60000)
    // event.startTime = undefined
    // logger.log(event.startDate)
    const res = await api.post('api/events', event)
    // logger.log(res.data)
    // maybe put this in the component
    // router.push({name: 'Event', params: {id: res.data._id}})
    return res.data._id
    
  }
  
  async cancelEvent(eventId) {
    const res = await api.delete('api/events/' + eventId)
    // logger.log(res.data)
    AppState.currentEvent = res.data
  }

  // const router = useRouter()
  // return {
  //   prettyTime: computed(() => new PrettyDate(props.event.startDate)),
  //   gotoEventPage() {
  //     router.push({name: 'Event', params: {id: props.event._id}})
  //   }
}

export const eventsService = new EventsService()