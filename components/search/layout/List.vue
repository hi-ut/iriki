<template>
  <div>
    <v-row v-for="item in items" :key="item.objectID">
      <v-col cols="12" sm="3">
        <nuxt-link
          :to="
            localePath({
              name: 'item-id',
              params: { id: item.objectID },
            })
          "
        >
          <!-- query, -->
          <v-img
            contain
            max-height="150"
            style="height: 150px"
            width="100%"
            class="grey lighten-2"
            :src="item.thumbnail"
          /> </nuxt-link
      ></v-col>
      <v-col cols="12" sm="9">
        <h3>
          <nuxt-link
            :to="
              localePath({
                name: 'item-id',
                params: { id: item.objectID },
              })
            "
            v-html="$searchUtils.highlightRelation(item.label, q)"
          ></nuxt-link>
        </h3>

        <div class="my-2">
          <small>
            <template v-for="(metadataValue, key) in metadataList">
              <template
                v-if="!metadataValue.text && hasValue(item[metadataValue.id])"
              >
                <template>
                  <span :key="key">
                    <b>{{ metadataValue.label }}: </b>
                    <template v-if="metadataValue.highlight">
                      <span v-html="highlight(item[metadataValue.id])"></span>
                    </template>
                    <template v-else>
                      <span>{{
                        $utils.formatArrayValue(item[metadataValue.id])
                      }}</span>
                    </template>
                  </span>
                </template>
              </template>
            </template>
          </small>
        </div>

        <div>
          <template v-for="(metadataValue, key) in metadataList">
            <template v-if="metadataValue.text">
              <span v-html="trim(highlight(item[metadataValue.id]))"></span>
            </template>
          </template>
        </div>

        <div class="text-right">
          <ResultOption
            :item="{
              label: item.label,
              url: localePath({
                name: 'item-id',
                params: { id: item.objectID },
              }),
            }"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'

import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
  },
})
export default class FullTextSearch extends Vue {
  @Prop({})
  items!: any[]

  @Prop({})
  q!: any

  metadataList: any = process.env.list

  highlight(value: any) {
    value = this.$utils.formatArrayValue(value)
    const q: any = this.$route.query['main[query]']
    value = this.$searchUtils.highlightRelation(value, q)
    return value
  }

  hasValue(value: any) {
    return value && value.length > 0
  }

  trim(value: string) {
    const thres = 200
    if (value.length > thres) {
      return value.substring(0, thres) + ' ...'
    } else {
      return value
    }
  }
}
</script>
