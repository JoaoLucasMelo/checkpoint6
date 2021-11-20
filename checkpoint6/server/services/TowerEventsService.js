import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TowerEventsService {
  async getAll(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query)
      .populate('creator')
    return towerEvents
  }

  async getById(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id)
      .populate('creator')
    if (!towerEvent) {
      throw new BadRequest('Invalid Id')
    }
    return towerEvent
  }

  async create(data) {
    const towerEvent = await dbContext.TowerEvents.create(data)
    await towerEvent.populate('creator')
    return towerEvent
  }

  async update(id, data) {
    const towerEvent = await this.getById(id)
    if (towerEvent.creatorId.toString() !== data.creatorId || towerEvent.isCanceled === true) {
      throw new Forbidden('Cannot edit this event!')
    }
    const update = await dbContext.TowerEvents.findByIdAndUpdate(id, data, { new: true })
    return update
  }

  async capacity(id) {
    const update = await dbContext.TowerEvents.findById(id)
    update.capacity--
    const updated = await dbContext.TowerEvents.findByIdAndUpdate(id, update, { new: true })
    return updated
  }
}
export const towerEventsService = new TowerEventsService()
