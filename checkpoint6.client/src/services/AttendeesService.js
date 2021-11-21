import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"



class AttendeesService{
async getActiveAttendees(id){
  const res = await api.get('api/events/'+id+'/attendees')
  logger.log('ATTENDING TO THIS EVENT',res.data)
  let active = AppState.activeAttending
  active = res.data
  AppState.activeAttending = active
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
  let newattend = res.data
  AppState.activeEvent = newattend.event
  eventsService.getActive(id)
  this.getActiveAttendees(id)
}
async notattend(id){
  const res = await api.delete('api/attendees/'+ id)
  logger.log('NOT ATTENDING', res.data)
  let notattend = res.data
  AppState.activeEvent = notattend.event
  eventsService.getActive(id)
  this.getActiveAttendees(id)
}
}
export const attendeesService = new AttendeesService()