<script setup lang="ts">
import {inject, ref, onMounted} from 'vue';
import {EventsService} from "../services/EventsService";
import type {GooEndpoint, Meetup} from "../services/EventsService";

const gooEndpoint = inject<GooEndpoint>('gooEndpoint') as GooEndpoint;

const meetups = ref<Meetup[]>([])

onMounted(async () => {
  meetups.value = await EventsService.meetups(gooEndpoint);
})

</script>
<template>
  <h1>Meetups</h1>
  <table class="data-table">
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Stage</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="meetup in meetups" :key="meetup.id">
      <th>{{ meetup.id }}</th>
      <td>{{ meetup.name }}</td>
      <td>{{ meetup.stage }}</td>
    </tr>
    </tbody>
  </table>
</template>
