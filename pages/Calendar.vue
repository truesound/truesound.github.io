<template>
  <v-sheet>
    <div v-touch="{left: () => swipe('Left'), right: () => swipe('right')}" class="lighten-2">
      {{ swipeDirection }}
    </div>

    <v-calendar
      v-touch="{left: () => swipe('Left'), right: () => swipe('right')}"
      ref="calendar"
      :events="events"
      :event-ripple="false"
      :event-more="false"
      locale="ko"
      :day-format="dayFormat"
      :month-format="monthFormat"
      :type="type"
    />

    <v-btn @click="showWeek">클릭!</v-btn>
    <v-btn @click="moveCalendar">클릭!</v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      swipeDirection: 'None',
      type: 'month',
      events: [
        {
          name: `+2000000000`,
          start: '2022-12-21',
          color: 'default',
        },
        {
          name: `-2000000000`,
          start: '2022-12-21',
          color: 'default',
        }
      ]
    }
  },
  methods: {
    swipe(direction) {
      this.swipeDirection = direction;
    },
    dayFormat(val) {
      if (val.day === 1) return val.day
      return val.day
    },
    monthFormat() {
      return '';
    },
    showWeek() {
      if (this.type === 'custom-weekly') this.type = 'month';
      else this.type = 'custom-weekly';
    },
    moveCalendar() {
      this.$refs.calendar.move('2022-12-10')
    }
  }
}
</script>

<style lang="sass">
.fadeMonth-enter
  height: 0
.fadeMonth-enter-active
  height: 122px
  transition: height .35s ease-out

.v-calendar-daily .v-calendar-daily__body
  display: none
v-calendar-monthly
  overflow: hidden
</style>
