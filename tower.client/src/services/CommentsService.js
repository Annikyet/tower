
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"


class CommentsService {
  async createComment(comment) {
    const res = await api.post('api/comments', comment)
    AppState.currentEventComments.push(res.data)
    // logger.log(res.data)
    // reload comments
  }
  
  // .get('/:id/comments', this.getEventComments)
  async getEventComments(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    // logger.log(res.data)
    AppState.currentEventComments = res.data
  }

  async removeComment(commentId) {
    const res = await api.delete('api/comments/' + commentId)
    logger.log(res.data)
  }
}

export const commentsService = new CommentsService()