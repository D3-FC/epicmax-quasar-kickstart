<template>
  <div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { BusKey, HandleError, NotifyErrorKey } from '../../AppKeys'

@Component
export default class EpicmaxGate extends Vue {
  @Provide(BusKey) bus = this.$eventBust
}
</script>
