<template>
  <div>
    <v-sheet ref="calendarBox" :class="$style.calendarBox">
      <div v-touch="{left: () => swipe('Left'), right: () => swipe('right')}" class="lighten-2">
        {{ swipeDirection }}
      </div>

<!--      <v-toolbar-title v-if="$refs.calendar">-->
<!--        {{ $refs.calendar.title }}-->
<!--      </v-toolbar-title>-->

      <div :calss="$style.calendarContainer">
        <v-calendar
          ref="calendar"
          v-model="value"
          v-touch="{left: () => swipe('left'), right: () => swipe('right')}"
          :show-month-on-first="false"
          locale="ko"
          :type="type"
          :day-format="dayFormat"
          :events="events"
          :event-ripple="false"
          :event-more="false"
          interval-width="0"
          color="primary"
          @change="onChange"
          @click:date="showDay"
        ></v-calendar>
      </div>

      <v-btn depressed @click="showWeek">전환</v-btn>
      <v-btn depressed @click="prev">이전</v-btn>
      <v-btn depressed @click="next">다음</v-btn>
      <v-btn depressed @click="setToday">오늘</v-btn>
      <v-btn depressed @click="setGo('2022-11-21')">11월 21일</v-btn>
    </v-sheet>

    <v-card ref="calendarList" :class="[$style.calendarList, { [$style.isRolled]: type === 'week'}]">
      <v-list data-date="2022-12-25">
        <v-list-item-title> 12월 25일</v-list-item-title>
        <v-list-item-content>
          <h3>An's Bakery</h3>
          <p>73,460원</p>
          <span>일시불</span>
          <p></p>
        </v-list-item-content>
      </v-list>
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
let lastScrollY = 0;

export default {
  name: "Calendar",
  data() {
    return {
      calendarEl: null,
      calendarListEl: null,
      calendarMonth: 0,
      DETECT_TIME: 200,
      // changedHeight: 0, // calendar 높이값
      atListOffsetTop: [], // list의 offsetTop
      atListDataDate: [], // list의 data-date
      atScrollPoint: 0, //
      viewportHeight: 0, // viewport Height
      boxHeight: 0, // calendarBox Height
      // detectBar: 0, // 감지 선
      swipeDirection: 'None',
      type: 'week',
      value: '',
      events: [
        {
          name: `-73000`,
          start: '2022-12-25',
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
        },
        {
          name: `-2000000000`,
          start: '2022-12-15',
          color: 'default',
        },
        {
          name: `-2000000000`,
          start: '2022-12-1',
          color: 'default',
        },
        // {
        //   name: `+2000000000`,
        //   start: '2022-11-11',
        //   color: 'default',
        // },
      ]
    }
  },
  watch: {
    // 전환
    type: function(val, oldVal) {
      if (val !== oldVal) {
        // data가 없으면 취소
        if (!this.$refs.calendar.$refs.events[this.$refs.calendar.$refs.events.length - 1]) return;
        // 첫 번째 리스트에 맞게 날짜에 표시
      }
      this.$nextTick(() => {
        this.atListOffsetTop = [];
        this.atListDataDate = [];
        this.$refs.calendarList.$el.querySelectorAll(`.v-list[data-date]`).forEach(el => {
          this.atListOffsetTop.push(el.offsetTop); // 24는 margin-top 음수로 확인한 오차값, 상단에 딱 들어맞게 찾음
          this.atListDataDate.push(el.getAttribute('data-date'));
        });
        console.log(this.atListOffsetTop); // element의 offsetTop 위치값 지정
        console.log(this.atListDataDate)  // element에 지정된 data-date value 값에 지정해 줄 예정

        if (val === 'month') this.$refs.calendar.$refs.events[this.$refs.calendar.$refs.events.length - 1]?.closest('.v-calendar-weekly__day')?.classList.add(this.$style.active);
        if (val === 'week') this.$refs.calendar.$refs.events[this.$refs.calendar.$refs.events.length - 1]?.closest('.v-calendar-daily_head-day')?.classList.add(this.$style.active);
      });
    }
  },
  mounted() {
    this.calendarEl = this.$refs.calendar.$el;
    this.calendarListEl = this.$refs.calendarList.$el;
    // this.changedHeight = this.$refs.calendarBox.$el.clientHeight;
    // 첫 번째 리스트에 맞게 날짜에 표시
    if (this.type === 'month') {
      this.$refs.calendar.$refs.events[this.$refs.calendar.$refs.events.length - 1].closest('.v-calendar-weekly__day').classList.add(this.$style.active);

      // 각 날짜별 데이터 들어 있는지 구분
      this.$refs.calendar.$refs.events.forEach(e => {
        const parentEl = e.closest('.v-calendar-weekly__day');
        if (!parentEl.classList.contains('filled')) {
          parentEl.classList.add('filled')
        }
      });
    }
    if (this.type === 'week') {
      this.$refs.calendar.$refs.events[this.$refs.calendar.$refs.events.length - 1].closest('.v-calendar-daily_head-day')?.classList.add(this.$style.active);

      // 각 날짜별 데이터 들어 있는지 구분
      this.$refs.calendar.$refs.events.forEach(e => {
        const parentEl = e.closest('.v-calendar-daily_head-day');
        if (!parentEl.classList.contains('filled')) {
          parentEl.classList.add('filled')
        }
      });
    }

    this.boxHeight = this.$refs.calendarBox.$el.clientHeight;
    this.viewportHeight = document.documentElement.clientHeight;

    // 감지선 지정
    // this.detectBar = this.$refs.calendar.$el.offsetHeight;

    // 각 list에 표시된 날짜별 해당 위치와 data-date 형식 지정
    // arragePoint = offsetTop 값
    // settingPoint = date-date 값
    this.$refs.calendarList.$el.querySelectorAll(`.v-list[data-date]`).forEach(el => {
      this.atListOffsetTop.push(el.offsetTop); // 24는 margin-top 음수로 확인한 오차값, 상단에 딱 들어맞게 찾음
      this.atListDataDate.push(el.getAttribute('data-date'));
    });
    console.log(this.atListOffsetTop); // element의 offsetTop 위치값 지정
    console.log(this.atListDataDate);  // element에 지정된 data-date value 값에 지정해 줄 예정
    this.value = this.atListDataDate[0];
    window.addEventListener('scroll', this.handleScroll);
  },
  updated() {
    this.calendarEl = this.$refs.calendar.$el;
    this.calendarListEl = this.$refs.calendarList.$el;
    this.boxHeight = this.$refs.calendarBox.$el.clientHeight

    if (this.type === 'month') {
      // 각 날짜별 데이터 들어 있는지 구분
      this.$refs.calendar.$refs.events.forEach(e => {
        const parentEl = e.closest('.v-calendar-weekly__day');
        if (!parentEl.classList.contains('filled')) {
          parentEl.classList.add('filled')
        }
      });
      setTimeout(() => {
        this.$refs.calendar.$el.querySelectorAll('.filled')?.forEach((el, idx) => {
          if (el.classList.contains(this.$style.active)) {
            el.classList.remove(this.$style.active);
          }
          if(parseInt(el.querySelector('.v-btn__content').innerText) === parseInt(this.atListDataDate[this.atScrollPoint].substring(this.atListDataDate[this.atScrollPoint].length - 2))) {
            el.classList.add(this.$style.active);
          }
        });
      }, this.DETECT_TIME);
    }
    if (this.type === 'week') {
      // console.log(this.atScrollPoint)
      // 각 날짜별 데이터 들어 있는지 구분
      this.$refs.calendar.$refs.events.forEach(e => {
        const parentEl = e.closest('.v-calendar-daily_head-day');
        if (!parentEl.classList.contains('filled')) {
          parentEl.classList.add('filled')
        }
      });
    }
  },
  methods: {
    handleScroll(e) {
      // 위 아래 스크롤 구분
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = scrollY;

      if (direction === 'down') {
        console.log('dowining = ', this.atListOffsetTop[this.atScrollPoint]);
        if (window.scrollY + this.boxHeight > this.atListOffsetTop[this.atScrollPoint]) {
          // 스크롤 되는 값과 페이지 높이 (뷰포트 - application top) 여기서는 734 를 더했을 때
          // offset값보다 커지면 진입했다고 봄
          if (window.scrollY + this.viewportHeight - this.$vuetify.application.top > this.atListOffsetTop[this.atScrollPoint + 1] ) {
            // 여기서 실행
            this.value = this.atListDataDate[this.atScrollPoint + 1];
            console.log('checked', this.value);
            setTimeout(() => {
              this.calendarEl.querySelectorAll('.filled').forEach(el => {
                if (el.classList.contains(this.$style.active)) {
                  el.classList.remove(this.$style.active);
                }
                if (parseInt(el.querySelector('.v-btn__content').innerText) === parseInt(this.value.substring(this.value.length - 2))) {
                  el.classList.add(this.$style.active);
                }
              });
            }, this.DETECT_TIME);
            this.atScrollPoint++;
            console.log('downed = ', this.atScrollPoint);
          }
        }
        // 스크롤이 제일 하단에 도달했을 때
        if (this.viewportHeight - this.$vuetify.application.top + scrollY >= this.calendarListEl.clientHeight) {
          this.value = this.atListDataDate[this.atListDataDate.length - 1];
          setTimeout(() => {
            this.calendarEl.querySelectorAll('.filled').forEach(el => {
              if (el.classList.contains(this.$style.active)) {
                el.classList.remove(this.$style.active);
              }
              if (parseInt(el.querySelector('.v-btn__content').innerText) === parseInt(this.value.substring(this.value.length - 2))) {
                el.classList.add(this.$style.active);
              }
            });
          }, this.DETECT_TIME);
          this.atScrollPoint = this.atListOffsetTop.length - 1;
        }
      }


      if (direction === 'up') {
        console.log('upping', this.atScrollPoint);
        let offsetTop;
        this.atListOffsetTop[this.atScrollPoint - 1] ? offsetTop = this.atListOffsetTop[this.atScrollPoint - 1] : offsetTop = this.atListOffsetTop[0];
        if (window.scrollY + this.boxHeight <= offsetTop) {
          // 여기서 실행
          this.value = this.atListDataDate[this.atScrollPoint - 1];
          if (!this.value) this.value = this.atListDataDate[0];
          console.log('checked', this.value);
          setTimeout(() => {
            this.calendarEl.querySelectorAll('.filled').forEach(el => {
              if (el.classList.contains(this.$style.active)) {
                el.classList.remove(this.$style.active);
              }
              if (parseInt(el.querySelector('.v-btn__content').innerText) === parseInt(this.value.substring(this.value.length - 2))) {
                el.classList.add(this.$style.active);
              }
            });
          }, this.DETECT_TIME);
          this.atScrollPoint--;
          if (this.atScrollPoint < 0) this.atScrollPoint = 0;
          console.log('upped', this.atScrollPoint);

          // 스크롤 되는 값과 페이지 높이 (뷰포트 - application top) 여기서는 734 를 더했을 때
          // offset값보다 작아지면 사라졌다고 봄
          // 현재 내용이 사라지고
          // if (window.scrollY + this.viewportHeight - this.$vuetify.application.top < this.atListOffsetTop[this.atScrollPoint] ) {

          // }
        }
        if (window.scrollY <= 0) {
          this.value = this.atListDataDate[0];
          setTimeout(() => {
            this.calendarEl.querySelectorAll('.filled').forEach(el => {
              if (el.classList.contains(this.$style.active)) {
                el.classList.remove(this.$style.active);
              }
              if (parseInt(el.querySelector('.v-btn__content').innerText) === parseInt(this.value.substring(this.value.length - 2))) {
                el.classList.add(this.$style.active);
              }
            });
          }, this.DETECT_TIME);
          this.atScrollPoint = 0;
        }
      }
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
    next() {
      this.$refs.calendar.next();
    },
    setToday () {
      this.value = ''
    },
    onChange(val) {
      // 초기 로딩
      if (this.calendarMonth === 0) this.calendarMonth = val.start.month;
      if (this.type === 'week') {
        // 각 날짜별 데이터 들어 있는지 구분
        this.$refs.calendar.$refs.events.forEach(e => {
          const parentEl = e.closest('.v-calendar-daily_head-day');
          if (!parentEl) return;
          if (!parentEl.classList.contains('filled')) {
            parentEl.classList.add('filled')
          }
        });
      }

      // 이전, 다음 등 전환 로딩
      if (this.calendarMonth !== 0) {
        if (this.type === 'week') return;
      }
      console.log('onChange', val);
    },
    showDay(e, a) {
      // console.log('showDay', e, a);
      // console.log(e.date);
      let res;
      this.atListDataDate.forEach((val, idx) => {
        if (e.date === val) res = idx;
      });
      window.scrollTo({top: this.atListOffsetTop[res] - this.boxHeight, behavior: 'smooth'}) ;

      const target = a.target.closest('.v-calendar-weekly__day') || a.target.closest('.v-calendar-daily_head-day');

      if (!target) return;
      if (target.classList.contains('filled')) {
        this.type = 'week';

        // const topValue = document.querySelector(`.v-list[data-date="${e.date}"]`).offsetTop - 140;  // 접힌 캘린더 높이
        // console.log(topValue)
        // this.$vuetify.goTo(`.v-list[data-date="${e.date}"]`)
        // this.$vuetify.goTo(topValue);
        // console.log(document.querySelector(`.v-list[data-date="${e.date}"]`))
      }
    },
    setGo(val) {
      this.value = val;
    },
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
@import './Calendar.sass'
</style>
