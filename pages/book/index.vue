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
    <v-container class="my-5">
      <h2 class="mb-10">{{title}}</h2>

      <h3 class="mb-5">冊子画像一覧</h3>

      
      <ul class="mb-10">
        <li class="mb-2" v-for="(item, key) in items[0]" :key="key">
          <a :href="item.value">{{item.label}}</a>
          </li>
      </ul>

      <h3 class="mb-2">{{"画像からみる"}}</h3>

      <p class="mb-5">ビューア左部の「Layers」タブを利用することにより、グリッド画像を重ねて表示できます。</p>

      <ul class="mb-5">
        <li class="mb-2" v-for="(item, key) in items[1]" :key="key">
          <a :href="item.value">{{item.label}}</a>
          </li>
      </ul>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  components: {},
  data() {
    return {

      title: this.$t('冊子画像'),

      bh: [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('冊子画像'),
        },
      ],

      items: [
        [
        {
          "value" : "https://www.kanzaki.com/works/2016/pub/image-annotator?u=https://static.toyobunko-lab.jp/suikeichuzu_data/iiif/collection/sjzt.json",
          "label" : "IIIFコレクション"
        }
        ],
        [
        {
          "value" : "https://static.toyobunko-lab.jp/suikeichuzu_data/mirador/?manifest=https://static.toyobunko-lab.jp/suikeichuzu_data/iiif/main/manifest_anno.json",
          "label" : "本図"
        },
        {
          "value" : "https://static.toyobunko-lab.jp/suikeichuzu_data/mirador/?manifest=https://static.toyobunko-lab.jp/suikeichuzu_data/iiif/etsunan/manifest_anno.json",
          "label" : "越南"
        },
        {
          "value" : "https://static.toyobunko-lab.jp/suikeichuzu_data/mirador/?manifest=https://static.toyobunko-lab.jp/suikeichuzu_data/iiif/saiiki/manifest_anno.json",
          "label" : "西域"
        }
        ]
      ]
    }
  },
  
  head() {
    return {
      title: this.$t("冊子画像"),
    }
  },
}
</script>
