<template>
  <div class="app__wrapper">
    <grid-block></grid-block>
    <div
      class="popup"
      v-if="isPopupVisible"
      :style="`left: ${popupPosition!.left + popupPosition!.width/2}px; top: ${popupPosition!.top - selectedTileHeight*16}px`"
    >
      <actions-popup :buttons="popupButtons"></actions-popup>
    </div>
    <div class="generate">
      <action-button :data="generateButton"></action-button>
    </div>

    <grid-block-settings></grid-block-settings>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { IactionButton } from "@/components/ActionButton.vue";

import GridBlock from "@/components/GridBlock.vue";
import GridBlockSettings from "@/components/GridBlockSettings.vue";
import ActionsPopup from "@/components/ActionsPopup.vue";
import ActionButton from "@/components/ActionButton.vue";

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
    ActionButton,
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
    popupButtons(): IactionButton[] {
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
    generateButton(): IactionButton {
      return {
        action: () => this.$store.commit("updateTerrain"),
        text: "Generate random terrain",
      };
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
  grid-template: 1fr 128px / 1fr;
  overflow: hidden;
}
.popup {
  position: absolute;
  translate: -50% calc(-100% - 32px);
}
.generate {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
