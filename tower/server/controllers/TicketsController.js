import { ticketsService } from '../services/TicketsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from "../utils/BaseController"





export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      // .gets
      // .get('', this.getAll)
      // .get('accounts/tickets/', this.getAllByAccountId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .put('/:id', this.updateById)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  // async getAll(req, res, next) {
  //   try {
  //     const towerEvent = await towerEventsService.getAll()
  //     return res.send(towerEvent)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async getAllByAccountId(req, res, next) {
  //   try {
  //     const tickets = await ticketsService.getAllByAccountId(req.params.id)
  //     return res.send(tickets)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async updateById(req, res, next) {
  //   try {
  //     req.body.creatorId = req.userInfo.id
  //     const towerEvent = await towerEventsService.updateById(req.params.id, req.body)
  //     return res.send(towerEvent)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      let body = {
        accountId: req.userInfo.id,
        eventId: req.body.eventId
      }
      const ticket = await ticketsService.create(body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const ticket = await ticketsService.delete(req.params.id, req.userInfo.id)
      return res.send('meow')
    } catch (error) {
      next(error)
    }
  }

  // async cancel(req, res, next) {
  //   try {
  //     let update = {
  //       creatorId: req.userInfo.id,
  //       isCanceled: true
  //     }
  //     const towerEvent = await towerEventsService.cancel(req.params.id, update)
  //     return res.send(towerEvent)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}