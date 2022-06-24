
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"


class TicketsService {


  async getByEventId(id) {
    const res = await api.get('api/events/' + id + '/tickets')
    // logger.log(res.data)
    AppState.currentEventTickets = res.data
  }

  async createTicket(eventId) {
    const ticket = {eventId: eventId}
    const res = await api.post('api/tickets', ticket)
    // logger.log(res.data)
    // AppState.currentEventTickets.push(res.data)
    // AppState.myTickets.push(res.data)
    await this.getByEventId(eventId)
    await eventsService.getById(eventId)
  }

  async removeTicket(ticket) {
    const eventId = ticket.eventId
    // logger.log(ticket)
    const res = await api.delete('api/tickets/' + ticket._id)
    // logger.log(res.data)
    await this.getByEventId(eventId)
    await eventsService.getById(eventId)
  }
}

export const ticketsService = new TicketsService()