<template>
  <div :class="[$style.container, isActive ? $style.active : '']">
    <div :class="$style.wrapper">
      <h1 :class="$style.header">Hotkeys</h1>
      <template v-for="hotkey in hotkeys" :key="hotkey.keycode">
        <p :class="$style.row">
          <span :class="$style.key">{{ hotkey.symbol }}</span> —
          {{ hotkey.help }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import keyboardObj from "@/utils/keyboard";

export default defineComponent({
  name: "Hotkeys",
  data() {
    return {
      isActive: true,
    };
  },
  computed: {
    hotkeys() {
      return [...keyboardObj.move, ...keyboardObj.actions];
    },
  },
  created() {
    window.addEventListener("keydown", this.keyboardhandler);
    window.addEventListener("keyup", this.keyboardhandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyboardhandler);
    window.removeEventListener("keyup", this.keyboardhandler);
  },
  methods: {
    keyboardhandler(e: KeyboardEvent) {
      if (e.code === "MetaLeft" || e.code === "MetaRight") {
        this.isActive = e.type === "keydown" ? true : false;
      }
    },
  },
});
</script>

<style module>
.container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: none;
  opacity: 0;
  transition: all 0.175s ease-out;
  pointer-events: none;
  overflow: auto;
  z-index: 101;
}
.active {
  opacity: 1;
  pointer-events: all;
}
.wrapper {
  margin: auto;
  min-width: 300px;
  width: 80vw;
  max-width: 500px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}
.header {
  font-size: 2em;
  margin-bottom: 1em;
}
.row {
  margin-bottom: 0.4em;
}
.key {
  display: inline-block;
  width: 3em;
  font-weight: bold;
  font-size: 1.2em;
  border: 1px solid rgb(159, 159, 159);
  border-radius: 3px;
  text-align: center;
  padding: 8px;
}
</style>
