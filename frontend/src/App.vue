<template>
  <div class="app__wrapper">
    <grid-block></grid-block>
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
import ActionButton from "@/components/ActionButton.vue";

export default defineComponent({
  name: "App",
  components: {
    GridBlock,
    GridBlockSettings,
    ActionButton,
  },
  data() {
    return {
      interval: 0,
    };
  },
  computed: {
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
.generate {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
