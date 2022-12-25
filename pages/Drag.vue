<template>
  <div class="row">
    <div class="col-6">
      <draggable
        :list="list"
        class="list-group"
        draggable=".item"
        group="a"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group tag="div" type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="list-group-item item"
            v-for="element in list"
            :key="element.name"
          >
              {{ element.name }}
              <i>여기</i>
          </div>
        </transition-group>
      </draggable>
    </div>

    <div class="col-6">
      <draggable
        :list="list2"
        class="list-group"
        draggable=".item"
        group="a"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group tag="div" type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="list-group-item item"
            v-for="element in list2"
            :key="element.name"
          >
              {{ element.name }}
              <i class="item">여기</i>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "Drag",
  components: {
    draggable,
  },
  data() {
    return {
      list: [
        { name: "John 1", id: 0 },
        { name: "Joao 2", id: 1 },
        { name: "Jean 3", id: 2 }
      ],
      list2: [{ name: "Jonny 4", id: 3 }, { name: "Guisepe 5", id: 4 }],
      drag: false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  }
}
</script>

<style lang="scss">
.v-main {
  overflow: hidden;
}
.list-group > div {
  min-height: 200px;
}
.list-group-item {
  min-height: 50px;
  background-color: #345fec;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.item-box {
  min-height: 200px;
  background-color: #345fec;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
