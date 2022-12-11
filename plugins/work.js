import Vue from 'vue';

const testWork = {
  inserted() {
    console.log('testWork is inserted')
  },
  bind: function(el, binding, vnode) {
    console.log(el)
  }
};

Vue.directive('test', testWork);
