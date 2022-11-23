<template>
  <div
    :class="`${$style.wrapper} ${selectedClass} ${showGridClass}`"
    @click="clickHandle"
    ref="wrapper"
  >
    <div :class="$style.outline"></div>
    <div
      :class="$style.real"
      :style="`translate: -${32 * tile.height}px -${32 * tile.height}px`"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GridBlockTileHelper",
  props: {
    tile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    showGrid() {
      return this.$store.state.showGrid;
    },
    coords() {
      return this.tile.id.split("_").map(Number);
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
    distanceToSelected() {
      return this.$store.state.selectedTile
        ? Math.sqrt(
            Math.pow(this.coords[0] - this.$store.state.selectedTile[0], 2) +
              Math.pow(this.coords[1] - this.$store.state.selectedTile[1], 2)
          )
        : 0;
    },
    isHighlited() {
      if (!this.$store.state.selectedTile || this.isActive) {
        return false;
      } else {
        return (
          Math.ceil(this.distanceToSelected) - 1 <
          this.$store.state.selectedRadius
        );
      }
    },
    showGridClass(): string {
      return this.$store.state.showGrid ? this.$style.grid : "";
    },
    selectedClass(): string {
      let classArr = [];
      if (this.isActive) classArr.push(this.$style.selected);
      if (this.isHighlited) classArr.push(this.$style.highlighted);
      return classArr.join(" ");
    },
  },
  methods: {
    clickHandle() {
      if (this.isActive) {
        this.$store.commit("deselectTile");
      } else {
        this.$store.commit("selectTile", {
          tile: this.coords,
          element: this.$refs.wrapper,
        });
      }
    },
  },
});
</script>

<style module>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.grid .outline {
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.outline {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.wrapper:hover {
  background-color: rgba(196, 255, 250, 0.3);
}
.wrapper:hover .real {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 168, 92, 0.8);
}
.selected .outline {
  border: 5px solid rgba(255, 168, 92, 1);
}
.highlighted .outline {
  background-color: rgba(255, 168, 92, 0.3);
}
</style>
