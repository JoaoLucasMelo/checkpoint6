<template>
  <div class="container scrollbar background">
    <div class="row">
      <div class="col-md-12 mt-2">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/Logo.png" width="250" class="m-3" alt="" />
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center p-2">
      <div class="col-md-11 d-flex image my-2 rounded">
        <div class="row p-2 flex-nowrap">
          <div
            class="
              col-md-3
              widthweird
              justify-content-center
              d-flex
              align-items-center
            "
          >
            <div class="width100">
              <img
                class="m-3 my-4 rounded boardpic elevation-3"
                :src="activeEvent.coverImg"
                alt=""
              />
            </div>
          </div>
          <div
            :class="editevent ? 'wideditable' : ''"
            class="col-md-8 widhere p-2"
          >
            <div
              v-if="activeEvent.creatorId === account.id"
              class="d-flex justify-content-end dropdown"
            >
              <button
                aria-label="dropdown button"
                data-bs-toggle="dropdown"
                id="dropDownMenu"
                class="btn m-0 p-0"
              >
                <div
                  title="Options"
                  class="text-end dotbtn mdi mdi-36px mdi-dots-horizontal"
                ></div>
              </button>
              <ul
                class="dropdown-menu text-center"
                aria-labelledby="dropdownMenuButton1"
              >
                <li
                  v-show="activeEvent.isCanceled === false"
                  @click="editevent = !editevent"
                  title="Edit Event"
                  class="dropdown-item"
                >
                  <i class="mdi mdi-24px mdi-pencil coloredit selectable1">
                    Edit Event</i
                  >
                </li>
                <li
                  v-if="activeEvent.isCanceled === false"
                  @click="removeEvent"
                  title="Edit Event"
                  class="dropdown-item"
                >
                  <i class="mdi mdi-24px mdi-trash-can coloredit selectable1">
                    Cancel Event</i
                  >
                </li>
                <li v-else title="Can't Uncancel event" class="dropdown-item">
                  <i class="text-danger coloredit no-select"> Event Canceled</i>
                </li>
              </ul>
            </div>
            <div v-else class="emptyspotif"></div>
            <div v-if="editevent">
              <form @submit.prevent="submitEdit">
                <div class="d-flex justify-content-between">
                  <div>
                    <p class="text-light m-0">Event name:</p>
                    <input
                      v-model="editable.name"
                      class="m-2 border-dark"
                      type="text"
                      :placeholder="activeEvent.name"
                    />
                    <p class="m-0 text-light">Event Location:</p>
                    <input
                      v-model="editable.location"
                      class="m-2 border-dark"
                      type="text"
                      :placeholder="activeEvent.location"
                    />
                  </div>
                  <div>
                    <div>
                      <p class="m-0 text-light">Start date:</p>
                      <input
                        min="2020-01-01"
                        max="2030-12-31"
                        v-model="editable.startDate"
                        class="border-dark"
                        type="date"
                        :placeholder="activeEvent.startDate"
                      />
                    </div>
                    <div>
                      <p class="m-0 text-light mt-3">Event Category:</p>
                      <div class="btn-group">
                        <select
                          class=""
                          :placeholder="activeEvent.type"
                          v-model="editable.type"
                        >
                          <option>
                            <a class="dropdown-item" value="concert">concert</a>
                          </option>
                          <option>
                            <a class="dropdown-item" value="convention" href="#"
                              >convention</a
                            >
                          </option>
                          <option>
                            <a class="dropdown-item" value="sport" href="#"
                              >sport</a
                            >
                          </option>
                          <option>
                            <a class="dropdown-item" value="digital" href="#"
                              >digital</a
                            >
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="">
                  <p class="text-light">Description:</p>
                  <textarea
                    class="border-dark"
                    :placeholder="activeEvent.description"
                    v-model="editable.description"
                    cols="50"
                  />
                </div>
                <div
                  class="canceledevent text-light text-center"
                  v-if="activeEvent.isCanceled"
                >
                  EVENT CANCELED
                </div>
                <div v-else class="d-flex">
                  <div class="width90">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <p class="text-light">Event capacity:</p>
                        <input
                          :placeholder="activeEvent.capacity"
                          v-model="editable.capacity"
                          min="0"
                          class="border-dark"
                          type="number"
                        />
                      </div>
                      <button
                        type="submit"
                        class="btn bggreen postbtn elevation-3"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div v-else>
              <div class="d-flex justify-content-between">
                <div>
                  <p class="titlecard m-0">{{ activeEvent.name }}</p>
                  <p class="m-0 mb-3 mt-1 localtitle">
                    {{ activeEvent.location }}
                  </p>
                </div>
                <div>
                  <p class="m-0 text-light pe-2">{{ activeEvent.startDate }}</p>
                </div>
              </div>
              <div class="d-flex">
                <p class="pt-2 desctitle">{{ activeEvent.description }}</p>
              </div>
              <div class="d-flex emptyspace"></div>
              <div
                class="canceledevent text-light text-center"
                v-if="activeEvent.isCanceled"
              >
                EVENT CANCELED
              </div>
              <div v-else class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="capacitytitle">
                      {{ activeEvent.capacity }}
                    </p>
                  </div>
                  <div class="localtitle mb-0 ms-2">
                    <p>Spots Available</p>
                  </div>
                </div>
                <div v-if="user.isAuthenticated" class="me-3 mb-3">
                  <button
                    v-if="myActiveAttend"
                    @click="notattend"
                    class="btn btnattending ps-3 elevation-3 border-0"
                  >
                    Attending! <i class="ms-2 mdi mdi-18px mdi-human pe-1"></i>
                  </button>
                  <button
                    v-else-if="activeEvent.capacity > 0"
                    @click="attend"
                    class="btn btn-warning btnattend ps-3 elevation-3 border-0"
                  >
                    Attend <i class="ms-2 mdi mdi-18px mdi-human pe-1"></i>
                  </button>
                  <button
                    v-else-if="activeEvent.capacity === 0"
                    class="
                      btn btn-warning
                      btnattendno
                      border-0
                      ps-3
                      elevation-3
                      no-select
                    "
                  >
                    No spots left
                    <i class="ms-2 mdi mdi-18px mdi-human pe-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeEvent.isCanceled"></div>
      <div v-else class="row justify-content-center">
        <div class="col-md-11 d-flex justify-content-center">
          <div>
            <div>
              <p class="m-0 p-1 fontcolor">See who is attending</p>
            </div>
            <div class="d-flex justify-content-center">
              <div class="card profiles d-flex flex-row flex-wrap p-1">
                <div v-for="p in activeAttending" :key="p.id">
                  <img
                    class="picrounded"
                    :src="p.account.picture"
                    height="40"
                    width="40"
                    alt=""
                    :title="p.account.name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-md-7 mb-3">
          <div class="card image">
            <div class="d-flex justify-content-end mt-2 margin">
              <p class="m-1 green">Join the conversation</p>
            </div>
            <form @submit.prevent="create">
              <div class="d-flex justify-content-center mt-2">
                <textarea
                  class="inputwid form-control"
                  placeholder="Tell the people..."
                  type="text"
                  name=""
                  id=""
                  v-model="state.editable.body"
                ></textarea>
              </div>
              <div class="d-flex justify-content-end mt-3 margin">
                <button
                  type="submit"
                  title="Post Comment"
                  class="btn bggreen py-2 postbtn elevation-3"
                >
                  Post comment
                </button>
              </div>
            </form>
            <div
              class="
                d-flex
                justify-content-center
                flex-column
                align-items-center
                mt-2
                mb-3
              "
            >
              <div class="row commentsize justify-content-center">
                <div class="col-md-11" v-for="c in comments" :key="c.id">
                  <Comment :activeAttending="activeAttending" :comment="c" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateEvent :activeEvent="activeEvent" />
</template>


<script>
import { computed, onMounted, reactive, ref } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { attendeesService } from "../services/AttendeesService"
import { commentsService } from "../services/CommentsService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"

export default {
  setup() {
    const editevent = ref(false)
    const route = useRoute()
    const editable = ref({})
    let state = reactive({
      editable: { eventId: route.params.id },
    })
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
      editable,
      editevent,
      state,
      route,
      activeEvent: computed(() => AppState.activeEvent),
      activeAttending: computed(() => AppState.activeAttending),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      myActiveAttend: computed(() => AppState.myActiveAttend),
      async switchedit() {
        editevent.value = !editevent.value
      },
      async create() {
        try {
          await commentsService.create(state.editable)
          state.editable = { eventId: route.params.id }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async removeEvent() {
        try {

          if (this.activeAttending.length === 0) {
            if (await Pop.confirm()) {
              await eventsService.cancel(this.activeEvent.id)
              Pop.toast('Event Canceled!', 'success')
            }
          }
          else { Pop.toast('Cannot cancel events with current attendance', 'info') }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async attend() {
        try {
          await attendeesService.attend(this.activeEvent.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async notattend() {
        try {
          await attendeesService.notattend(this.activeEvent.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async submitEdit() {
        try {
          await eventsService.editEvent(editable.value, this.activeEvent.id)
          Pop.toast('Event Edited', 'success')
          editevent.value = !editevent.value
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.picrounded {
  border-radius: 50%;
  object-fit: cover;
}
.wideditable {
  width: 87%;
}
.postbtn {
  font-weight: 600;
}
.bggreen {
  background-color: #72d8a2;
}
.widthweird {
  width: 53vh;
}
.width100 {
  width: 100%;
}
.width90 {
  width: 92%;
}
.sizetest {
  width: 100%;
}
.widhere {
  max-width: 90vh;
}
.boardpic {
  display: inline-block;
  object-fit: cover;
  height: 350px;
  width: 370px;
}
.canceledevent {
  background: rgb(224, 55, 55);
  background: linear-gradient(
    90deg,
    rgba(224, 55, 55, 0) 0%,
    rgba(224, 55, 55, 1) 25%,
    rgba(224, 55, 55, 1) 75%,
    rgba(42, 45, 58, 0) 100%
  );
}
.emptyspotif {
  height: 2vh;
}
.btnattendno {
  color: #862f3f;
  background-color: #ff5977;
  font-weight: 500;
  font-size: 15px;
}
.desctitle {
  font-weight: 400;
  line-height: 25px;
  font-size: 15px;
  color: #e4e4e4;
}
.btnattend {
  font-weight: 500;
  font-size: 15px;
}
.btnattending {
  font-weight: 500;
  font-size: 15px;
  background-color: #72d8a2;
}
.capacitytitle {
  color: #56c7fb;
  font-weight: 600;
  font-size: 19px;
}
.emptyspace {
  height: 17vh;
  width: 1vh;
}
.titlecard {
  color: rgb(238, 238, 238);
  font-weight: 500;
  font-size: 20px;
}
.localtitle {
  color: #ccf3fd;
  font-weight: 500;
  font-size: 15px;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.dotbtn {
  color: #ccf3fd;
  margin-right: 2vh;
}
.background {
  background-color: #2a2d3a;
}
.inputwid {
  border-color: #c8c8c8 !important;
  width: 90%;
  height: 15vh;
}
.margin {
  margin-right: 5%;
}

.image {
  background-color: #474c61 !important;
  height: auto;
}
.profiles {
  height: 10vh;

  width: 105vh;
  background-color: #474c61 !important;
}
.postbtn {
  font-weight: 600;
}
.fontcolor {
  color: #a0a2ad;
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
.homeheight {
  height: 100vh;
}
.green {
  color: #72d8a2;
}
.bggreen {
  background-color: #72d8a2;
}
.commentsize {
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .homeheight {
    height: 100%;
  }
  .fontcolor {
    color: #a0a2ad;
  }
}
</style>