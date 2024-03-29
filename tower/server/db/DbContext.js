import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment';
import { TicketSchema } from '../models/Ticket';
import { TowerEventSchema } from '../models/TowerEvent';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvents = mongoose.model('TowerEvents', TowerEventSchema)
  Ticket = mongoose.model('Ticket', TicketSchema)
  // 'Ticket' is declaring the name of this MongoDb pile
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
