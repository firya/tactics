<template><div class="wrapper"></div></template>

<script lang="ts">
import { defineComponent } from "vue";
import GridBlockTile from "@/components/GridBlockTile.vue";

export default defineComponent({
  name: "GridBlockSettings",
  components: {
    GridBlockTile,
  },
  data() {
    return {};
  },
});
</script>

<style scoped>
.wrapper {
}
</style>
