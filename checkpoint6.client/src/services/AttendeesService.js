import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class AttendeesService{
async getActiveAttendees(id){
  const res = await api.get('api/events/'+id+'/attendees')
  logger.log('ATTENDING TO THIS EVENT',res.data)
  let active = AppState.activeAttending
  active = res.data
  AppState.activeAttending = active
}
async getMyAttending(){
  const res = await api('account/attendees')
  logger.log('ATTENDING',res.data)
  let attending = AppState.attending
  attending = res.data
  AppState.attending = attending
}
}
export const attendeesService = new AttendeesService()