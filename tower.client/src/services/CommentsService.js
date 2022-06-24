
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"


class CommentsService {
  async createComment(comment) {
    const res = await api.post('api/comments', comment)
    // logger.log(res.data)
    // reload comments
  }
  
  // .get('/:id/comments', this.getEventComments)
  async getEventComments(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    // logger.log(res.data)
    AppState.currentEventComments = res.data
  }
}

export const commentsService = new CommentsService()