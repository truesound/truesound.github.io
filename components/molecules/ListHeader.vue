<template>
  <div :class="$style.listHeader">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ListHeader.vue"
}
</script>

<style lang="scss" module>
@import './ListHeader.scss';
</style>
