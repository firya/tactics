<template>
  <div class="app__wrapper">
    <grid-block></grid-block>
    <!-- <grid-block-settings></grid-block-settings> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GridBlock from "@/components/GridBlock.vue";
import GridBlockSettings from "@/components/GridBlockSettings.vue";

export default defineComponent({
  name: "App",
  components: {
    GridBlock,
    GridBlockSettings,
  },
  data() {
    return {};
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
</style>
