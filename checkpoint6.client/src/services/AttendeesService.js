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
}
export const attendeesService = new AttendeesService()