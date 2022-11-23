<template>
  <div :class="`${$style.item} ${activeClass}`" @click="clickHandle">
    <div :class="`terrain ${$style.terrain} ${selectedTileObject.terrain}`">
      <div
        :class="`object ${$style.object} ${object.value}`"
        :style="`translate: 0 -${object.offset}px`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GridBlockSettingsBlock",
  props: {
    object: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    selectedTileObject() {
      return !this.$store.state.selectedTile
        ? {}
        : this.$store.state.field[this.$store.state.selectedTile[0]][
            this.$store.state.selectedTile[1]
          ];
    },
    activeClass(): string {
      return this.selectedTileObject.object === this.object.value
        ? this.$style.active
        : "";
    },
  },
  methods: {
    clickHandle() {
      this.$store.commit("setTileObject", {
        tile: this.$store.state.selectedTile,
        object: this.object.value,
      });
    },
  },
});
</script>

<style module>
.item {
  position: relative;
  flex: 112px 0 0;
  width: 112px;
  height: 112px;
  cursor: pointer;
}
.item:hover {
  background-color: bisque;
}
.item.active {
  border: 5px solid rgba(255, 168, 92, 1);
}
.terrain {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 64px;
  height: 64px;
  background-image: url("@/assets/terrain.png");
  background-size: 640px 1024px;
}
.object {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50%;
  margin-left: -50%;
}
</style>
