<template>
  <div>
    <scrollactive :offset="tabsHeight" :duration="500" bezier-easing-value=".5,0,.35,1">
      <StickyTab>
        <template #stickyEl>
          <div ref="tabs" :class="$style.tabs">
            <v-btn href="#tab1" class="scrollactive-item">추천</v-btn>
            <v-btn href="#tab2" class="scrollactive-item">은행</v-btn>
            <v-btn href="#tab3" class="scrollactive-item">카드</v-btn>
            <v-btn href="#tab4" class="scrollactive-item">증권</v-btn>
            <v-btn href="#tab5" class="scrollactive-item">보험</v-btn>
            <v-btn href="#tab6" class="scrollactive-item">할부금융</v-btn>
          </div>
        </template>

        <div class="tabsItem">
          <div id="tab1" class="tabItem">
            <ListHeader>
              <h4>추천</h4>
              <v-checkbox v-model="chkedRecoAll" label="전체" hide-details></v-checkbox>
            </ListHeader>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>하나은행</p>
              </template>
              <template #tail>
                <v-checkbox v-model="chkedReco" value="recoHanaBank" hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>증권</span>
                <p>하나증권</p>
              </template>
              <template #tail>
                <v-checkbox v-model="chkedReco" value="recoHanaStock" hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>KB국민은행</p>
              </template>
              <template #tail>
                <v-checkbox v-model="chkedReco" value="recoKBBank" hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>보험</span>
                <p>삼성화재</p>
              </template>
              <template #tail>
                <v-checkbox v-model="chkedReco" value="recoSamsungIns" hide-details />
              </template>
            </ListContent>
          </div>
          <div id="tab2" class="tabItem">
            <ListHeader>
              <h4>은행</h4>
              <v-checkbox label="전체" hide-details></v-checkbox>
            </ListHeader>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>하나은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>증권</span>
                <p>하나증권</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>KB국민은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>보험</span>
                <p>삼성은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
          </div>
          <div id="tab3" class="tabItem">
            <ListHeader>
              <h4>카드</h4>
              <v-checkbox label="전체" hide-details></v-checkbox>
            </ListHeader>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>하나은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>증권</span>
                <p>하나증권</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>KB국민은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>보험</span>
                <p>삼성은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
          </div>
          <div class="tabItem">
            <ListHeader>
              <h4>증권</h4>
              <v-checkbox label="전체" hide-details></v-checkbox>
            </ListHeader>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>하나은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>증권</span>
                <p>하나증권</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>은행</span>
                <p>KB국민은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
            <ListContent>
              <template #top>
                <v-img src="http://placeimg.com/40/40/any" width="40" height="40"></v-img>
              </template>
              <template #default>
                <span>보험</span>
                <p>삼성은행</p>
              </template>
              <template #tail>
                <v-checkbox hide-details />
              </template>
            </ListContent>
          </div>
          <div class="tabItem">
            <div>
              보험
            </div>
          </div>
          <div class="tabItem">
            <div>
              할부금융
            </div>
          </div>
        </div>
      </StickyTab>
    </scrollactive>
  </div>
</template>

<script>
import Vue from 'vue';
import VueScrollactive from 'vue-scrollactive';
import plugin from "~/plugins/scroll";
import StickyTab from '~/components/molecules/StickyTab.vue';
import ListHeader from '~/components/molecules/ListHeader.vue';
import ListContent from '~/components/molecules/ListContent.vue';

Vue.use(VueScrollactive);

export default {
  name: "Tabs",
  components: {
    StickyTab,
    ListHeader,
    ListContent,
  },
  layout: 'defaultNormal',
  data() {
    return {
      tabsHeight: 0,
      chkedReco: []
    }
  },
  computed: {
    chkedRecoAll: {
      get() {
        return this.chkedReco.length === 4;
      },
      set(val) {
        console.log(val)
        if (val) this.chkedReco = ['recoHanaBank', 'recoHanaStock', 'recoKBBank', 'recoSamsungIns'];
        else this.chkedReco = [];
      }
    }
  },
  mounted() {
    plugin.install('실행!!!');
    this.tabsHeight = this.$refs.tabs.offsetHeight + 54;
  }
}
</script>

<style lang="scss" module>
@import 'Tabs.scss';
</style>
