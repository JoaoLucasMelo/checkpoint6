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
  let commentjustnow = res.data
  let newcomment = AppState.comments
  newcomment.unshift(commentjustnow)
  AppState.comments = newcomment
  // logger.log(commentjustnow)
  // if( AppState.myActiveAttend.accountId === commentjustnow.creatorId){
  //  await this.attend(commentjustnow.id)
  // }
}
async remove(id){
  const res = await api.delete('/api/comments/'+ id)
  logger.log('DELETE COMMENT', res.data)
  let deleted = res.data
 let newcomments = AppState.comments.filter( c => c.id !== deleted.id)
 AppState.comments = newcomments
}
async attend(id){
  const res = await api.put('api/comments/'+ id, true )
  logger.log('ATTEND ON COMMENT', res.data)
}
async notattend(id){
  const res = await api.put('api/comments/'+ id, false )
  logger.log('NOT ATTEND ON COMMENT', res.data)
}
}
export const commentsService = new CommentsService()