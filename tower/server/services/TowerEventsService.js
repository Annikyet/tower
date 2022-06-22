import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"





class TowerEventsService {
  async create(body) {
    let towerEvent = await dbContext.TowerEvents.create(body)
    // populate creator here
  }
}

export const towerEventsService = new TowerEventsService()