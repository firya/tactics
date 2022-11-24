<template>
  <div class="app_container">
    <div class="app__wrapper">
      <grid-block></grid-block>
      <grid-block-settings></grid-block-settings>
    </div>
    <footer-block></footer-block>
  </div>
  <hot-keys></hot-keys>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GridBlock from "@/components/GridBlock.vue";
import GridBlockSettings from "@/components/GridBlockSettings.vue";
import FooterBlock from "@/components/FooterBlock.vue";
import HotKeys from "@/components/HotKeys.vue";

export default defineComponent({
  name: "App",
  components: {
    GridBlock,
    GridBlockSettings,
    FooterBlock,
    HotKeys,
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
}
.app_container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  grid-template: 1fr 20px / 1fr;
  overflow: hidden;
}
</style>
