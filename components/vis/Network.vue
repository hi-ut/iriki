<template>
  <div>
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

    <v-row dense class="mt-2">
      <v-col sm="6" cols="12">
        <v-chip class="ma-2" label>
          {{ $t('legend') }}
        </v-chip>
        <v-chip class="ma-2" style="background-color: #1976d2" dark>
          {{ $t('Nomenclature') }}
        </v-chip>
        <v-chip class="ma-2" style="background-color: yellow">
          {{ $t('Auteur') }}
        </v-chip>
      </v-col>
      <v-col sm="6" cols="12" class="text-right"
        ><v-btn
          v-if="showFSButton"
          class="ma-2"
          color="primary"
          text
          @click="fullscreen"
        >
          <v-icon>mdi-fullscreen</v-icon> フルスクリーンで表示する
        </v-btn></v-col
      >
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import firebase from '@/plugins/firebase'
// import { Network } from 'vue-visjs'

const { Network } = require('vue-visjs')

@Component({
  components: {
    network: Network,
  },
})
export default class grid extends Vue {
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

  showFSButton: boolean = false

  options: any = {
    layout: { randomSeed: 2 },
  }

  items: any[] = []

  created() {
    if (document.fullscreenEnabled) this.showFSButton = true
  }

  async mounted() {
    const env: any = process.env.toc
    const toc: any = env['2']

    const summary: any = firebase.firestore().collection('summary')
    const data: any = await summary.doc('items').get()
    const items = JSON.parse(data.data().json)

    // eslint-disable-next-line no-console
    console.log(items.length)

    const map: any = {}

    const rows: any[] = []

    for (const item of items) {
      const spl = item.id.split('-')
      const id = spl[0] + '-' + spl[1]

      const label = toc[Number(spl[1]) - 1].label

      const author = item['Auteur mentionné']
        ? item['Auteur mentionné'].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
        : ''

      const title = item['Titre mentionné']
        ? item['Titre mentionné'].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
        : ''

      if (author && title) {
        rows.push({
          uuid: item.id,
          title,
          author,
          id,
          label,
        })
      }

      // map

      for (const key in item) {
        if (!map[key]) {
          map[key] = {}
        }
        const value = item[key]
        if (!map[key][value]) {
          map[key][value] = 0
        }

        map[key][value] += 1
      }
    }

    /// ///

    const nodesMap: any = {}
    const edgesMap: any = {}

    for (const row of rows) {
      const label = row.label
      const author = row.author

      if (!nodesMap[label]) {
        nodesMap[label] = {
          id: label,
          label,
        }
      }

      if (!nodesMap[author]) {
        nodesMap[author] = {
          id: author,
          label: author,
          color: 'yellow',
        }
      }

      if (!edgesMap[label]) {
        edgesMap[label] = {}
      }

      if (!edgesMap[label][author]) {
        edgesMap[label][author] = 0
      }

      edgesMap[label][author] += 1
    }

    const edges = []
    const nodes = []

    for (const label in edgesMap) {
      for (const author in edgesMap[label]) {
        edges.push({
          from: label,
          to: author,
          count: edgesMap[label][author],
          arrows: 'to',
        })
      }
    }

    for (const label in nodesMap) {
      nodes.push(nodesMap[label])
    }

    this.edges = edges
    this.nodes = nodes
  }

  fullscreen() {
    const full: any = this.$refs.full
    full.requestFullscreen()
  }
}
</script>
<style>
#mynetwork {
  border: 1px solid lightgray;
}
</style>
