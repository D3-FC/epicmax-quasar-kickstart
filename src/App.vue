<template>
  <div id="q-app">
    <epicmax-gate>
      <epicmax-transition
        name="fade"
        @afterLeave="$root.$emit('triggerScroll')"
      >
        <epicmax-splash-screen v-if="epicmax.isPending">
          <div class="flex flex-center column">
            <img
              src="./assets/epicmax_logo_long.svg"
              alt="Logo"
            >
            <h3 class="q-mt-lg">
              Welcome to kickstart app!
            </h3>
          </div>
        </epicmax-splash-screen>
        <div v-else>
          <router-view/>
        </div>
      </epicmax-transition>
    </epicmax-gate>
  </div>
</template>

<script>

import EpicmaxGate from './components/Gate/EpicmaxGate'
import EpicmaxSplashScreen from './components/UiKit/SplashScreen/EpicmaxSplashScreen'
import EpicmaxTransition from './components/UiKit/Transition/EpicmaxTransition'

export default {
  name: 'App',
  components: { EpicmaxTransition, EpicmaxSplashScreen, EpicmaxGate },
  data () {
    return {
      epicmax: this.$epicmax
    }
  },
  watch: {
    'epicmax': {
      handler (newValue, oldValue) {
        console.log(newValue)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>
