<template>
  <div :class="$style.wrapper">
    <div :class="$style.container">
      <template v-for="n in realHeight">
        <div
          :class="`${$style.terrain} ${$style[tile.terrain]}`"
          :style="`translate: 0 ${32 * (realHeight - tile.height - n + 1)}px`"
        ></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GridBlockTile",
  props: {
    tile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    realHeight() {
      return this.tile.height + 4;
    },
  },
});
</script>

<style module>
.wrapper {
  transform: rotateX(0) rotateZ(-45deg);
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  scale: 1.4142135623;
}
.terrain {
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  scale: 1 2;
  background-image: url("@/assets/terrain.png");
  background-size: 640px 1024px;
  z-index: 1;
}
.terrain.e1 {
  background-position: calc(-64px * 1) 0px;
}
.terrain.e2 {
  background-position: calc(-64px * 2) 0px;
}
.terrain.e3 {
  background-position: calc(-64px * 3) 0px;
}
.terrain.e4 {
  background-position: calc(-64px * 4) 0px;
}
.terrain.e5 {
  background-position: calc(-64px * 5) 0px;
}
.terrain.e6 {
  background-position: calc(-64px * 6) 0px;
}
.terrain.e7 {
  background-position: calc(-64px * 7) 0px;
}
.terrain.e8 {
  background-position: calc(-64px * 8) 0px;
}
.terrain.e9 {
  background-position: calc(-64px * 9) 0px;
}
.terrain.e10 {
  background-position: calc(-64px * 0) -64px;
}
.terrain.e11 {
  background-position: calc(-64px * 1) -64px;
}
.terrain.e12 {
  background-position: calc(-64px * 2) -64px;
}
.terrain.e13 {
  background-position: calc(-64px * 3) -64px;
}
.terrain.e14 {
  background-position: calc(-64px * 4) -64px;
}
.terrain.e15 {
  background-position: calc(-64px * 5) -64px;
}
.terrain.e16 {
  background-position: calc(-64px * 6) -64px;
}
.terrain.e17 {
  background-position: calc(-64px * 7) -64px;
}
.terrain.e18 {
  background-position: calc(-64px * 8) -64px;
}
.terrain.e19 {
  background-position: calc(-64px * 9) -64px;
}
</style>
