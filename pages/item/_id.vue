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
    <template>
      <v-row>
        <v-col cols="12" md="6">
          <div class="pa-4" v-html="$utils.convTei2Html(item.xml[0])"></div>
        </v-col>
        <v-col cols="12" md="6">
          <div style="background-color: #f5f5f5" v-if="iframeUrl">
            <v-container class="py-0" style="height: 450px">
              <iframe
                :src="iframeUrl"
                width="100%"
                height="450"
                allowfullscreen
                frameborder="0"
              ></iframe>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </template>

    <!--
    <v-sheet class="py-2" color="grey lighten-3">
      <v-container>
        <h2>{{ label }}</h2>
      </v-container>
    </v-sheet>
    -->
    <v-container class="mt-5">
      <h1 class="mb-5">
        {{ title }}
      </h1>

      <div class="text-right mb-5">
        <v-btn
          target="_blank"
          rounded
          color="primary darken-2"
          dark
          :href="teiUrl"
          >テキストデータをみる
          <v-icon class="ml-2">mdi-open-in-new</v-icon></v-btn
        >
      </div>

      <p class="text-center">
        <!--
        <v-btn icon class="ma-1" target="_blank" :href="teiUrl"
          ><img :src="baseUrl + '/img/icons/TEIlogo.svg'" width="30px"
        /></v-btn>
        -->

        <v-btn icon class="ma-1" target="_blank" :href="rdfUrl" v-if="isRdf"
          ><img :src="baseUrl + '/img/icons/rdf-logo.svg'" width="24px"
        /></v-btn>

        <v-btn
          v-if="viewerUrl"
          icon
          class="ma-1"
          target="_blank"
          :href="viewerUrl"
          ><img :src="baseUrl + '/img/icons/icp-logo.svg'" width="24px"
        /></v-btn>

        <v-btn
          icon
          class="ma-1"
          target="_blank"
          :href="baseUrl + '/data/item/' + $route.params.id + '.json'"
          ><img :src="baseUrl + '/img/icons/json-logo.svg'" width="24px"
        /></v-btn>

        <span class="mx-2"></span>

        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn class="ma-1" color="primary" depressed icon v-on="on">
              <v-icon>mdi-comment-quote-outline</v-icon>
            </v-btn>
          </template>
          <v-card flat width="400px">
            <div class="pt-4 px-4">
              <h4 class="mb-2">{{ $t('citation') }}</h4>
              <p>{{ myText }}</p>
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn rounded color="primary" @click="writeToClipboard()">
                {{ $t('citation_copy') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <ResultOption
          class="ma-1"
          :item="{
            label: title,
            url: url,
          }"
        />
      </p>

      <v-simple-table class="mt-10">
        <template #default>
          <tbody>
            <tr v-if="false">
              <td class="py-4">
                <v-row>
                  <v-col cols="12" sm="3">{{ $t('description') }}</v-col>
                  <v-col
                    cols="12"
                    sm="9"
                    v-html="$utils.formatArrayValue(item.description, '<br />')"
                  ></v-col>
                </v-row>
              </td>
            </tr>
            <template v-for="(agg, key) in aggs">
              <tr
                v-if="
                  !hide[agg.value] &&
                  item[agg.value] &&
                  item[agg.value].length > 0 &&
                  agg.type !== 'html'
                "
                :key="key"
              >
                <td class="py-4">
                  <v-row>
                    <v-col cols="12" sm="3">{{ $t(agg.label) }}</v-col>
                    <v-col cols="12" sm="9">
                      <span
                        v-for="(value, key2) in item[agg.value]"
                        :key="key2"
                      >
                        <template v-if="agg.type === 'text'">
                          {{ value }}
                        </template>
                        <template v-else-if="agg.type === 'link'">
                          <a :href="value" target="_blank">{{ value }}</a>
                        </template>
                        <template v-else-if="agg.type === 'html'">
                          <span v-html="$utils.convTei2Html(value)" />
                        </template>
                        <template v-else>
                          <nuxt-link
                            :to="
                              localePath({
                                name: 'search',
                                query: getQuery(agg.value, value),
                              })
                            "
                            >{{ value }}</nuxt-link
                          >
                        </template>
                        <template
                          v-if="
                            [/*'spatial', */ 'agential'].includes(agg.value)
                          "
                        >
                          <nuxt-link
                            class="ml-2"
                            :to="
                              localePath({
                                name: 'people-id',
                                params: { id: value },
                              })
                            "
                          >
                            <v-icon>{{
                              agg.value === 'agential'
                                ? 'mdi-account'
                                : 'mdi-map'
                            }}</v-icon>
                          </nuxt-link>
                        </template>
                        <br v-if="key2 !== item[agg.value].length - 1" />
                      </span>
                    </v-col>
                  </v-row>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>

    <v-sheet
      class="text-center pa-10 mt-10"
      color="grey lighten-4"
      v-if="item.license"
    >
      <small>
        <h3 class="mb-5">{{ $t('license') }}</h3>

        <License :uri="item.license" />
      </small>
    </v-sheet>

    <v-container>
      <!-- v-show="$refs.mlt && $refs.mlt.moreLikeThisData.length > 0" -->
      <div class="mt-10">
        <MoreLikeThis ref="mlt" :item="item" />
      </div>

      <div class="mt-10">
        <SimilarImages ref="mlt2" :item="item" />
      </div>
    </v-container>

    <v-sheet class="text-center pa-10 mt-10" color="grey lighten-4">
      <small>
        <h3 class="mb-5">{{ $t('license') }}</h3>

        <template v-if="$i18n.locale == 'ja'">
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
            ><img
              alt="クリエイティブ・コモンズ・ライセンス"
              style="border-width: 0"
              src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
          ><br />この作品は<a
            rel="license"
            href="http://creativecommons.org/licenses/by/4.0/"
            >クリエイティブ・コモンズ 表示 4.0 国際 ライセンス</a
          >の下に提供されています。
        </template>
        <template v-else>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
            ><img
              alt="Creative Commons License"
              style="border-width: 0"
              src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
          ><br />This work is licensed under a
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
            >Creative Commons Attribution 4.0 International License</a
          >.
        </template>
      </small>
    </v-sheet>

    <v-sheet class="text-center pa-10 mt-10">
      <small>
        <h3 class="mb-5">{{ $t('last_updated') }}</h3>

        {{ item._updated }}
      </small>
    </v-sheet>

    <v-snackbar v-model="snackbar" color="primary" :timeout="2000">
      <div class="pa-2 text-center">
        {{ $t('copied') }}
      </div>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'
import MoreLikeThis from '~/components/item/MoreLikeThis.vue'
import SimilarImages from '~/components/item/SimilarImages.vue'
import License from '~/components/item/License.vue'
import axios from 'axios'

@Component({
  components: {
    ResultOption,
    MoreLikeThis,
    SimilarImages,
    License,
  },
})
export default class Item extends Vue {
  item: any = {}

  hide: any = process.env.hide

  isRdf: any = process.env.isRdf

  async asyncData({ payload, app, $axios }: any) {
    if (payload) {
      return { item: payload }
    } else {
      const id = app.context.params.id

      const response = await $axios.$get(
        process.env.BASE_URL + '/data/item/' + id + '.json'
      )
      const item = response

      return { item /*, docs*/ }
    }
  }

  async asyncData2({ app, $axios }: any) {
    const id = app.context.params.id.trim()

    const path = `~/static/data/item/${id}.json`

    console.log({ path })

    const response = await import(path)

    return { item: response }
  }

  baseUrl: any = process.env.BASE_URL

  snackbar: boolean = false

  // 算出 getter 関数
  get url() {
    // `this` は vm インスタンスを指します
    return this.baseUrl + this.$route.fullPath
  }

  get id() {
    return (this as any).item.objectID
  }

  get title() {
    return (this as any).item.label
  }

  get myText() {
    const siteName: any = process.env.siteName
    const footer: any = process.env.footer
    if (this.$i18n.locale === 'en') {
      const attribution = this.$t(siteName) + ' - ' + this.$t(footer)
      //const attribution = provided by${(this as any).item.attribution}
      return `"${this.title}" ${attribution} (${this.url})`
    } else {
      const attribution = siteName + ' - ' + footer
      //const attribution = 「${(this as any).item.attribution}」収録
      return `『${this.title}』${attribution} (${this.url})`
    }
  }

  get aggs() {
    const aggs = process.env.detail
    return aggs
  }

  get breadcrumbs() {
    return [
      {
        text: this.$t('index'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
        exact: true,
      },
      {
        text: this.$t('search'),
        disabled: false,
        to: this.localePath({ name: 'search' }),
        exact: true,
      },
      {
        text: this.title,
      },
    ]
  }

  get viewerUrl() {
    const manifest = (this as any).item.manifest

    if (process.env.viewer === 'curation') {
      const memberId = (this as any).item.member
      if (!memberId) {
        return ''
      }
      const spl = memberId.split('#xywh=')
      return (
        'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=' +
        manifest +
        '&canvas=' +
        encodeURIComponent(spl[0]) +
        (spl[1] ? '&xywh=' + spl[1] + '&xywh_highlight=border' : '')
      )
    } else {
      return
      ;('')
    }
    return ''
  }

  get iframeUrl() {
    const manifest = (this as any).item.manifest

    console.log({ manifest })

    if (!manifest) {
      return ''
    }

    let value = ''

    if (process.env.viewer === 'curation') {
      const memberId = (this as any).item.member
      value =
        this.baseUrl +
        '/curation/?manifest=' +
        manifest +
        '&canvas=' +
        (memberId.includes('#') ? encodeURIComponent(memberId) : memberId)
    } else {
      value =
        'https://universalviewer.io/examples/uv/uv.html#?manifest=' +
        manifest +
        '&bottomPanel=true'
    }

    return value
  }

  get rdfUrl() {
    return (
      process.env.DATA_URL +
      '/snorql/?describe=http%3A%2F%2Fexample.org%2Fdata%2F' +
      this.$route.params.id
    )
  }

  get teiUrl() {
    const id = (this as any).item.objectID
    const spl = id.split('-')
    const vol = Number(spl[0])
    const leaf = Number(spl[1])
    const hash = `${vol}_${leaf}`
    //return "https://hi-ut.github.io/iriki-viewer/item/" + 1 //vol// + "#" + hash
    return 'https://www.hi.u-tokyo.ac.jp/IRIKI/JTXT/jpn_text' + id + '.html'
  }

  getQuery(key: string, value: string) {
    const map: any = {}
    map[`main[refinementList][${key}]`] = value
    return map
  }

  writeToClipboard() {
    navigator.clipboard.writeText(this.myText).catch((e) => {
      console.error(e)
    })
    this.snackbar = true
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
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: (this as any).thumbnail,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  }
}
</script>
