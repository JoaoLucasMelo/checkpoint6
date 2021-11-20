<template>
  <div class="container-fluid scrollbar">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/Logo.png" width="250" class="m-3" alt="" />
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11 d-flex image bg-primary my-2 rounded">
        <div class="row">
          <div
            class="col-md-4 justify-content-center d-flex align-items-center"
          >
            <img height="350" width="370" :src="activeEvent.coverImg" alt="" />
          </div>
          <div class="col-md-8 p-2">
            <div class="text-end">butao</div>
            <div class="d-flex justify-content-between">
              <div>
                <p>{{ activeEvent.name }}</p>
                <p>{{ activeEvent.location }}</p>
              </div>
              <div>
                <p>{{ activeEvent.startDate }}</p>
              </div>
            </div>
            <div>
              <p>{{ activeEvent.description }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <p>{{ activeEvent.capacity }}</p>
              </div>
              <div>ATTEND</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-11">
        <p class="m-0 p-1 fontcolor">See who is attending</p>
        <div class="card profiles"></div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await eventsService.getActive(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      route,
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
.image {
  background-color: #474c61 !important;
  height: 55vh;
}
.profiles {
  height: 10vh;
  background-color: #474c61 !important;
}
.fontcolor {
  color: #a0a2ad;
}
</style>