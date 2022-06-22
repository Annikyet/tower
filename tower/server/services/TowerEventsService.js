import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


// Mobs code
// async create(body) {
//   let project = await dbContext.Projects.create(body)
//   await project.populate('creator', 'name picture')
//   return project
// }


class TowerEventsService {
  async create(body) {
    let towerEvent = await dbContext.TowerEvents.create(body)
    // populate creator here
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()