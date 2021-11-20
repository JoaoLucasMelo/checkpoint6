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
async getCreatedEvents(userId){
  const res = await api.get('api/events/')
  let allevents = res.data
  let newarray = allevents.filter( e => e.creatorId === userId)
  logger.log('TESTING', newarray)
  AppState.towerEvents = newarray
}
}
export const eventsService = new EventsService()