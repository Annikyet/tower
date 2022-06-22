import { towerEventsService } from "../services/TowerEventsService"
import { Auth0Provider } from '@bcwdev/auth0provider'
import { TowerEventSchema } from "../models/TowerEvent"
import BaseController from "../utils/BaseController"





export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      // .gets
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  // mobs code
  // async create(req, res, next) {
  //   try {
  //     req.body.creatorId = req.userInfo.id
  //     const project = await projectsService.create(req.body)
  //     return res.send(project)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
}