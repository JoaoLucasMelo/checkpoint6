<template>
  <div class="eventmodal">
    <div
      :id="'a' + activeEvent.id + 'a'"
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
                type="url"
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
                v-model="eventData.startDate"
                class="m-2 border-dark"
                type="number"
              />
              <p class="m-0">Event Category:</p>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul class="dropdown-menu text-center">
                  <li>
                    <a class="dropdown-item" value="">Concert</a>
                  </li>
                  <li><a class="dropdown-item" href="#">Convention</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Sport</a>
                  </li>
                  <li><a class="dropdown-item" href="#">Digital</a></li>
                </ul>
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
              @click="handleSubmit"
              type="submit"
              form="eventForm"
              class="btn btn-primary text-white"
              data-bs-dismiss="modal"
            >
              {{ eventData.id ? "Save" : "Create" }}
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
      eventData.value = { ...props.activeEvent }
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
            router.push({ name: 'Event', params: { eventId: AppState.activeEvent.id } })
          }
          const modelElem = document.getElementById('a' + this.activeEvent.id + 'a')
          Modal.getOrCreateInstance(modelElem).hide()
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