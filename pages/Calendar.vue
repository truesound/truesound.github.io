<template>
  <v-sheet>
    <div v-touch="{left: () => swipe('left')}"></div>
  </v-sheet>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {

    }
  },
  methods: {
    swipe(direction) {
      this.swipeDirection = direction;
    }
  }
}
</script>
