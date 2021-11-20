import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newComment = await commentsService.create(req.body)
      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const commentId = req.params.id
      const userId = req.userInfo.id
      await commentsService.remove(commentId, userId)
      return res.send('Comment Deleted')
    } catch (error) {
      next(error)
    }
  }
}
