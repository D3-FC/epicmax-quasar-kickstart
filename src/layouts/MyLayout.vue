<template>
  <q-layout
    view="lHh Lpr lFf"
  >
    <q-layout-header>
      <router-view
        name="header"
      />
    </q-layout-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  components: {},
  methods: {
    openURL
  }
}
</script>
