<template>
  <div class="event">
    <router-link :to="{ name: 'Event', params: { id: towerEvents.id } }">
      <div
        class="
          card
          cardshome
          elevation-3
          border
          m-3
          d-flex
          justify-content-end
          action
        "
      >
        <div class="card blurycards rounded-0">
          <div>
            <p class="p-2 m-0 f-12">
              {{ towerEvents.name }}
            </p>
            <p>{{ towerEvents.capacity }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
export default {
  props: {
    towerEvents: { type: Object },
    attending: { type: Object }
  },

  setup(props) {
    return {
      coverImg: computed(() => `url(${props.towerEvents?.coverImg})`)
    }
  }
}
</script>


<style lang="scss" scoped>
.blurycards {
  height: 40% !important;
  color: white;
  background-color: #52525288;
  border: 0;
  width: 100%;
}
.cardshome {
  height: 33vh;
  border-width: 6px !important;
  border-color: #474c61 !important;
  background-image: v-bind(coverImg);
  object-fit: cover;
}
</style>