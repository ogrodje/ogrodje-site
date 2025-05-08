<script setup lang="ts">
import {inject, ref, onMounted} from 'vue';
import {EventsService} from "../services/EventsService";
import type {GooEndpoint, Event} from "../services/EventsService";
import {formatEventTime} from "../utils/DateTimeUtils.ts";

const gooEndpoint = inject<GooEndpoint>('gooEndpoint') as GooEndpoint;

const events = ref<Event[]>([])

onMounted(async () => {
  events.value = await EventsService.events(gooEndpoint);
})

function when(event: Event) {
  return formatEventTime({
    startDateTime: event.localStartDateTime,
    endDateTime: event.localEndDateTime,
    hasStartTime: event.hasStartTime,
    hasEndTime: event.hasEndTime,
  });
}

</script>
<template>
  <h1>Events</h1>
  <table class="data-table events-table">

    <thead>
    <tr>
      <th>ID / Title</th>
      <th style="">Location</th>
      <th style="width: 300px">When</th>
      <th style="width: 60px">Start</th>
      <th style="width: 60px">End</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="event in events" :key="event.id" class="event">
      <td>
        <div class="title">
          <div class="meetupName">{{ event.meetup?.name }} / </div>
          <div class="titleName"> {{ event.title }}</div>
        </div>
      </td>

      <td>
        {{ event.locationName }} -
        {{ event.locationAddress }}
      </td>
      <td>{{ when(event) }}</td>
      <td>{{ event.hasStartTime }}</td>
      <td>{{ event.hasEndTime }}</td>
    </tr>
    </tbody>
  </table>
</template>
<style lang="scss" scoped>
tr.event {
  .title {
    display: inline-block;

    .meetupName {
      display: inline-block;
    }

    .titleName {
      margin-left: 5px;
      display: inline-block;
      font-weight: bold;
    }
  }
}
</style>
