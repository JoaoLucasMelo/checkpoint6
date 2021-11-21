<template>
  <div class="homeheight container-fluid scrollbar">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/Logo.png" width="250" class="m-3" alt="" />
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11 image bg-primary my-2">
        <h1 class="text-light">SOMETHING HERE</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11 sort my-2 bg-primary"></div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 pe-5 ps-5">
        <div class="d-flex flex-wrap">
          <div class="col-md-3" v-for="e in towerEvents" :key="e.id">
            <Event :towerEvents="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    watchEffect(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      towerEvents: computed(() => AppState.towerEvents),
    }
  }
}
</script>

<style scoped lang="scss">
.blurycards {
  height: 40%;
}
.cardshome {
  height: 33vh;
  border-width: 6px !important;
  border-color: #474c61 !important;
  background: v-bind(coverImg);
}
.homeheight {
  height: 100vh;
}
.image {
  height: 25vh;
}
.sort {
  height: 7vh;
}

.scrollbar {
  overflow-y: scroll;
}
.scrollbar::-webkit-scrollbar {
  width: 7px;
}

.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2e;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 10px;
}
</style>
