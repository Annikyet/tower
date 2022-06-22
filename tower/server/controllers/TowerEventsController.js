s (88 sloc)  2.46 KB

import { towerEventsService } from "../services/TowerEventsService"
// import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from "../utils/BaseController"





export class TowerEventsController extends BaseController {
  constructor() {
    super('api/towerevents')
    this.router
      // .gets
      // .use
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      const towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
}