<template>
  <div :class="$style.wrapper">
    <div :class="$style.container">
      <template v-for="n in realHeight">
        <div
          :class="`terrain ${$style.terrain} ${tile.terrain}`"
          :style="`translate: 0 ${32 * (realHeight - tile.height - n + 1)}px`"
        ></div>
      </template>
      <div
        :class="`object ${$style.object} ${tile.object}`"
        v-if="tile.object != ''"
        :style="`translate: 0 ${-32 * tile.height + objectOffset}px`"
      ></div>
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
    coords() {
      return this.tile.id.split("_").map(Number);
    },
    objectOffset() {
      return this.tile.object.charAt(0) === "w" ? 32 : -24;
    },
    isActive() {
      if (!this.$store.state.selectedTile) {
        return false;
      } else {
        return (
          this.coords[0] === this.$store.state.selectedTile[0] &&
          this.coords[1] === this.$store.state.selectedTile[1]
        );
      }
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
.popup {
  position: absolute;
  z-index: 100;
  bottom: -100%;
  left: 50%;
  translate: -50% 0;
}
.terrain {
  position: absolute;
  top: 0;
  left: 0;
  scale: 1 2;
}
.object {
  position: absolute;
  left: 0;
  scale: 1 2;
}
</style>
