<template>
  <div :class="$style.wrapper">
    <div :class="$style.hotkeys">Press ⌘ cmd / ⊞ win for hotkeys</div>
    <div :class="$style.code">
      Code on
      <a
        href="https://github.com/firya/tactics"
        target="_blank"
        :class="$style.code"
        >GitHub</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FooterBlock",
});
</script>

<style module>
.wrapper {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #938b7e;
  padding: 0 20px;
}
.wrapper a {
  color: #938b7e;
}
</style>
