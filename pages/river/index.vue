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
              <th class="text-left">{{ $t('水名') }}</th>
              <th class="text-left">{{ $t('巻') }}</th>
              <th class="text-left">{{ $t('画像') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>
                <nuxt-link
                  :to="
                    localePath({ name: 'search', query: { 'main[refinementList][水名]': item._id } })
                  "
                  >{{ item._id }}</nuxt-link
                >
              </td>
              <td>{{ item._source.巻[0] }}</td>
              <td>
                <a
                  :href="
                    'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=' +
                    item._source['curation']
                  "
                  >{{ $t('画像をみる') }}</a
                >
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
import axios from 'axios'

@Component({
  components: {},
})
export default class Item extends Vue {
  baseUrl: any = process.env.BASE_URL
  title: any = this.$t('rivers')
  siteDesc: any = process.env.siteDesc
  top: any = process.env.top

  async asyncData({ payload, app }: any) {
    if (payload) {
      return payload
    } else {
      const result = await axios.get(
        process.env.BASE_URL + '/data/river/es.json'
      )
      const items = result.data
      return {
        items,
      }
    }
  }

  /*
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
  */

  /*
  items: any = [
    {
      id: 1,
      label: 'aaa',
      '': '',
    },
  ]
  */

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
