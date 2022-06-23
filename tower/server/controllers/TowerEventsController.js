import { towerEventsService } from "../services/TowerEventsService"
import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from "../utils/BaseController"
import { ticketsService } from "../services/TicketsService"
import { commentsService } from "../services/CommentsService"





export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      // .gets
      .get('', this.getAll)
      .get('/:id', this.getById)
      // Shouldn't these link to their own controllers? But they're not instantiated...
      .get('/:id/tickets', this.getEventTickets)
      .get('/:id/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:id', this.updateById)
      .post('', this.create)
      .delete('/:id', this.cancel)
  }

  async getAll(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getAll()
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async updateById(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.updateById(req.params.id, req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      let update = {
        creatorId: req.userInfo.id,
        isCanceled: true
      }
      const towerEvent = await towerEventsService.cancel(req.params.id, update)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
}