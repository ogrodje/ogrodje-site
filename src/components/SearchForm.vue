<script setup lang="ts">
import {computed, ref} from 'vue';
import {episodePath} from '../model/Episode.ts';
import {SEARCH_ENDPOINT} from 'astro:env/client';

const searchURL = SEARCH_ENDPOINT + '/query';

interface Hit {
  readonly _index: string;
  readonly _type: string;
  readonly _id: string;
  readonly _score: number;
  readonly _source: {
    readonly name: string;
    readonly summary: string;
    readonly machineSummary?: string;
    readonly code: string;
    readonly show?: { name: string };
    readonly topics: {
      readonly name: string;
    }[];
  };
  readonly highlight?: { [field: string]: string[] }[];
}

interface Hits {
  readonly total: { value: number };
  readonly max_score: number;
  readonly hits: Hit[];
}

const hits = ref<Hits>({total: {value: 0}, max_score: 0, hits: []});
const query = ref('');
const isSearching = ref(false);

const handleInput = () => searchWithQuery(query.value.trim());

const searchWithQuery = async (queryValue: string) => {
  try {
    isSearching.value = true;
    const response = await fetch(
      searchURL + '?' + new URLSearchParams({query: queryValue})
    ).then((r) => r.json());
    hits.value = response['hits'] || [];
    isSearching.value = false;
  } finally {
    isSearching.value = false;
  }
};

const haveHits = computed(() => hits.value?.hits?.length > 0);

const adjustHighlightName = (fieldName: string) => {
  return (
    {
      name: 'Naslov',
      summary: 'Opis',
      machineSummary: 'Strojni opis',
    }[fieldName] || fieldName
  );
};

const showColor = (showName?: { name: string }) => {
  return showName?.name;
};

const adjustedTitle = (hit: Hit) => {
  const showName = hit._source.show?.name;
  const name = hit._source.name
    .replace(`${showName}:`, '')
    .replace(`${showName}`, '')
    .trim();

  const highlightedName: string | undefined = (hit?.highlight?.['name'] ||
    [])[0];
  return highlightedName ? highlightedName : name;
};
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
            <div
              v-if="hit._source.show"
              :data-show="showColor(hit._source.show)"
              class="show"
            >
              {{ hit._source?.show.name }}
            </div>
            <div class="name" v-html="adjustedTitle(hit)"></div>

            <ul class="highlighted" v-if="hit.highlight">
              <li
                v-for="[key, values] in Object.entries(hit.highlight).filter(
                  ([key, _]) => key != 'name'
                )"
              >
                <div class="highlighted-field">
                  {{ adjustHighlightName(key) }}
                </div>
                <ul>
                  <li v-for="v in values">
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
@use 'sass:color';
@use '../_variables';
@use '../episode_row';

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

ul,
li {
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
    background-color: color.adjust(#0c0c0c, $lightness: 5%);
  }

  .highlighted-field {
    color: var(--default_color);
  }

  > .title {
    font-family: variables.$special-font;

    .code {
      font-weight: bold;
      display: inline-block;
    }
  }
}

html {
  &.light {
    .hit a:hover {
      background-color: color.adjust(#f4f4f4, $lightness: -5%);
    }
  }
}
</style>
