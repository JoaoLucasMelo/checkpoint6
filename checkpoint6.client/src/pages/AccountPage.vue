<template>
  <div class="account container-fluid scrollbar">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/Logo.png" width="250" class="m-3" alt="" />
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div>
          <p class="fontcolor m-0">My Created Events</p>
        </div>
        <div class="d-flex flex-wrap">
          <div class="col-md-3" v-for="e in attending" :key="e.id">
            <Event :towerEvents="e.event" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div>
          <p class="fontcolor m-0">My Events</p>
        </div>
        <div class="d-flex flex-wrap">
          <div class="col-md-3" v-for="e in attending" :key="e.id">
            <Event :towerEvents="e.event" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { attendeesService } from "../services/AttendeesService"
import { eventsService } from "../services/EventsService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await attendeesService.getMyAttending()
      } catch (error) {
        logger.error
        Pop.toast(error.message, 'error')
      }
    })
    onMounted(async () => {
      try {
        await eventsService.getCreatedEvents(account)
      } catch (error) {
        logger.error
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      attending: computed(() => AppState.attending)
    }
  }
}
</script>

<style scoped>
.fontcolor {
  color: #a0a2ad;
}
.scrollbar {
  overflow-y: scroll;
}
.scrollbar::-webkit-scrollbar {
  width: 8px;
}

.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2e;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 10px;
}
</style>
