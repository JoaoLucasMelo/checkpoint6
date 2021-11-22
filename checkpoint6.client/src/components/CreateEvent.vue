<template>
  <div class="eventmodal">
    <div
      :id="'modalcreateedit'"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ eventData.id ? "Edit Event" : "New Event" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="eventForm" @submit.prevent="handleSubmit">
              <p class="m-0">Event Name:</p>
              <input
                required
                v-model="eventData.name"
                class="m-2 border-dark"
                type="text"
              />
              <p class="m-0">Description:</p>
              <textarea
                v-model="eventData.description"
                class="m-2 border-dark"
                cols="50"
                required
              />
              <p class="m-0">Event Image:</p>
              <input
                required
                v-model="eventData.coverImg"
                class="m-2 border-dark"
                type="text"
              />
              <p class="m-0">Event Location:</p>
              <input
                required
                v-model="eventData.location"
                class="m-2 border-dark"
                type="text"
              />
              <p class="m-0">Event Capacity:</p>
              <input
                required
                v-model="eventData.capacity"
                class="m-2 border-dark"
                type="number"
              />
              <p class="m-0">Event Start Date:</p>
              <input
                required
                min="2020-01-01"
                max="2030-12-31"
                v-model="eventData.startDate"
                class="m-2 border-dark"
                type="date"
              />
              <p class="m-0">Event Category:</p>
              <div class="btn-group">
                <select required class="" v-model="eventData.type">
                  <option>
                    <a class="dropdown-item" value="concert">concert</a>
                  </option>
                  <option>
                    <a class="dropdown-item" value="convention" href="#"
                      >convention</a
                    >
                  </option>
                  <option>
                    <a class="dropdown-item" value="sport" href="#">sport</a>
                  </option>
                  <option>
                    <a class="dropdown-item" value="digital" href="#"
                      >digital</a
                    >
                  </option>
                </select>
              </div>
              <div></div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary text-white"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              form="eventForm"
              class="btn btn-primary text-white"
            >
              {{ eventData.id ? "Save" : "Post" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { Modal } from "bootstrap"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
export default {
  props: {
    activeEvent: {
      type: Object
    }
  },
  setup(props) {
    const eventData = ref({})
    watchEffect(() => {
      eventData.value = {}
    });
    const router = useRouter()
    return {
      activeEvent: computed(() => AppState.activeEvent),
      router,
      eventData,
      async handleSubmit() {
        try {
          if (eventData.value.id) {
            await eventsService.editEvent(eventData.value)
            Pop.toast('Event Edited', 'success')
          } else {
            await eventsService.createEvent(eventData.value)
            Pop.toast('Event Created', 'success')
            eventData.value = {}
            router.push({ name: 'Event', params: { id: AppState.towerEvents[0].id } })
          }
          const modelElem = document.getElementById('modalcreateedit')
          Modal.getOrCreateInstance(modelElem).toggle()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>>


<style lang="scss" scoped>
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>