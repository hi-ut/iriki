<template>
  <div>
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="bh">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>

    <v-container class="py-5" fluid>
      <h2 class="mb-5">{{ $t('map') }}</h2>
      <!--
      <div id="map-wrap" style="height: 80vh" class="my-2">
        <mapc :markers="markers" :zoom="2" :center="[35.689556, 139.691722]" />
      </div>
      -->
      <iframe allowfullscreen
            frameborder="0" style="height: 80vh; width: 100%;" :src="baseUrl + '/leaflet/'"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  components: {
  },
})
export default class PageMap extends Vue {
  baseUrl: any = process.env.BASE_URL
  map: any = {}
  markers: any[] = []

  /*
  async asyncData({ payload }: any) {
    if (payload) {
      return { item: payload }
    } else {
      const results = await axios.get(
        process.env.BASE_URL + '/data/spatial.json'
      )
      const markers = []

      for (const label in results.data) {
        const obj = results.data[label]

        const param: any = {}
        const fcField = 'fc-spatial'
        param[fcField] = label

        const marker: any = {
          latlng: [obj.lat, obj.long],
          content: label,
          path: {
            name: 'entity-entity-id',
            params: {
              entity: 'spatial',
              id: label,
            },
          },
        }

        markers.push(marker)
      }

      return {
        markers,
      }
    }
  }
  */

  get title() {
    return this.$t('map')
  }

  head() {
    const title = this.title
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  }

  get bh() {
    return [
      {
        text: this.$t('top'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
        exact: true,
      },
      {
        text: this.title,
      },
    ]
  }
}
</script>
