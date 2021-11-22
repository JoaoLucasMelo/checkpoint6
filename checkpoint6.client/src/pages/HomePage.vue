<template>
  <div class="homeheight container-fluid scrollbar">
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
    <div class="row"></div>
    <div class="row mobieview justify-content-center">
      <div
        class="
          col-md-11
          image
          backgroundbanner
          rounded
          d-flex
          elevation-3
          border
          my-2
          align-items-center
        "
      >
        <div class="bannerfont">
          <p>Reserve your seat now with</p>
          <p>real events for real people.</p>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mobieview">
      <div
        class="
          col-md-11
          d-flex
          justify-content-between
          align-items-center
          sort
          rounded
          my-2
        "
      >
        <div>
          <button @click="getAll" title="All" class="btn text-light px-3 btn-5">
            All
          </button>
        </div>
        <!-- <div>
          <button @click="sortExpos" class="btn text-light px-3 btn-5">
            Expos
          </button>
        </div> -->
        <div>
          <button
            @click="sortConv"
            title="Conventions"
            class="btn text-light px-3 btn-5"
          >
            Conventions
          </button>
        </div>
        <!-- <div>
          <button @click="sortExhib" class="btn text-light px-3 btn-5">
            Exhibits
          </button>
        </div> -->
        <div>
          <button
            title="Sports"
            @click="sortSports"
            class="btn text-light px-3 btn-5"
          >
            Sports
          </button>
        </div>
        <div>
          <button
            @click="sortDigital"
            title="Digital"
            class="btn text-light px-3 btn-5"
          >
            Digital
          </button>
        </div>
        <div>
          <button
            @click="sortConc"
            title="Concerts"
            class="btn text-light px-3 btn-5"
          >
            Concerts
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mediaonly">
      <div class="d-flex align-items-center flex-column">
        <div>
          <div
            class="btn btn-outline-primary"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Sort by
          </div>
        </div>
        <div class="collapse" id="collapseExample">
          <button @click="getAll" title="All" class="btn text-light px-3 btn-5">
            All
          </button>
        </div>
        <div class="collapse" id="collapseExample">
          <button
            @click="sortConv"
            title="Conventions"
            class="btn text-light px-3 btn-5"
          >
            Conventions
          </button>
        </div>
        <div class="collapse" id="collapseExample">
          <button
            title="Sports"
            @click="sortSports"
            class="btn text-light px-3 btn-5"
          >
            Sports
          </button>
        </div>
        <div class="collapse" id="collapseExample">
          <button
            @click="sortDigital"
            title="Digital"
            class="btn text-light px-3 btn-5"
          >
            Digital
          </button>
        </div>
        <div class="collapse" id="collapseExample">
          <button
            @click="sortConc"
            title="Concerts"
            class="btn text-light px-3 btn-5"
          >
            Concerts
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-2">
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
import { AuthService } from "../services/AuthService"
export default {
  name: 'Home',
  props: {
    account: { type: Object, required: true }
  },
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
      sortSports() {
        eventsService.sortSports()
      },
      sortDigital() {
        eventsService.sortDigital()
      },
      sortAll() {
        eventsService.sortAll()
      },
      sortConc() {
        eventsService.sortConc()
      },
      sortConv() {
        eventsService.sortConv()
      },
      async getAll() {
        try {
          eventsService.getAll()
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bannerfont {
  color: #d1e8f5;
  margin-left: 9vh;
  font-size: 3vh;
}
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
  height: 30vh;
}
.sort {
  height: 7vh;
  background-color: #474c61 !important;
}

.scrollbar {
  overflow-y: scroll;
}
.scrollbar::-webkit-scrollbar {
  width: 7px;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2e;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 10px;
}
.backgroundbanner {
  background-image: url(../assets/img/photo-1510682657356-6ee07db8204b.jpeg);
  background-size: cover;
  border: 5px;
  border-color: #7d8ed1 !important;
}
.btn-5 {
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 0px solid;
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
}

.btn-5:hover {
  border: 0px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388;
}
.mediaonly {
  display: none;
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
.buttonanim {
  border-radius: 4px;
  border: none;
  color: #96d4f1;
  text-align: center;
  font-size: 17px;

  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .mobieview {
    display: none;
  }
  .mediaonly {
    display: block;
  }
}
</style>
