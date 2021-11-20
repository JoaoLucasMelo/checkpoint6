import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class AttendeesService {
  async getEventsByAtendee(query = {}) {
    const events = await dbContext.Attendee.find(query).populate('account').populate('event')
    return events
  }

  async getAttending(query = {}) {
    const events = await dbContext.Attendee.find(query).populate('account').populate('event')
    return events
  }

  async create(data) {
    const attendee = await dbContext.Attendee.create(data)
    await attendee.populate('account')
    await attendee.populate('event')
    await towerEventsService.capacity(data.eventId)
    return attendee
  }

  async remove(id, userId) {
    const found = await dbContext.Attendee.findById(id)
    if (found.accountId.toString() !== userId) {
      throw new Forbidden('You dont have Permition for this')
    }
    await dbContext.Attendee.findByIdAndDelete(id)
    await towerEventsService.capacityDecrease(found.eventId)
  }
}

export const attendeesService = new AttendeesService()
