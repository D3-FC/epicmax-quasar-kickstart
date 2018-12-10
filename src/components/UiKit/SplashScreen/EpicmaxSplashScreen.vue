<template>
  <q-layout class="epicmax-splash-screen">
    <q-page-container>
      <q-page class="flex flex-center">
        <slot/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EpicmaxSplashScreen extends Vue {

}
</script>

<style lang="scss">
.epicmax-splash-screen {
  img {
    max-width: 80%;
  }
}
</style>
