<template>
  <div class="comment">
    <div class="card">
      <h6>{{ comments.body }}</h6>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    comments: { type: Object, required: true }
  },
  setup() {
    return {
      comments: computed(() => AppState.comments)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>