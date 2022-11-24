<template>
  <label :class="$style.toggler">
    <input
      type="checkbox"
      :class="$style.toggler__checkbox"
      @change="onChangeHandler"
      :checked="value"
    />
    <span :class="$style.toggler__slider"></span>
    <span :class="$style.toggler__text">Toggle Grid</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputToggle",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
  },
  methods: {
    onChangeHandler() {
      this.$emit("toggleHandler");
    },
  },
});
</script>

<style module>
.wrapper {
  position: relative;
  overflow: hidden;
}
.grid {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  display: grid;
  grid-template-columns: repeat(var(--grid-width), 1fr);
  grid-template-rows: 1fr;
  grid-gap: 0;
  width: calc(var(--grid-width) * 64px);
  height: calc(var(--grid-height) * 64px);
  transform: rotateX(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
  scale: 1 0.5;
}
.row {
  display: grid;
  grid-template-rows: repeat(var(--grid-heigth), 1fr);
  transform-style: inherit;
}
.col {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
}
.toggler {
  position: absolute;
  top: 20px;
  left: 20px;
  display: inline-block;
  width: 60px;
  height: 34px;
  cursor: pointer;
}
.toggler__checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggler__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}
.toggler__slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
.toggler__checkbox:checked + .toggler__slider {
  background-color: #e77777;
}

.toggler__checkbox:focus + .toggler__slider {
  box-shadow: 0 0 1px #e77777;
}

.toggler__checkbox:checked + .toggler__slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.toggler__text {
  color: #e77777;
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(10px, -50%);
}
</style>
