<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {Meetup} from "../services/goo/Events.ts";
import {GooAPIService} from "../services/GooService.ts";

const meetups = ref<Meetup[]>([])
const searchQueryRef = ref<string>('')
const isSearching = ref(false);

onMounted(async () => {
  meetups.value = await GooAPIService.meetups();
})

const handleSearchQuery = (e: InputEvent | Event) => {
  e.preventDefault?.()
  searchWithQuery(searchQueryRef.value.trim())
}

const searchWithQuery = async (queryValue: string) => {
  try {
    isSearching.value = true;
    meetups.value = await GooAPIService.meetups(queryValue)
    isSearching.value = false;
  } finally {
    isSearching.value = false;
  }
}

</script>
<template>
  <h1>Meetups</h1>

  <div class="action-tools">
    <div class="tools-left">
      <div class="admin-search-form">
        <form @submit.prevent="handleSearchQuery">
          <p>
            <label>
              Search
              <input type="search" v-model="searchQueryRef" @input="handleSearchQuery"/>
            </label>
          </p>
        </form>
      </div>

    </div>
  </div>

  <table class="data-table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Stage</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="meetup in meetups" :key="meetup.id">
      <td>{{ meetup.name }}</td>
      <td>{{ meetup.stage }}</td>
    </tr>
    </tbody>
  </table>
</template>
