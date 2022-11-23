<template>
  <button :class="$style.wrapper" @click="clickHandler">
    <span :class="$style.icon"
      ><img :class="$style.img" :src="data.icon" :alt="data.label"
    /></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ActionsPopupButton",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickHandler() {
      this.data.action();
    },
  },
});
</script>

<style module>
.wrapper {
}
.icon {
  display: block;
  padding: 4px;
  width: 32px;
  cursor: pointer;
}
.img {
  width: 20px;
  height: 20px;
  vertical-align: top;
}
</style>
