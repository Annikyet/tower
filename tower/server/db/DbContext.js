import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TicketSchema } from '../models/Ticket';
import { TowerEventSchema } from '../models/TowerEvent';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvents = mongoose.model('TowerEvents', TowerEventSchema)
  Ticket = mongoose.model('Ticket', TicketSchema)
  // 'Ticket' is declaring the name of this MongoDb pile
}

export const dbContext = new DbContext()
