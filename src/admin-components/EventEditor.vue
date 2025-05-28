<script setup lang="ts">
import {ref, watch, defineEmits, defineProps} from 'vue';
import {emptyEvent, type Event as GEvent} from '../services/goo/Events';

const props = defineProps<{
  event: GEvent | null;
}>();

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

function handleSave(e: Event) {
  e.preventDefault();
  emit('save', localEvent.value);
  closeEditor();
}
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
                Start
                <input type="datetime-local" v-model="localEvent.startDateTime"/>
              </label>
            </li>
            <li>
              <label>
                End
                <input type="datetime-local" v-model="localEvent.endDateTime"/>
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
                <input type="url" v-model="localEvent.eventURL"/>
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
.event-editor-overlay {
  position: fixed;
  inset: 0; /* shorthand for top:0; right:0; bottom:0; left:0; */
  z-index: 1000;
  pointer-events: none; /* Optional: so only editor receives input, change if needed */
  /* Optional backdrop */
  background: rgba(0, 0, 0, 0.15);
}

.event-editor {
  margin: 50px;
  position: fixed; /* Fully fixed to viewport */
  top: 0;
  right: 0;
  max-height: 90vh;
  width: 100%;
  max-width: 600px;
  background: #5a5a5a;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.08);
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

  input[type=text], input[type=datetime-local], input[type=url] {
    width: 100%;
  }
}


</style>
