import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const TowerEventSchema = new Schema({
  creatorId: {type: ObjectId, required: true, ref: 'Account' },    // where is Account reeferencing? Another 'table'?
  name: {type: String, required: true},
  description: {type: String, required: true},
  coverImg: {type: String, required: true},
  location: {type: String, required: true},
  capacity: {type: Number, required: true},
  startDate: {type: Date, required: true},
  isCancelled: {type: Boolean, required: true},
  // type, enum string
  type: {type: String, enum: ['concert', 'convention', 'sport', 'digital']}
  // virtuals: timestamps: true autogens timestamps, and virtuals: true allows use of virtuals - not creates a specific virtual
  }, { timestamps: true, toJSON: { virtuals: true } })