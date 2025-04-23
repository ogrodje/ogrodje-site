<script setup lang="ts">
import {inject, ref, onMounted} from 'vue';
import {EventsService} from "../services/EventsService";
import type {GooEndpoint} from "../services/EventsService";

const gooEndpoint = inject<GooEndpoint>('gooEndpoint');

const events = ref([] as [{ name: string, id: string, meetupID: string }])

onMounted(async () => {
  events.value = await EventsService.events(gooEndpoint);
})

</script>
<template>
  <h1>Events</h1>
  <table class="data-table">

    <thead>
    <tr>
      <th>Meetup ID</th>
      <th>ID / Title</th>
      <th>Start</th>
      <th>End</th>
      <th>Has Start</th>
      <th>Has End</th>
      <th>Location</th>
      <th>Address</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="event in events" :key="event.id" class="event">
      <td>{{ event.meetupID }}</td>
      <td>

        <div class="title">{{ event.title }}</div> (#{{ event.id }})
      </td>
      <td>{{ event.startDateTime }}</td>
      <td>{{ event.endDateTime }}</td>
      <td>{{ event.hasStartTime }}</td>
      <td>{{ event.hasEndTime }}</td>
      <td>{{ event.locationName }}</td>
      <td>{{ event.locationAddress }}</td>

    </tr>
    </tbody>
  </table>
</template>
<style lang="scss" scoped>
  tr.event {
    .title {
      font-weight: bold;
      display: inline-block;
    }
  }
</style>
