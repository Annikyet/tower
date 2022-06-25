<template>
  <div class="event-card" @click="gotoEventPage">
    <img :src="event.coverImg" alt="" class="img-under"
      :style="!event.isCanceled && event.capacity > 0 ? '' : '-webkit-filter: grayscale(1); -moz-filter:    grayscale(1);'">
    <div class="over-img">
      <div class="blur-panel">
        <h4 class="component-title">{{event.name}}</h4>
        <!-- style if the event is sold out -->
        <!-- style is cancelled -->
        <h5 class="event-card-attr">{{event.location}}</h5>
        <h5 class="event-card-attr">{{event.startDate}}</h5>
        <h5 v-if="!event.isCanceled && event.capacity > 0" class="text-right">
          <span class="bold-text">{{event.capacity}}</span><span class="thin-text"> tickets left.</span>
        </h5>
        <h5 v-if="event.isCanceled" class="text-right bold-text red-text">Cancelled.</h5>
        <h5 v-if="!event.isCanceled && event.capacity <= 0" class="text-right bold-text red-text">Sold out.</h5>
      </div>
    </div>
  </div>
</template>

    <!-- -webkit-filter: grayscale(0%); -moz-filter:    grayscale(0%); -->


<script>
import { useRouter } from 'vue-router'
export default {
  props: {event: {type: Object, required: true}},
  setup(props){
    const router = useRouter()
    return {
      gotoEventPage() {
        router.push({name: 'Event', params: {id: props.event._id}})
      }
      // put component methods and computed values here
    }
  }
}
</script>


<style lang="scss" scoped>
.event-card {
  margin-right: var(--page-margins);
  margin-bottom: var(--page-margins);
  width: calc((100vw - (5 * var(--page-margins))) / 4);
  height: calc((100vw - (5 * var(--page-margins))) / 4);
  background-color: var(--color-1);
  color: var(--color-2);
  position: relative;
}

.img-under {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.over-img {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;

  // margin: var(--page-margins);
}

.blur-panel {
  color: var(--color-2);
  text-shadow: 0px 0px 4px #000000d0;
  font-size: 1.4em;
  background-color: #ffffff40;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  align-self: flex-end;
  width: 100%;
  margin: 0px;
  padding-left: 0.4em;
  padding-right: 0.4em;
}

.event-card-attr {
  font-size: 0.8em;
  color: var(--color-3);
  // font-weight: lighter;
}

.component-title {
  font-size: 28px;
  font-weight: 500;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.text-right {
  text-align: end;
  font-weight: lighter;
}

.bold-text {
  font-weight: bold;
  text-shadow: 0px 0px 4px #000000d0;
}

.thin-text {
  font-weight: lighter;
  font-size: 20px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.red-text {
  color: #801010;
  text-shadow: 0px 0px 4px #ffffffd0;
}
</style>