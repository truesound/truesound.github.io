<template>
  <component :is="tag" ref="stickyEl">
    <div v-if="$slots.stickyEl" :class="{[$style.sticky] : isSticky}">
      <slot name="stickyEl"></slot>
    </div>
    <div :class="$style.container">
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: "StickyTab",
  // directives: {
  //   upper: {
  //     update(el) {
  //       el.textContent = el.textContent.toUpperCase();
  //     }
  //   }
  // },
  data() {
    return {
      stickyPos: -1,
      isSticky: false,
      value: '',
    }
  },
  mounted() {
    this.stickyPos = this.$refs.stickyEl.offsetTop;
    window.addEventListener('scroll', this.execScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.execScroll);
  },
  methods: {
    execScroll() {
      if (window.scrollY > this.stickyPos) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    }
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<style lang="scss" module>
@import './StickyTab.scss';
</style>
