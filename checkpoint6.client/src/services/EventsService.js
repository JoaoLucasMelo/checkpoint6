import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class EventsService{
async getAll(){
const res = await api.get('api/events')
logger.log(res.data)
let towerEvents = AppState.towerEvents
towerEvents = res.data
AppState.towerEvents = towerEvents
}
async getActive(id){
  const res = await api.get('api/events/'+id)
  logger.log('ACTIVE EVENT',res.data)
  let active = AppState.activeEvent
  active = res.data
  AppState.activeEvent = active
}
getCreatedEvents(user){
  let myevents = AppState.towerEvents.filter(e => e.creatorId === user.id)
  AppState.towerEvents = myevents
}
}
export const eventsService = new EventsService()