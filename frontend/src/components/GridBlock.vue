<template>
  <div :class="$style.wrapper">
    <input-toggle
      :value="showGrid"
      label="Toggle grid"
      @toggleHandler="toggleGridHandler"
    ></input-toggle>

    <div :class="$style.grid" :style="cssVars">
      <div :class="$style.row" v-for="rowData in field">
        <div :class="$style.col" v-for="tile in rowData">
          <grid-block-tile :key="tile.id" :tile="tile"></grid-block-tile>
        </div>
      </div>
    </div>

    <div :class="$style.grid" :style="cssVars">
      <div :class="$style.row" v-for="rowData in field">
        <div :class="$style.col" v-for="tile in rowData">
          <grid-block-tile-helper
            :key="tile.id"
            :tile="tile"
          ></grid-block-tile-helper>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GridBlockTile from "@/components/GridBlockTile.vue";
import GridBlockTileHelper from "@/components/GridBlockTileHelper.vue";
import InputToggle from "@/components/InputToggle.vue";

export default defineComponent({
  name: "GridBlock",
  components: {
    GridBlockTile,
    GridBlockTileHelper,
    InputToggle,
  },
  data() {
    return {};
  },
  computed: {
    showGrid() {
      return this.$store.state.showGrid;
    },
    field() {
      return this.$store.state.field;
    },
    fieldWidth() {
      return this.$store.state.field.length;
    },
    fieldHieght() {
      return this.$store.state.field[0].length || 0;
    },
    cssVars() {
      return {
        "--grid-width": this.fieldWidth,
        "--grid-height": this.fieldHieght,
      };
    },
  },
  methods: {
    toggleGridHandler() {
      this.$store.commit("toggleGrid");
    },
  },
});
</script>

<style module>
.wrapper {
  position: relative;
  overflow: hidden;
}
.grid {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  display: grid;
  grid-template-columns: repeat(var(--grid-width), 1fr);
  grid-template-rows: 1fr;
  grid-gap: 0;
  width: calc(var(--grid-width) * 64px);
  height: calc(var(--grid-height) * 64px);
  transform: rotateX(45deg) rotateZ(45deg);
  scale: 1 0.5;
}
.row {
  display: grid;
  grid-template-rows: repeat(var(--grid-heigth), 1fr);
  transform-style: inherit;
}
.col {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
}
</style>
