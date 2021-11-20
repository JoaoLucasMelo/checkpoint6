import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class CommentsService {
  async create(data) {
    const newComment = await dbContext.Comment.create(data)
    await newComment.populate('creator')
    await newComment.populate('event')
    return newComment
  }

  async getComments(query = {}) {
    const comments = await dbContext.Comment.find(query).populate('creator').populate('event')
    return comments
  }

  async remove(id, userId) {
    const found = await dbContext.Comment.findById(id)
    if (found.creatorId.toString() !== userId) {
      throw new Forbidden('Not your Comment')
    }
    await dbContext.Comment.findByIdAndDelete(id)
  }
}
export const commentsService = new CommentsService()
