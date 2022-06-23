import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {
  async getEventComments(eventId) {
    let comments = await dbContext.Comment.find({eventId: eventId}).populate('creator')
    return comments
  }

  async createComment(body) {
    let comment = await dbContext.Comment.create(body)
    await comment.populate('creator')
    return comment
  }
}

export const commentsService = new CommentsService()