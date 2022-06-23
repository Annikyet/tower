import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


// Mobs code
// async create(body) {
//   let project = await dbContext.Projects.create(body)
//   await project.populate('creator', 'name picture')
//   return project
// }


class TowerEventsService {

  async getAll() {
    let towerEvent = await dbContext.TowerEvents.find()
    return towerEvent
  }

  async getById(id) {
    let towerEvent = await dbContext.TowerEvents.findById(id)
    return towerEvent
  }

  async updateById(id, update) {
    let original = await dbContext.TowerEvents.findById(id)
    if (original.creatorId.toString() != update.creatorId) {
      throw new BadRequest('Das Nacho Event!')
    }

    // Need to make sure you can't edit if isCanceled == true
    if (original.isCanceled === true) {
      throw new BadRequest("Can't edit a cancelled event.")
    }

    original.name = update.name || original.name
    original.description = update.description || original.description
    original.coverImg = update.coverImg || original.coverImg
    original.location = update.location || original.location
    original.capacity = update.capacity || original.capacity
    original.startDate = update.startDate || original.startDate
    original.type = update.type || original.type
    original.save()
    return original
  }

  async create(body) {
    let towerEvent = await dbContext.TowerEvents.create(body)
    // populate creator here
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()