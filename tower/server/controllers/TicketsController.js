import { ticketsService } from '../services/TicketsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from "../utils/BaseController"


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

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
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}