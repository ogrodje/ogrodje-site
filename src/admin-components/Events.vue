<script setup lang="ts">
import {emptyEvent, type Event as GEvent} from "../services/goo/Events";
import {onMounted, ref} from 'vue';
import {formatEventTime} from "../utils/DateTimeUtils.ts";
import {GEventsService} from "../services/GooService.ts";
import EventEditor from "./EventEditor.vue";

const events = ref<GEvent[]>([])
const searchQueryRef = ref<string>('')
const isSearching = ref(false);

const handleSearchQuery = (e: InputEvent | Event) => {
  e.preventDefault?.()
  searchWithQuery(searchQueryRef.value.trim())
}

const searchWithQuery = async (queryValue: string) => {
  try {
    isSearching.value = true;
    events.value = await GEventsService.events(queryValue)
    isSearching.value = false;
  } finally {
    isSearching.value = false;
  }
}

onMounted(async () => {
  events.value = await GEventsService.events()
})


const when = (event: GEvent) => formatEventTime({
  startDateTime: event.localStartDateTime,
  endDateTime: event.localEndDateTime,
  hasStartTime: event.hasStartTime,
  hasEndTime: event.hasEndTime,
});

const where = (event: GEvent) => {
  if (event.locationName && event.locationAddress) {
    return event.locationName + ' - ' + event.locationAddress
  } else if (event.locationName) {
    return event.locationName
  } else if (event.locationAddress) {
    return event.locationAddress
  } else {
    return 'Unknown location'
  }
}

// Editor
const showEditor = ref(false);
const selectedEvent = ref<GEvent | null>(null);

function openEditor(e: Event, event: GEvent) {
  e.preventDefault?.()
  selectedEvent.value = event ? {...event} : {...emptyEvent};
  showEditor.value = true;
  showEditor.value = true;
}

function handleEditorClose() {
  selectedEvent.value = null;
  showEditor.value = false;
}

function handleEditorSave(e: any) {
  handleEditorClose();
  console.log("handleEditorSave", e)
}

</script>
<template>
  <h1>Events</h1>
  <div>
    <form @submit.prevent="handleSearchQuery">
      <p>
        <label>
          Search
          <input type="search" v-model="searchQueryRef" @input="handleSearchQuery"/>
        </label>
      </p>
    </form>
  </div>

  <table class="special-table">
    <thead>
    <tr>
      <th>Meetup / Event</th>
      <th>When</th>
      <th>Where</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="event in events" :key="event.id"
        class="event" @click="e => openEditor(e, event)"
        :class="{selected: selectedEvent?.id === event.id}"
    >
      <td>{{ event?.meetupName }} / {{ event.title }}</td>
      <td>{{ when(event) }}</td>
      <td>{{ where(event) }}</td>
    </tr>
    </tbody>
  </table>

  <Transition name="fade">
    <EventEditor v-if="showEditor"
                 :event="selectedEvent"
                 @close="handleEditorClose"
                 @save="handleEditorSave"/>
  </Transition>
</template>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s cubic-bezier(.4, 0, .2, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

table.special-table {
  border-collapse: collapse;
  width: 100%;

  thead, tbody {
    td, th {
      border-bottom: 1px solid #323232;
      padding: 10px
    }


    tr:nth-child(even) {
      background-color: #1b1b1b;
    }

    /*
    // Notworking.
    tr.selected {
      background-color: #c6c6c6 !important;
      color: white;
    }

     */
  }

  tr.event {
    &:hover {
      background-color: #323232;
    }

    cursor: pointer;
  }
}
</style>
