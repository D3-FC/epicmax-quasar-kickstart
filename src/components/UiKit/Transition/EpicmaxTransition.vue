<template>
  <transition
    :name="nameProxy"
    :mode="mode"
    @afterLeave="$emit('afterLeave')"
  >
    <slot/>
  </transition>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
@Component
export default class EpicmaxTransition extends Vue {
  @Prop({ default: 150 }) duration !: number
  @Prop({
    type: String,
    validator (v) {
      return [
        undefined,
        'overlap-left',
        'overlap-right',
        'fade'
      ].indexOf(v) >= 0
    }
  }) name ?: string

  get nameProxy () {
    return this.name
  }

  get isSwipe () {
    return this.nameProxy === 'overlap-left' || this.nameProxy === 'overlap-right'
  }

  get mode () {
    return this.isSwipe ? undefined : 'out-in'
  }
}
</script>

<style lang="scss">

.overlap-right-leave-active {
  z-index: -1;
  opacity: 1;
  transform: translate(100%, 0);
}

.overlap-right-enter {
  transform: translate(-100%, 0);
}

.overlap-left-leave-active {
  z-index: -1;
  opacity: 1;
  transform: translate(-100%, 0);
}

.overlap-left-enter {
  transform: translate(90%, 0);
}

.overlap-left-enter-active,
.overlap-right-enter-active,
.overlap-left-leave-active,
.overlap-right-leave-active {
  width: 100%;
  position: absolute;
  transition: transform 0.3s, opacity 0.3s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
