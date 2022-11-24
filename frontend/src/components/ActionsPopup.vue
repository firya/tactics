<template>
  <div :class="$style.wrapper" @click="clickHandler">
    <div :class="button" v-for="button in buttons">
      <action-button :data="button" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

import type { IactionButton } from "@/components/ActionButton.vue";

import ActionButton from "@/components/ActionButton.vue";

export default defineComponent({
  name: "ActionsPopup",
  components: {
    ActionButton,
  },
  props: {
    buttons: {
      type: Array as PropType<IactionButton[]>,
      required: true,
    },
  },
  methods: {
    clickHandler(e: MouseEvent) {
      e.stopPropagation();
    },
  },
});
</script>

<style module>
.wrapper {
  background-color: rgb(240, 236, 228);
  border-radius: 5px;
  border: 1px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  gap: 4px;
}
</style>
