import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import { commentsService } from '../services/CommentsService'
import { towerEventsService } from '../services/TowerEventsService'
import BaseController from '../utils/BaseController'

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getComments)
      .get('/:id/attendees', this.getEventsByAttendee)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.cancelEvent)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const towerEvents = await towerEventsService.getAll(query)
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getEventsByAttendee(req, res, next) {
    try {
      const events = await attendeesService.getEventsByAtendee({ eventId: req.params.id })
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      delete req.body.isCanceled
      const towerEvent = await towerEventsService.update(req.params.id, req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const eventTowerId = req.params.id
      const creatorId = req.userInfo.id
      const deletedEvent = await towerEventsService.update(eventTowerId, { creatorId: creatorId, isCanceled: true })
      return res.send(deletedEvent)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments({ eventId: req.params.id })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}
