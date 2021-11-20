import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeeController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attendee = await attendeesService.create(req.body)
      return res.send(attendee)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}
