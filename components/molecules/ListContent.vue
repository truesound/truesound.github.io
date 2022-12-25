<template>
  <div :class="$style.listContent">
    <div v-if="$slots.top" :class="$style.top">
      <slot name="top"></slot>
    </div>
    <div :class="$style.middle">
      <slot></slot>
    </div>
    <div v-if="$slots.tail" :class="$style.tail">
      <slot name="tail"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListContent"
}
</script>

<style lang="scss" module>
@import './ListContent.scss';
</style>
