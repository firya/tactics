<template>
  <div :class="$style.wrapper" v-show="selectedTile">
    <template v-for="object in objects">
      <grid-block-settings-block :object="object"></grid-block-settings-block>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { objectsArr } from "@/store/index";

import GridBlockSettingsBlock from "@/components/GridBlockSettingsBlock.vue";

export default defineComponent({
  name: "GridBlockSettings",
  components: {
    GridBlockSettingsBlock,
  },
  data() {
    return {};
  },
  computed: {
    objects() {
      return ["", ...objectsArr].map((item) => ({
        value: item,
        offset: item.charAt(0) === "w" ? 0 : 32,
      }));
    },
    selectedTile() {
      return this.$store.state.selectedTile;
    },
  },
});
</script>

<style module>
.wrapper {
  overflow-x: auto;
  display: flex;
  flex-wrap: nowrap;
}
</style>
