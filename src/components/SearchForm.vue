<script setup lang="ts">
import EpisodeRow from "./EpisodeRow.astro";
import {computed, onUnmounted, type Ref, ref} from 'vue';
import {type Episode, episodePath} from "../model/Episode.ts";

const searchURL = 'https://search.ogrodje.si/query';

interface Hits {
  readonly total: { value: number }
  readonly max_score: number
  readonly hits: {
    readonly _index: string
    readonly _type: string
    readonly _id: string
    readonly _score: number
    readonly _source: {
      readonly name: string
      readonly summary: string
      readonly machineSummary?: string
      readonly code: string,
      readonly show?: { name: string },
      readonly topics: {
        readonly name: string
      }[]
    }
    readonly highlight: { [field: string]: string[]; }[]
  }
}

const hits = ref<Hits>({total: {value: 0}, max_score: 0, hits: []});
const query = ref('');
const isSearching = ref(false);

const handleInput = () => searchWithQuery(query.value.trim());

const searchWithQuery = async (queryValue: string) => {
  try {
    isSearching.value = true;
    const response = await fetch(searchURL + "?" + new URLSearchParams({query: queryValue})).then(r => r.json());
    hits.value = response['hits'] || []
    isSearching.value = false;
  } finally {
    isSearching.value = false;
  }
};

const haveHits = computed(() => hits.value?.hits?.length > 0);

const adjustHighlightName = (fieldName: string) => {
  return {
    name: 'Naslov',
    summary: 'Opis',
    machineSummary: 'Strojni opis',
  }[fieldName] || fieldName;
}

const showColor = (showName?: { name: string }) => {
  return showName?.name
}

</script>
<template>
  <div>
    <label>
      <input
        id="search"
        type="search"
        v-model="query"
        @input="handleInput"
        placeholder="Začni pisati za iskanje,..."
        autofocus
      />
      <span v-if="isSearching" class="is-searching">Iskanje...</span>
    </label>

    <div class="results-wrap">
      <ul v-if="haveHits">
        <li v-for="hit in hits.hits" class="episode hit">
          <a :href="'/epizode/' + episodePath(hit._source)">
            <div class="code">{{ hit._source.code }}</div>
            <div v-if="hit._source.show"
                 :data-show="showColor(hit._source.show)"
                 class="show">{{ hit._source?.show.name }}
            </div>
            <div class="name">{{ hit._source.name }}</div>


            <ul class="highlighted">
              <li v-for="(value, field) in hit.highlight">
                <div class="highlighted-field">{{ adjustHighlightName(field) }}</div>
                <ul>
                  <li v-for="v in value">
                    <div v-html="v" class="highlight"></div>
                  </li>
                </ul>
              </li>
            </ul>
          </a>
        </li>
      </ul>

      <p v-else-if="!haveHits">Ni zadetkov.</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../_variables.scss";
@import "../episode_row.scss";

#search {
  width: 70%;
}

.is-searching {
  margin-left: 10px;
}

.results-wrap {
  min-height: 400px;
  display: block;
  padding-top: 20px;
}

ul, li {
  list-style: none;
  margin: 0;
  padding: 0 0 0 10px;
}

ul li.episode.hit {
  padding-left: 0;
  margin-bottom: 15px;
}

.hit {
  a {
    transition: background-color 0.3s ease-in-out;
    display: block;
    padding: 3px;
  }

  a:hover {
    background-color: lighten(#0c0c0c, 5%);
  }

  .highlighted-field {
    color: white;
  }

  > .title {
    font-family: "Iosevka Web", sans-serif;

    .code {
      font-weight: bold;
      display: inline-block;
    }
  }
}

</style>
