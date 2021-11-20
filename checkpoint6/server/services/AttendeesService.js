import { dbContext } from '../db/DbContext'
import { towerEventsService } from './TowerEventsService'

class AttendeesService {
  async getEventsByAtendee(query = {}) {
    const events = await dbContext.Attendee.find(query).populate('account').populate('event')
    return events
  }

  async getAttending(query) {
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
}
export const attendeesService = new AttendeesService()
