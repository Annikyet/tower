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

  async deleteComment(commentId, creatorId) {
    const oldComment = await dbContext.Comment.findById(commentId)
    // return creatorId + ' == ' + oldComment.creatorId
    // Cannot access properties of async object until AFTER it's aliased.
    if (creatorId == oldComment.creatorId) {
      let comment = await dbContext.Comment.findByIdAndRemove(commentId)
      return comment
    } else {
      throw new BadRequest('Das Nacho Comment!')
    }

  }
}

export const commentsService = new CommentsService()