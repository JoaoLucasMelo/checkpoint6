import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const AttendeeSchema = new Schema({

  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
  accountId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

AttendeeSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
AttendeeSchema.virtual('event', {
  localField: 'eventId',
  ref: 'TowerEvent',
  foreignField: '_id',
  justOne: true
})
