<template>
  <div>
    <v-container>

      <v-card flat outlined class="my-10">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      </v-card>

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
        name: 'item-id',
        params: {
          id: item.objectID
        }
      })">
      {{item.label}}
      </nuxt-link>
    </template>
    
    </v-data-table>
     </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from "axios"
import { GChart } from 'vue-google-charts'
const { Network } = require('vue-visjs')

@Component({
  components: {
    Network,
     GChart,
  },
})
export default class Item extends Vue {

  chartOptions : any =  {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
    }

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
      text: 'label', value: 'label'
    },
    {
      text: 'date', value: 'date'
    },
  ]

  async asyncData({ payload, app, $axios }: any) {
    if (payload) {
      return { item: payload }
    } else {

      const response = await $axios.$get(
        process.env.BASE_URL + '/data/index.json'
      )
      const items = response

      return { items/*, docs*/ }
    }
  }

  created(){
    const years = {}
    const items = (this as any).items
    let minYear = 2000
    let maxYear = 0

    let map = {}

    for (const item of items) {
      if(!item.date){
        continue
      }

      const year = Number(item.date[0].split("-")[0])

      if (year > maxYear) {
        maxYear = year
      }
      if (year < minYear) {
        minYear = year
      }

      if(!map[year]){
        map[year] = 0
      }
      map[year] += 1
    }

    minYear -= 5
    maxYear += 5
    
    for (let i = minYear; i < maxYear; i++) {
      years[i] = {}
    }

    const data = [['Year', 'Appearances']]

    for (const year in years) {
      let freq = 0
      if (map[year]) {
        freq = map[year]
      }

      data.push([year + '', freq])
    }

    this.chartData = data
  }

  baseUrl: any = process.env.BASE_URL

  

  
}
</script>
