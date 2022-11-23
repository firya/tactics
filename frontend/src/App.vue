<template>
  <div class="app__wrapper">
    <grid-block></grid-block>
    <div
      class="popup"
      v-if="isPopupVisible"
      :style="`left: ${popupPosition!.left + popupPosition!.width/2}px; top: ${popupPosition!.top - selectedTileHeight*16}px`"
    >
      <actions-popup :buttons="buttons"></actions-popup>
    </div>
    <button class="update" @click="updateTerrain">Update Terrain</button>
    <!-- <grid-block-settings></grid-block-settings> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GridBlock from "@/components/GridBlock.vue";
import GridBlockSettings from "@/components/GridBlockSettings.vue";
import ActionsPopup from "@/components/ActionsPopup.vue";

import IconArrowDown from "@/assets/icon-arrow-down.svg";
import IconArrowUp from "@/assets/icon-arrow-up.svg";

export default defineComponent({
  name: "App",
  setup() {
    return {
      IconArrowDown,
      IconArrowUp,
    };
  },
  components: {
    GridBlock,
    GridBlockSettings,
    ActionsPopup,
  },
  data() {
    return {
      interval: 0,
    };
  },
  computed: {
    isPopupVisible() {
      return !!this.$store.state.selectedTile;
    },
    popupPosition() {
      if (!this.$store.state.selectedTileElement) {
        return null;
      }
      const bodyRect = document.body.getBoundingClientRect();
      const elementRect =
        this.$store.state.selectedTileElement.getBoundingClientRect();
      return {
        top: elementRect.top - bodyRect.top,
        left: elementRect.left - bodyRect.left,
        width: elementRect.width,
        height: elementRect.height,
      };
    },
    selectedTileHeight() {
      if (!this.$store.state.selectedTile) {
        return 0;
      }
      return this.$store.state.field[this.$store.state.selectedTile[0]][
        this.$store.state.selectedTile[1]
      ].height;
    },
    buttons() {
      return [
        {
          icon: IconArrowDown,
          action: () => this.$store.commit("decreaseTileHeight"),
          label: "Decrease height",
        },
        {
          icon: IconArrowUp,
          action: () => this.$store.commit("increaseTileHeight"),
          label: "Increase height",
        },
      ];
    },
  },
  methods: {
    updateTerrain() {
      this.$store.commit("updateTerrain");
    },
  },
});
</script>

<style scoped>
.app__wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  grid-template: 1fr 100px / 1fr;
}
.popup {
  position: absolute;
  translate: -50% calc(-100% - 32px);
}
.update {
  position: absolute;
  background-color: rgb(240, 236, 228);
  border-radius: 5px;
  border: 1px solid #666;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  right: 20px;
  top: 20px;
  cursor: pointer;
  transition: boxShadow 0.2s ease-in-out;
}
.update:hover {
  box-shadow: 0 0 0px rgba(0, 0, 0, 0);
}
</style>
