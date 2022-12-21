<template>
  <div>
    <v-sheet :class="$style.calendarBox">
      <div v-touch="{left: () => swipe('Left'), right: () => swipe('right')}" class="lighten-2">
        {{ swipeDirection }}
      </div>

      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>

      <v-sheet height="300">
        <v-calendar
          ref="calendar"
          v-touch="{left: () => swipe('left'), right: () => swipe('right')}"
          v-model="value"
          :show-month-on-first="false"
          locale="ko"
          :type="type"
          :day-format="dayFormat"
          :events="events"
          :event-ripple="false"
          :event-more="false"
          @change="onChange"
          @click:date="showDay"
        ></v-calendar>
      </v-sheet>

      <v-btn @click="showWeek">전환</v-btn>
      <v-btn @click="prev">이전</v-btn>
      <v-btn @click="next">다음</v-btn>
      <v-btn @click="setToday">오늘</v-btn>
    </v-sheet>

    <v-card :class="$style.underCard">
      <v-list data-date="2022-12-21">
        <v-list-item-title> 12월 21일</v-list-item-title>
        <v-list-item-content>
          <h3>현대오일뱅크</h3>
          <p>30,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
        <v-list-item-content>
          <h3>CGV</h3>
          <p>36,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
        <v-list-item-content>
          <h3>CGV 매점</h3>
          <p>9,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
        <v-list-item-content>
          <h3>아이파크몰</h3>
          <p>9,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
        <v-list-item-content>
          <h3>아이파크몰</h3>
          <p>3,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
      </v-list>

      <v-list data-date="2022-12-15">
        <v-list-item-title> 12월 15일</v-list-item-title>
        <v-list-item-content>
          <h3>Vive</h3>
          <p>1,200원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
        <v-list-item-content>
          <h3>스팀 코리아</h3>
          <p>236,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
      </v-list>
      <v-list data-date="2022-12-01">
        <v-list-item-title> 12월 1일</v-list-item-title>
        <v-list-item-content>
          <h3>인프런 - zymcoding</h3>
          <p>46,200원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
        <v-list-item-content>
          <h3>굴국밥</h3>
          <p>10,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
        <v-list-item-content>
          <h3>풀바셋</h3>
          <p>5,000원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      arrangePoint: [],
      settingPoint: [],
      swipeDirection: 'None',
      type: 'month',
      value: '',
      focus: '',
      events: [
        {
          name: `+2000000000`,
          start: '2022-11-11',
          color: 'default',
        },
        {
          name: `-2000000000`,
          start: '2022-12-1',
          color: 'default',
        },
        {
          name: `-2000000000`,
          start: '2022-12-15',
          color: 'default',
        },
        {
          name: `-2000000000`,
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
  mounted() {
    this.$refs.calendar.$refs.events.forEach(e => {
      const parentEl = e.closest('.v-calendar-weekly__day');
      if (!parentEl.classList.contains('filled')) {
        parentEl.classList.add('filled')
      }
    });
    document.querySelectorAll(`.v-list[data-date]`).forEach(el => {
      this.arrangePoint.push(el.offsetTop - 360);
      this.settingPoint.push(el.getAttribute('data-date'));
    })
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // const attachPoint = [];
      // this.$data.events.forEach(data => {
      //   const topValue = document.querySelector(`.v-list[data-date="${data.start}"]`)?.getBoundingClientRect()?.height - 480;
      //   attachPoint.push(topValue);
      // })
      // console.log(attachPoint)
      this.arrangePoint.forEach((point, idx) => {
        if (window.scrollY >= point && idx === 0) {
          // this.$refs.calendar.move(this.settingPoint[idx]);
          console.log(this.settingPoint[idx])
          this.focus = this.settingPoint[idx];
        } else if (window.scrollY >= point && idx !== 0 && window.scrollY < this.arrangePoint[idx + 1]) {
          // console.log(this.settingPoint[idx])
          console.log(idx)
          // this.focus = this.settingPoint[idx];
        }
      });
    },
    swipe(direction) {
      this.swipeDirection = direction;
    },
    dayFormat(val) {
      if (val.day === 1) return val.day
      return val.day
    },
    showWeek() {
      if (this.type === 'week') this.type = 'month';
      else this.type = 'week';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next(e) {
      console.log(e)
      this.$refs.calendar.next();
    },
    setToday () {
      this.focus = ''
    },
    onChange() {
      console.log('onChange')
    },
    showDay(e, a) {
      // console.log('showDay', e, a);
      // console.log(e.date)
      if (a.target.closest('.v-calendar-weekly__day').classList.contains('filled')) {
        const topValue = document.querySelector(`.v-list[data-date="${e.date}"]`).offsetTop - 340;
        // console.log(topValue)
        // this.$vuetify.goTo(`.v-list[data-date="${e.date}"]`)
        this.$vuetify.goTo(topValue);
        // console.log(document.querySelector(`.v-list[data-date="${e.date}"]`))
      }
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

<style lang="sass" module>
.calendarBox
  position: fixed
  left: 0
  right: 0
  z-index: 10
  background-color: #fff
.underCard
  padding-top: 400px
</style>
