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
    <v-container fluid class="my-5">
      <v-row>
        <v-col>
          <v-btn @click="zoom(0)">aaa</v-btn>
          <v-btn @click="zoom(1)">bbb</v-btn>
          </v-col>
          <v-col>
            <div id="openseadragon" style="height: 600px; width: 100%;"></div>
      </v-col>
      </v-row>

      
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

import OpenSeadragon from 'openseadragon';
import * as Annotorious from '@recogito/annotorious-openseadragon';

import '@recogito/annotorious-openseadragon/dist/annotorious.min.css';

var HelloWorldPlugin = function(args) {

  var createButton = function(value) {
    var button = document.createElement('button');

    if (value == currentColorValue)
      button.className = 'selected';

    button.dataset.tag = value;
    button.style.backgroundColor = value;
    button.addEventListener('click', addTag); 
    return button;
  }

  var createTag = function(value) {
    var button = document.createElement('span');
    button.className = "badge badge-secondary mx-1 pa-2";
    button.innerHTML = value
    return button;
  }

  var container = document.createElement('div');
  container.className = 'pa-2';

  var textContainer = document.createElement('div');
  textContainer.className = 'mt-2';
  container.appendChild(textContainer)

  var tagContainer = document.createElement('div');
  tagContainer.className = 'mt-2';
  container.appendChild(tagContainer)

  args.annotation.body.map((body) => {
    if(body.purpose == "tagging"){
      tagContainer.appendChild(createTag(body.value));
    } else {
      textContainer.appendChild(createElementFromHTML(body.value));
    }
  })

  return container;
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild; 
}

//let viewer = null;
//var anno = null;

export default {
  components: {},
  data() {
    return {
      viewer : null,
      anno : null,
      bh: [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('osd'),
        },
      ]
    }
  },

  mounted(){
    const viewer = OpenSeadragon({
      id: "openseadragon",
      prefixUrl: "https://recogito.github.io/js/openseadragon/images/",
      tileSources: {
        type: "image",
        url: "https://recogito.github.io/images/1280px-Hallstatt.jpg"
      }
    });

    this.viewer = viewer

    //locale: 'auto', 

    const config = {readOnly: true,
              widgets: [HelloWorldPlugin]}; // Optional plugin config options

    const anno = Annotorious(viewer, config);
    this.anno = anno

    var a = [{ 
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "#a88b22d0-6106-4872-9435-c78b5e89fede",
      "type": "Annotation",
      "body": [{
        "type": "TextualBody",
        "value": "It's Hallstatt in Upper Austria"
      }],
      "target": {
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": "xywh=pixel:270,120,90,170"
        }
      }
    }, { 
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "#07475897-d2eb-4dce-aa12-ecb50771c734",
      "type": "Annotation",
      "body": [{
        "type": "TextualBody",
        "value": "<div><a href='#'>bbb</a> yahhhhhhhhhhh !!!</div>"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church2"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church3"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church4"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church"
      },{
        "type": "TextualBody",
        "purpose": "tagging",
        "value": "Church"
      }],
      "target": {
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": "xywh=540,240,180,340"
        }
        }
      }]
    anno.setAnnotations(a);
  },

  methods: {
    zoom(index) {
      if(index === 0){
        this.anno.fitBounds("#a88b22d0-6106-4872-9435-c78b5e89fede")
      } else {
        this.anno.fitBounds("#07475897-d2eb-4dce-aa12-ecb50771c734")
      }
    }
  },

  
  head() {
    return {
      title: this.$t('osd'),
    }
  },
}
</script>
<style>
.badge-secondary {
    color: #fff;
    background-color: #6c757d;
}
.badge {
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>