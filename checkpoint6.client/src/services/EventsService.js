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
async createEvent(data){
  const res = await api.post('api/events', data)
  logger.log('POST EVENT', res.data)
  let newpost = res.data
  AppState.towerEvents.unshift(newpost)
  AppState.activeEvent = newpost
}
async editEvent(data, id){
  const res = await api.put('api/events/'+id, data)
  logger.log('PUT EVENT', res.data)
  let edited = res.data
  AppState.activeEvent = edited
  let index = AppState.towerEvents.findIndex( t => t.id === edited.id)
  AppState.towerEvents.splice(index, 1, edited)
}
async cancel(id){
  const res = await api.delete('api/events/'+ id)
  logger.log('DELETE EVENT', res.data)
  let canceled = res.data
  AppState.activeEvent = canceled
}
async sortSports(){
  await this.getAll()
  let sports = AppState.towerEvents.filter(e => e.type === 'sport')
  logger.log('SPORTS', sports)
  AppState.towerEvents = sports
}
async sortDigital(){
  await this.getAll()
  let digital = AppState.towerEvents.filter(e => e.type === 'digital')
  logger.log('DIGITAL', digital)
  AppState.towerEvents = digital
}
async sortConc(){
  await this.getAll()
  let concerts = AppState.towerEvents.filter(e => e.type === 'concert')
  logger.log('CONCERTS', concerts)
  AppState.towerEvents = concerts
}
async sortConv(){
  await this.getAll()
  let conventions = AppState.towerEvents.filter(e => e.type === 'convention')
  logger.log('CONVENCIONS', conventions)
  AppState.towerEvents = conventions
}

}
export const eventsService = new EventsService()