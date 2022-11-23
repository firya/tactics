<template>
  <div :class="$style.wrapper">
    <div :class="button" v-for="button in buttons">
      <action-button :data="button" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ActionButton from "@/components/ActionButton.vue";

export default defineComponent({
  name: "ActionsPopup",
  components: {
    ActionButton,
  },
  props: {
    buttons: {
      type: Array,
      required: true,
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
