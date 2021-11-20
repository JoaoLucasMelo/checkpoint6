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
async create(eventId, commentdata){
  const res = await api.post('api/comments',{eventId: eventId,body: commentdata})
  logger.log('COMMENT CREATE',res.data)
}
}
export const commentsService = new CommentsService()