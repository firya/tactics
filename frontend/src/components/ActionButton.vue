<template>
  <button :class="$style.wrapper" @click="clickHandler">
    <span :class="$style.icon" v-if="data.icon"
      ><img :class="$style.img" :src="data.icon" :alt="data.label"
    /></span>
    <span :class="$style.text" v-if="data.text">{{ data.text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export interface IactionButton {
  label?: string;
  icon?: string;
  text?: string;
  action: () => void;
}

export default defineComponent({
  name: "ActionButton",
  props: {
    data: {
      type: Object as PropType<IactionButton>,
      required: true,
    },
  },
  methods: {
    clickHandler(e: MouseEvent) {
      e.preventDefault();
      this.data.action();
    },
  },
});
</script>

<style module>
.wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  appearance: none;
  border: 1px solid #836969;
  background-color: #e3cfa9;
  -webkit-appearance: none;
}
.wrapper:hover {
  background-color: #d4c0a0;
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
.text {
}
</style>
