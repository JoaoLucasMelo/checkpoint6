<template>
  <div class="container-fluid homeheight scrollbar">
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
            <img
              class="m-3 my-4"
              height="350"
              width="370"
              :src="activeEvent.coverImg"
              alt=""
            />
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
        <div class="card profiles p-1">
          <div v-for="p in activeAttending" :key="p.id">
            <img
              class="rounded rounded-pill"
              :src="p.account.picture"
              height="40"
              alt=""
              :title="p.account.name"
            />
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-8">
          <div class="card">
            <div class="d-flex justify-content-end mt-2">
              <p>Join the conversation</p>
            </div>
            <form @submit.prevent="create">
              <div class="d-flex justify-content-center mt-2">
                <textarea
                  class="inputwid form-control"
                  placeholder="Tell the people..."
                  type="text"
                  name=""
                  id=""
                  v-model="newpost.body"
                ></textarea>
              </div>
              <div class="d-flex justify-content-end mt-2 margin">
                <button type="submit" class="btn btn-primary">
                  Post comment
                </button>
              </div>
            </form>
            <div>
              <div v-for="c in comments" :key="c.id">
                <Comment :comments="c" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { attendeesService } from "../services/AttendeesService"
import { commentsService } from "../services/CommentsService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup() {
    const newpost = ref({})
    const route = useRoute()
    onMounted(async () => {
      try {
        await eventsService.getActive(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    onMounted(async () => {
      try {
        await attendeesService.getActiveAttendees(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    onMounted(async () => {
      try {
        await commentsService.getComments(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      newpost,
      route,
      activeEvent: computed(() => AppState.activeEvent),
      activeAttending: computed(() => AppState.activeAttending),
      comments: computed(() => AppState.comments),
      async create() {
        try {
          let newcomment = newpost.value
          await commentsService.create(this.activeEvent.id, newcomment)
          newpost.value = ({})
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.inputwid {
  border-color: #c8c8c8 !important;
  width: 80vh;
  height: 15vh;
}

.image {
  background-color: #474c61 !important;
  height: auto;
}
.profiles {
  height: 10vh;
  background-color: #474c61 !important;
}
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
.homeheight {
  height: 100vh;
}
</style>