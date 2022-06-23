import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('/api/comments')
    this.router
      // .get('', this.getAll) - nope, goes in events
      .use(Auth0Provider.getAuthorizedUserInfo)
      // create
      .post('', this.createComment)
      // delete
      .delete('/:id', this.deleteComment)
  }

  // async getAll(req, res, next) {
  //   try {
  //     return res.send('meow')
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}