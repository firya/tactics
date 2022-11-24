<template>
  <div :class="$style.wrapper" @click="clickHandler">
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

    <div :class="$style.grid" ref="helperGrid" :style="cssVars">
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
    keyboardObject() {
      return {
        move: [
          {
            keyCode: "ArrowUp",
            offset: [-1, 0],
          },
          {
            keyCode: "ArrowDown",
            offset: [1, 0],
          },
          {
            keyCode: "ArrowLeft",
            offset: [0, 1],
          },
          {
            keyCode: "ArrowRight",
            offset: [0, -1],
          },
        ],
        actions: [
          {
            keyCode: "KeyZ",
            action: "decreaseTileHeight",
          },
          {
            keyCode: "KeyX",
            action: "increaseTileHeight",
          },
          {
            keyCode: "BracketRight",
            action: "increaseRadius",
          },
          {
            keyCode: "BracketLeft",
            action: "decreaseRadius",
          },
          {
            keyCode: "Escape",
            action: "deselectTile",
          },
        ],
      };
    },
  },
  created() {
    window.addEventListener("keydown", this.keyboardhandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyboardhandler);
  },
  methods: {
    toggleGridHandler() {
      this.$store.commit("toggleGrid");
    },
    getHTMLelement(tile: [number, number]) {
      const helperGridWrapper = this.$refs.helperGrid as HTMLElement;

      return helperGridWrapper.children[tile[0]].children[tile[1]];
    },
    keyboardhandler(e: KeyboardEvent) {
      if (
        [...this.keyboardObject.move, ...this.keyboardObject.actions].some(
          (key) => key.keyCode === e.code
        )
      ) {
        e.preventDefault();

        if (this.keyboardObject.move.some((key) => key.keyCode === e.code)) {
          const offset = this.keyboardObject.move.find(
            (key) => key.keyCode === e.code
          )?.offset;

          if (offset) {
            let tile = !this.$store.state.selectedTile
              ? [0, 0]
              : this.$store.state.selectedTile;
            tile = [tile[0] + offset[0], tile[1] + offset[1]];
            tile[0] =
              tile[0] > this.$store.state.gridSize - 1
                ? this.$store.state.gridSize - 1
                : tile[0] < 0
                ? 0
                : tile[0];
            tile[1] =
              tile[1] > this.$store.state.gridSize - 1
                ? this.$store.state.gridSize - 1
                : tile[1] < 0
                ? 0
                : tile[1];

            this.$store.commit("selectTile", {
              tile,
              element: this.getHTMLelement(tile),
            });
          }
        } else if (
          this.$store.state.selectedTile &&
          this.keyboardObject.actions.some((key) => key.keyCode === e.code)
        ) {
          const action = this.keyboardObject.actions.find(
            (key) => key.keyCode === e.code
          )?.action;

          if (action) {
            this.$store.commit(action);
          }
        }
      }
    },
    clickHandler(e: MouseEvent) {
      e.preventDefault();
      this.$store.commit("deselectTile");
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
