
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {


  async getAll() {
    const res = await api.get('api/events')
    // logger.log('getAll(events): ' + res.data)
    AppState.events = res.data
  }

  async getById(id) {
    const res = await api.get('api/events/' + id)
    // logger.log(res.data)
    AppState.currentEvent = res.data
  }
}

export const eventsService = new EventsService()