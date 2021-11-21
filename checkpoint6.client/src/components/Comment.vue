<template>
  <div class="comment">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <img
          class="rounded rounded-pill elevation-3"
          :src="comment.creator.picture"
          height="75"
          alt=""
          :title="comment.creator.name"
        />
      </div>
      <div class="card commentspace m-2 elevation-3">
        <div class="d-flex justify-content-between">
          <p class="m-0 mt-2 fw">{{ comment.creator.name }}</p>
          <i
            @click="remove"
            title="Remove Comment"
            v-if="comment.creatorId === account.id"
            class="mdi mdi-close mt-1"
          ></i>
        </div>
        <p class="m-0">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { commentsService } from "../services/CommentsService"
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    return {
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      async remove() {
        try {
          await commentsService.remove(props.comment.id)
          await commentsService.getComments(props.comment.eventId)
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
.commentspace {
  width: 100%;
  min-height: 10vh;
  padding-left: 2vh;
  padding-right: 2vh;
  padding-bottom: 3vh;
  background-color: #e2f9ff;
}
.fw {
  font-weight: 600;
}
</style>