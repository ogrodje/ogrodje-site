<script setup lang="ts">
import {ref, defineEmits, defineProps, onMounted, watch, computed} from 'vue';
import {emptyEvent, type Event as GEvent, type Meetup} from '../services/goo/Events';
import {GooAPIService} from "../services/GooService.ts";
import {localInputToUTC, utcToLocalDateTimeInput} from "../services/Utils.ts";

const props = defineProps<{
  event: GEvent | null;
}>();

// State
const meetups = ref<Meetup[]>([])

onMounted(async () => {
  meetups.value = await GooAPIService.meetups()
})

// Emits
const emit = defineEmits<{
  (e: 'save', event: GEvent): void;
  (e: 'close'): void;
}>();

// Local copy for editing
const localEvent = ref<GEvent>(
  props.event
    ? {...props.event}
    : emptyEvent
);

function closeEditor() {
  console.log("close")
  emit('close');
}

async function handleSave(e: Event): Promise<void> {
  e.preventDefault();

  // TODO: Handle errors.
  const event = localEvent.value;
  if (event.id) {
    await updateEvent(event)
  } else {
    await createEvent(event)
  }

  emit('save', localEvent.value);
  closeEditor();
}

async function createEvent(event: GEvent): Promise<GEvent> {
  console.log("Create event.")
  return GooAPIService.createEvent(event)
}

async function updateEvent(event: GEvent): Promise<GEvent> {
  console.log("Update event.")
  return GooAPIService.updateEvent(event.id, event)
}


const startDateTimeRaw = ref<string>(utcToLocalDateTimeInput(localEvent.value.startDateTime))
const endDateTimeRaw = ref<string | undefined>(utcToLocalDateTimeInput(localEvent.value.endDateTime))

watch(startDateTimeRaw, (newValue) => {
  if (newValue) localEvent.value.startDateTime = localInputToUTC(newValue) ?? '';
});
watch(endDateTimeRaw, (newValue) => {
  if (newValue) localEvent.value.endDateTime = localInputToUTC(newValue) ?? '';
});

const isPromoted = computed({
  get() {
    return !!localEvent.value.promotedAt;
  },
  set(value: boolean) {
    if (value) {
      localEvent.value.promotedAt = new Date();
    } else {
      localEvent.value.promotedAt = undefined;
    }
  }
});

const isHidden = computed({
  get() {
    return !!localEvent.value.hiddenAt;
  },
  set(value: boolean) {
    if (value) {
      localEvent.value.hiddenAt = new Date();
    } else {
      localEvent.value.hiddenAt = undefined;
    }
  }
});


</script>
<template>
  <div class="editor-overlay">
    <div class="event-editor">
      <div class="tools">
        <a href="#close-editor" @click.prevent="closeEditor">Close</a>
      </div>
      <h2>{{ localEvent.id ? 'Edit Event' : 'New Event' }}</h2>
      <div>
        <form @submit.prevent="handleSave">
          <ul>
            <li>
              <label>
                Title
                <input type="text" required v-model="localEvent.title"/>
              </label>
            </li>
            <li>
              <label>
                Meetups
                <select v-model="localEvent.meetupID">
                  <option v-for="meetup in meetups" :value="meetup.id">{{ meetup.name }}</option>
                </select>
              </label>
            </li>
            <li>
              <label>
                Start
                <input type="datetime-local" v-model="startDateTimeRaw" required/>
              </label>
            </li>
            <li>
              <label>
                End
                <input type="datetime-local" v-model="endDateTimeRaw" required/>
              </label>
            </li>
            <li>
              <label>
                Location Name
                <input type="text" v-model="localEvent.locationName"/>
              </label>
            </li>
            <li>
              <label>
                Location Address
                <input type="text" v-model="localEvent.locationAddress"/>
              </label>
            </li>
            <li>
              <label>
                URL
                <input type="url" v-model="localEvent.eventURL" required/>
              </label>
            </li>
            <li>
              <label>
                Promoted
                <input type="checkbox" v-model="isPromoted"/>
                <span v-if="localEvent.promotedAt">
                  ({{ new Date(localEvent.promotedAt).toLocaleString() }})
                </span>
              </label>
            </li>
            <li>
              <label>
                Hidden
                <input type="checkbox" v-model="isHidden"/>
                <span v-if="localEvent.hiddenAt">
                  ({{ new Date(localEvent.hiddenAt).toLocaleString() }})
                </span>
              </label>
            </li>
            <li>
              <label>
                <button type="submit">Save</button>
                | <a href="#close-editor" @click.prevent="closeEditor">Close</a>
              </label>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-overlay {
  position: fixed;
  top: 0;
  right: 0;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  display: block;
  margin: 0 auto;
  max-width: 1400px;
}

.event-editor {
  margin: 50px;
  position: absolute;
  top: 0;
  right: 0;
  max-height: 90vh;
  width: 100%;
  max-width: 600px;
  background: #5a5a5a;
  box-shadow: 3px 15px 10px rgb(0 0 0 / 80%);
  padding: 5px;
  overflow-y: auto;
  border-radius: 5px;
  pointer-events: auto;
  display: flex;
  flex-direction: column;

  .tools {
    padding: 4px;

    a {
      color: white
    }
  }
}

.event-editor {
  ul, ul li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  label {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
  }

  input[type=text], input[type=datetime-local], input[type=url], select {
    width: 100%;
  }
}


</style>
