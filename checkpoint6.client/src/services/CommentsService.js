import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentsService{
async getComments(id){
  const res = await api.get('api/events/'+id+'/comments')
  logger.log('GET COMMENTS',res.data)
  let eventComments = AppState.comments
  eventComments = res.data
  AppState.comments = eventComments
}
async create(commentdata){
  const res = await api.post('api/comments',commentdata)
  logger.log('COMMENT CREATE',res.data)
  let newcomment = AppState.comments
  newcomment.unshift(res.data)
  AppState.comments = newcomment
}
async remove(id){
  const res = await api.delete('/api/comments/'+ id)
  logger.log('DELETE COMMENT', res.data)
  let deleted = res.data
 let newcomments = AppState.comments.filter( c => c.id !== deleted.id)
 AppState.comments = newcomments
}
}
export const commentsService = new CommentsService()