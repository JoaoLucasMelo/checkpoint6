<template>
  <div class="offCanvas background">
    <div class="ProfileCanvas background">
      <div
        class="offcanvas offcanvas-start background"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasLabel"
      >
        <div class="offcanvas-header">
          <p class="offcanvas-title text-light texts" id="offcanvasLabel">
            Profile
          </p>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div
            class="d-flex justify-content-center flex-column align-items-center"
          >
            <i
              @click="edit = !edit"
              aria-label="edit profile"
              class="mdi mdi-pencil text-light selectable1 align-self-end"
              >Edit Profile</i
            >
            <div v-if="edit === true">
              <img
                :src="account.picture"
                alt="user photo"
                height="150"
                width="150"
                class="picconfig elevation-3 border rounded mt-4"
              />
            </div>
            <div class="text-center mb-3" v-if="edit === true">
              <p class="text-light mb-0 texts1 mt-3">{{ account.name }}</p>
              <p class="m-0 text-light texts2">{{ account.email }}</p>
            </div>
          </div>

          <div v-if="edit === false">
            <form>
              <div class="d-flex flex-column mb-3 mt-4">
                <div class="input-group">
                  <span class="input-group-text border-dark">Name:</span>
                  <input
                    class="form-control border-dark"
                    type="text"
                    placeholder=""
                    name="name"
                    v-model="editProfile.name"
                  />
                </div>
              </div>
              <div class="d-flex flex-column">
                <div class="input-group">
                  <span class="input-group-text border-dark">Picture URL</span>
                  <input
                    class="form-control border-dark"
                    type="text"
                    placeholder=""
                    name="pic-url"
                    v-model="editProfile.picture"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <i
                  type="submit"
                  @click="editAccount"
                  v-if="edit === false"
                  class="
                    mdi mdi-content-save
                    selectable1
                    align-self-end
                    border
                    p-1
                    rounded
                    bg-light
                  "
                >
                  Save
                </i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { accountService } from "../services/AccountService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  setup() {
    let edit = ref(true)
    let editProfile = ref({})
    return {
      async editAccount() {
        try {
          await accountService.editAccount(editProfile.value)
          edit.value = !edit.value
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      edit,
      editProfile,
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
.picconfig {
  object-fit: cover;
}
.background {
  background: rgb(71, 76, 97);
  background: linear-gradient(
    180deg,
    rgba(71, 76, 97, 1) 30%,
    rgba(42, 45, 58, 1) 100%
  );
}
.texts {
  color: rgb(238, 238, 238);
  font-weight: 500;
  font-size: 29px;
}
.texts1 {
  color: rgb(238, 238, 238);
  font-weight: 500;
  font-size: 26px;
}
.texts2 {
  color: rgb(238, 238, 238);
  font-weight: 500;
  font-size: 18px;
}
</style>