import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CommentSchema = new Schema({

  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  body: { type: String, required: true },
  isAttending: { type: Boolean, default: false, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
CommentSchema.virtual('event', {
  localField: 'eventId',
  ref: 'TowerEvent',
  foreignField: '_id',
  justOne: true
})
