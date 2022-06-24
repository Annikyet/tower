
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {


  async getByEventId(id) {
    const res = await api.get('api/events/' + id + '/tickets')
    // logger.log(res.data)
    AppState.currentEventTickets = res.data
  }
}

export const ticketsService = new TicketsService()