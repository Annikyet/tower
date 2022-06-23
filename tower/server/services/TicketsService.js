import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"


class TicketsService {

  // async getAll() {
  //   let towerEvent = await dbContext.TowerEvents.find()
  //   return towerEvent
  // }

  async getAllByAccountId(id) {
    let tickets = await dbContext.Ticket.find({accountId: id}).populate('event')
    // populate or somth
    // await tickets.populate("eventId")
    return tickets
  }

  async getEventTickets(id) {
    let tickets = await dbContext.Ticket.find({eventId: id}).populate('account')
    return tickets
  }

  // async updateById(id, update) {
  //   let original = await dbContext.TowerEvents.findById(id)
  //   if (original.creatorId.toString() != update.creatorId) {
  //     throw new BadRequest('Das Nacho Event!')
  //   }

  //   // Need to make sure you can't edit if isCanceled == true
  //   if (original.isCanceled === true) {
  //     throw new BadRequest("Can't edit a cancelled event.")
  //   }

  //   original.name = update.name || original.name
  //   original.description = update.description || original.description
  //   original.coverImg = update.coverImg || original.coverImg
  //   original.location = update.location || original.location
  //   original.capacity = update.capacity || original.capacity
  //   original.startDate = update.startDate || original.startDate
  //   original.type = update.type || original.type
  //   original.save()
  //   return original
  // }

  async create(body) {
    await towerEventsService.decrementCapacityById(body.eventId)
    let ticket = await dbContext.Ticket.create(body)
    return ticket.populate('account')
  }

  async delete(ticketId, accountId) {
    let original = await dbContext.Ticket.findById(ticketId)
    if (original.accountId.toString() == accountId) {
      const ticket = await dbContext.Ticket.findByIdAndRemove(ticketId)
      towerEventsService.incrementCapacityById(original.eventId)
      return ticket
    } else {
      throw new BadRequest('Das Nacho Ticket!')
    }
  }

//   async cancel(id, update) {
//     let original = await dbContext.TowerEvents.findById(id)
//     if (original.creatorId.toString() != update.creatorId) {
//       throw new BadRequest('Das Nacho Event!')
//     }

//     // Need to make sure you can't double-cancel
//     if (original.isCanceled === true) {
//       throw new BadRequest("Can't cancel an already canceled event.")
//     }
    
//     original.isCanceled = update.isCanceled
//     original.save()
//     return original
//   }
}

export const ticketsService = new TicketsService()