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
          <p class="green f-16 m-0">My Created Events</p>
        </div>
        <div class="d-flex flex-wrap">
          <div class="col-md-3" v-for="e in towerEvents" :key="e.id">
            <Event :towerEvents="e" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div>
          <p class="green f-16 mt-3 m-0">Events I am Attending</p>
        </div>
        <div class="d-flex flex-wrap">
          <div class="col-12" v-if="attending.length > 0">
            <div class="" v-for="e in attending" :key="e.id">
              <Event :towerEvents="e.event" />
            </div>
          </div>
          <div v-else>
            <p class="fst-italic my-5 fontcolor">
              "Currently not attending to any events"
            </p>
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
import { AuthService } from "../services/AuthService"
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
        await eventsService.getCreatedEvents(AuthService.userInfo.id)
      } catch (error) {
        logger.error
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      attending: computed(() => AppState.attending),
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped>
.fontcolor {
  color: #a0a2ad;
}
.green {
  color: #72d8a2;
}
.scrollbar {
  overflow-y: scroll;
  height: 100vh;
}
.scrollbar::-webkit-scrollbar {
  width: 0px;
}

.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2e;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 10px;
}
.widmax {
  width: 100vh;
}
</style>
