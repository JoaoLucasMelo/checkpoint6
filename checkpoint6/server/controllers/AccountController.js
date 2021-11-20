import { Auth0Provider } from '@bcwdev/auth0provider'
import { nextTick } from '@vue/runtime-core'
import { accountService } from '../services/AccountService'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/attendees', this.getAttending)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAttending(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const events = await attendeesService.getAttending({ accountId: accountId })
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
}
