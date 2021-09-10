<template>
  <div>
    <v-container>

     <v-data-table
      class="mt-10"
      :headers="headers"
      :items="items"
    >
    
    <template v-slot:item.image="{ item }">
      <nuxt-link :to="localePath({
        name: 'people-id',
        params: {
          id: item.label
        }
      })">
      <v-img
        :src="item.image"
        contain
        width="90px"
      >
      </v-img>
      </nuxt-link>
    </template>

    <template v-slot:item.label="{ item }">
      <nuxt-link :to="localePath({
        name: 'people-id',
        params: {
          id: item.label
        }
      })">
      {{item.label}}
      </nuxt-link>
    </template>

    <template v-slot:item.url="{ item }">
      <a
        v-if="item.url"
        target="_blank"
        :href="item.url"
      >
      リンク
      </a>
    </template>
    
    </v-data-table>
     </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from "axios"

const { Network } = require('vue-visjs')

@Component({
  components: {
    Network
  },
})
export default class Item extends Vue {

  nodes: any[] = [
    /*
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' },
    */
  ]

  edges: any[] = [
    /*
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
    */
  ]

  options: any = {
    layout: { randomSeed: 2 },
  }

  headers: any[] = [
    {
      text: 'image', value: 'image'
    },
    {
      text: 'label', value: 'label'
    },
    {
      text: 'description', value: 'description', width: '60%'
    },
    {
      text: 'url', value: 'url'
    }
  ]

  async asyncData({ payload, app, $axios }: any) {
    if (payload) {
      return { item: payload }
    } else {

      const response = await $axios.$get(
        process.env.BASE_URL + '/data/people.json'
      )
      const items = response

      return { items/*, docs*/ }
    }
  }

  baseUrl: any = process.env.BASE_URL

  

  
}
</script>
