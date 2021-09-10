<template>
  <div>
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="breadcrumbs">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>
    <v-container class="my-5">
      <h1 class="mb-5">{{ title }}</h1>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">{{ $t('name') }}</th>
              
              <th class="text-left">{{ $t('map') }}</th>
              <th class="text-left">{{ "現代地図" }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in objList" :key="item.id">
              <td>
                <nuxt-link
                  :to="localePath({ name: 'search', query: { 'main[refinementList][図][0]': item.label, layout: 'table' } })"
                  >{{ item.label }}</nuxt-link
                >
              </td>
              <!--
              <td>
                <a
                  :href="`http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=https://static.toyobunko-lab.jp/suikeichuzu_data/curation/${item.id}.json&mode=annotation&lang=ja`"
                  >IIIF Curation Viewer</a
                >
              </td>
              -->
              <td>
                <a
                    :href="`https://nakamura196.github.io/i3/map/?curation=${curationPrefix}/${item.id}.json`"
                    >IIIF Curation Content Search Viewer</a
                  >
              </td>
              <td>
                <nuxt-link :to="localePath({name : 'map-id', params : {id : item.id}})">閲覧</nuxt-link>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Item extends Vue {
  curationPrefix: any = process.env.DATA_URL + "/curation"
  baseUrl: any = process.env.BASE_URL
  title: any = this.$t('list')
  siteDesc: any = process.env.siteDesc
  top: any = process.env.top

  get objList() {
    const objList = []
    const settings: any = process.env.settings
    for (const id in settings) {
      const obj = settings[id]
      obj.id = id
      objList.push(obj)
    }
    return objList
  }

  get breadcrumbs() {
    return [
      {
        text: 'HOME',
        disabled: false,
        to: this.localePath({ name: 'index' }),
        exact: true,
      },
      {
        text: (this as any).title,
      },
    ]
  }

  head() {
    const title = this.title
    return {
      title,
    }
  }
}
</script>
