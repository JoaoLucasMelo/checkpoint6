<template>
  <div class="account container-fluid scrollbar">
    <div class="row">
      <div class="col-12 mt-2">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/Logo.png" width="250" class="m-3" alt="" />
        </router-link>
      </div>
    </div>
    <div class="row mediaonly">
      <div
        v-if="user.isAuthenticated"
        class="col-12 d-flex navheight flex-column align-items-center"
      >
        <div class="d-flex justify-content-between">
          <div
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            class="mt-4"
          >
            <img
              class="rounded picuser elevation-3"
              width="60"
              height="60"
              :src="account.picture"
              alt=""
            />
          </div>
          <div class="me-5"></div>
          <div>
            <div>
              <router-link :to="{ name: 'Home' }">
                <button class="btn buttonanim mt-3"><span>Home</span></button>
              </router-link>
            </div>
            <div>
              <router-link :to="{ name: 'Account' }">
                <button class="btn buttonanim"><span>Account</span></button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="d-flex mb-4">
          <div class="me-5">
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalcreateedit"
              class="mt-2 btn bggreen py-2 postbtn elevation-3"
            >
              New Event
            </button>
          </div>
          <div>
            <button
              @click="logout"
              class="mt-2 btn bgtransparent py-2 postbtn border elevation-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div class="">
        <div
          v-if="!user.isAuthenticated"
          class="
            col-12
            d-flex
            flex-row
            justify-content-center
            align-content-center
            mb-4
            mt-2
          "
        >
          <div class="me-3">
            <button @click="login" class="btn bggreen postbtn elevation-3">
              Login
            </button>
          </div>
          <div>
            <button class="btn buttonanim"><span>Home</span></button>
          </div>
        </div>
      </div>

      <div></div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div>
          <p class="green f-16 m-0">My Created Events</p>
        </div>
        <div
          class="d-flex flex-wrap mobilecenter"
          v-if="towerEvents.length > 0"
        >
          <div class="col-md-3" v-for="e in towerEvents" :key="e.id">
            <Event :towerEvents="e" />
          </div>
        </div>
        <div v-else>
          <p class="fst-italic my-5 fontcolor">"No events created"</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div>
          <p class="green f-16 mt-3 m-0">Events I am Attending</p>
        </div>
        <div class="d-flex flex-wrap mobilecenter">
          <div class="col-md-12" v-if="attending.length > 0">
            <div class="d-md-flex" v-for="e in attending" :key="e.id">
              <div class="col-12 col-md-11">
                <Event :towerEvents="e.event" />
              </div>
              <div class="col-12 col-md-1 d-md-flex justify-self-center">
                <div class="">
                  <button
                    @click="notattend(e.eventId, e.id)"
                    class="
                      ms-md-2
                      w-100
                      btn
                      btnattending
                      ps-2
                      mt-2
                      elevation-3
                      border-0
                      mb-3
                    "
                  >
                    Not Attend <i class="ms-2 mdi mdi-18px mdi-human pe-1"></i>
                  </button>
                </div>
              </div>
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
  props: {
    account: { type: Object, required: true }
  },
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
      towerEvents: computed(() => AppState.towerEvents),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async notattend(eventId, id) {
        try {
          await attendeesService.notattendaccount(eventId, id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.btnattending {
  font-weight: 500;
  font-size: 15px;
  background-color: #ff8929;
}
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

.buttonanim {
  border-radius: 4px;
  border: none;
  color: #96d4f1;
  text-align: center;
  font-size: 17px;

  cursor: pointer;
}
.picuser {
  object-fit: cover;
}
.postbtn {
  font-weight: 600;
}
.bggreen {
  background-color: #72d8a2;
}
.bgtransparent {
  background-color: #72d8a200;
  border-color: #72d8a2 !important;
  color: #a5f3c9;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.mediaonly {
  display: none;
}
@media only screen and (max-width: 600px) {
  .mobilecenter {
    justify-content: center;
  }
  .mediaonly {
    display: block;
  }
  .mediaflexcolumn {
    justify-content: center;
  }
}
</style>
