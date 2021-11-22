import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { commentsService } from "./CommentsService"
import { eventsService } from "./EventsService"



class AttendeesService{
async getActiveAttendees(id){
  const res = await api.get('api/events/'+id+'/attendees')
  logger.log('ATTENDING TO THIS EVENT',res.data)
  let active = AppState.activeAttending
  active = res.data
  AppState.activeAttending = active

  await this.findActiveAttending(id)
}
async getMyAttending(){
  const res = await api.get('account/attendees')
  logger.log('ATTENDING',res.data)
  let attending = AppState.attending
  attending = res.data
  AppState.attending = attending
}
async attend(id){
  const res = await api.post('api/attendees', {eventId: id})
  logger.log('ATTENDING', res.data)
  // let newattend = res.data
  // AppState.activeAttending = newattend
  // AppState.activeEvent = newattend.event
  eventsService.getActive(id)
  this.getActiveAttendees(id)
}
async notattend(id){
  const actual = AppState.myActiveAttend
  const res = await api.delete('api/attendees/'+ actual.id)
  logger.log('NOT ATTENDING', res.data)
  let notattend = res.data
  // AppState.activeEvent = notattend.event
  eventsService.getActive(id)
  await this.getActiveAttendees(id)
  await this.getMyAttending()
  await this.findActiveAttending(notattend.event)
}
async findActiveAttending(eventId){
  let active = AppState.attending.find(a => a.eventId === eventId)
  AppState.myActiveAttend = active
  logger.log('MY ATTENDING THIS EVENT',active)
}
}
export const attendeesService = new AttendeesService()