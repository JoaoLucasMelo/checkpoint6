<template>
  <div class="Nav container">
    <div class="row">
      <div
        v-if="user.isAuthenticated"
        class="col-12 d-flex navheight flex-column"
      >
        <div
          class="align-items-center d-flex flex-column justify-content-between"
        >
          <div
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            class="mt-4"
          >
            <img
              class="rounded picuser elevation-3"
              width="85"
              height="85"
              :src="account.picture"
              alt=""
            />
          </div>
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
          <div>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalcreateedit"
              class="mt-5 btn bggreen py-2 postbtn elevation-3"
            >
              New Event
            </button>
          </div>
          <div>
            <button
              @click="logout"
              class="mt-5 btn bgtransparent py-2 postbtn border elevation-3"
            >
              Logout
            </button>
          </div>
          <div class="heightbig"></div>
          <div class="d-flex flex-column align-items-center">
            <img src="../assets/img/Vector.png" width="70" height="70" alt="" />
            <p class="johnmelo mt-2">Made by John Melo</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-if="!user.isAuthenticated"
        class="col-12 d-flex navheight flex-column align-items-center"
      >
        <div>
          <button
            @click="login"
            class="mt-5 px-4 btn bggreen py-2 postbtn elevation-3"
          >
            Login
          </button>
        </div>
        <div>
          <router-link :to="{ name: 'Home' }">
            <button class="btn buttonanim mt-3"><span>Home</span></button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { AuthService } from "../services/AuthService"
export default {
  props: {
    account: { type: Object, required: true }
  },
  setup() {
    return {
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


<style lang="scss" scoped>
.navheight {
  height: 100vh;
  max-height: 100vh;
  background: rgb(71, 76, 97);
  background: linear-gradient(
    180deg,
    rgba(71, 76, 97, 1) 30%,
    rgba(42, 45, 58, 1) 100%
  );
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
.heightbig {
  height: 33vh;
}
.johnmelo {
  font-size: 12px;
  color: rgb(167, 167, 167);
  font-style: italic;
}
</style>