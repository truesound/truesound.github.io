<template>
  <v-app>
    <div :class="$style.subHeader">
      <v-btn>뒤</v-btn>
      <h3>여기는 subHeader</h3>
    </div>
    <vue-loadmore
      :on-refresh="onRefresh"
      :on-loadmore="onLoad"
      :finished="finished"
      :error.sync="error"
      refresh-text="새로고침"
      loosing-text="놓으면 새로 고쳐줄게"
      pulling-text="아래로 내려 주세요"
      loading-text="로딩중"
      :immediate-check="true"
      success-text="성공~!"
      finished-text="자료 없음"
      error-text="에러"
      animation-duration="500"
      head-height="50"
      load-offset="0"
    >
      <v-main :class="$style.main">
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </vue-loadmore>
  </v-app>
</template>

<script>
import Vue from 'vue';
import VueLoadmore, { locale  } from 'vuejs-loadmore';

// https://github.com/staticdeng/vuejs-loadmore/blob/HEAD/README.en-US.md
Vue.use(VueLoadmore);
locale.use('en-US');

export default {
  name: "defaultNormal",
  data() {
    return {
      finished: false,
      error: false,
    }
  },
  methods: {
    onRefresh(done) {
      // console.log(123);
      setTimeout(() => {
        this.fetch();
        this.finished = true
        done();
      }, 1000);
    },
    onLoad() { // 아래 더 보기
      console.log('onLoad')
    },
    fetch() {
      console.log('load 성공!');
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .vuejs-loadmore {
    display: none
  }
}
</style>
<style lang="scss" module>
.subHeader {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  background-color: #000;
  color: #fff;
  display: flex;
  height: 54px;
}
.main {
  margin-top: 54px;
}
div[class^="vuejs-refresh-track"] {
  height: auto;
}
</style>
