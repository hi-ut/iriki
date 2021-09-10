<template>
  <div>
    <v-container>

      <div ref="full" style="height: 500px">
      <network
        id="mynetwork"
        ref="network"
        style="height: 100%; background-color: white"
        :nodes="nodes"
        :edges="edges"
        :options="options"
      >
      </network>
    </div>
    <!-- {{items}} -->

     <v-data-table
      class="mt-10"
      :headers="headers"
      :items="items2"
    ></v-data-table>
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

  items2: any[] = []

  headers: any[] = [
    {
      text: 'sent', value: 'sent'
    },
    {
      text: 'received', value: 'received'
    },
    {
      text: 'count', value: 'count'
    }
  ]

  async asyncData({ payload, app, $axios }: any) {
    if (payload) {
      return { item: payload }
    } else {
      const id = app.context.params.id

      const response = await $axios.$get(
        process.env.BASE_URL + '/data/index.json'
      )
      const items = response

      return { items/*, docs*/ }
    }
  }

  baseUrl: any = process.env.BASE_URL

  created(){
    const items = (this as any).items
    const map: any = {}

    for(const item of items){
      let sent = item.sent
      let received = item.received

      if(!sent || !received){
        continue
      }

      sent = sent[0]
      received = received[0]

      if(!map[sent]){
        map[sent] = {}
      }

      const tmp = map[sent]
      if(!tmp[received]){
        tmp[received] = 0
      }

      tmp[received] += 1
    }

    const nodesMap: any = {}

    const edges: any = []

    const items2 = []
    for(let sent in map){
      for(let received in map[sent]){
        const item = {
          sent,
          received,
          count: map[sent][received]
        }
        items2.push(item)

        if(!nodesMap[sent]){
          nodesMap[sent] = {
            id: sent,
            label: sent,
          }
        }

        if(!nodesMap[received]){
          nodesMap[received] = {
            id: received,
            label: received,
          }
        }

        edges.push({
          from: sent,
          to: received,
          count: item.count,
          arrows: 'to',
        })
      }
    }

    const nodes = []
    for(const key in nodesMap){
      nodes.push(nodesMap[key])
    }

    this.nodes = nodes
    this.edges = edges

    this.items2 = items2
  }

  
}
</script>
