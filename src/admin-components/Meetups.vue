<script setup lang="ts">
import {inject, ref, onMounted} from 'vue';
import {EventsService} from "../services/EventsService";
import type {GooEndpoint} from "../services/EventsService";

const gooEndpoint = inject<GooEndpoint>('gooEndpoint');

const meetups = ref([] as [{ name: string, id: string, stage: string }])

onMounted(async () => {
  meetups.value = await EventsService.meetups(gooEndpoint);
})

</script>
<template>
  <h1>Meetups</h1>
  <table class="data-table">
    <tr v-for="meetup in meetups" :key="meetup.id">
      <th>{{ meetup.id }}</th>
      <td>{{ meetup.name }}</td>
      <td>{{ meetup.stage }}</td>
    </tr>
  </table>
</template>
