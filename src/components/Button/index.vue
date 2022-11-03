<template>
  <button
      class="button"
      :class="{border, 'rotate':rotateStatus, text}"
      @click="$emit('click')"
      @mousedown="$emit('mousedown')"
      @mouseup="$emit('mouseup')"
      @mouseover="$emit('mouseover')"
      @mouseout="$emit('mouseout')"
  >
    <img class="button__icon" :src="require(`@/assets/button_icons/${icon}`)">
    <span class="button__text" v-text="text" v-if="text" />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    inactiveIcon: {
      type: String,
      default: ''
    },
    activeIcon: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    rotate: {
      type: Boolean,
      default: false
    },
    text : {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    icon() {
      return this.active ? this.activeIcon : this.inactiveIcon
    },
    rotateStatus() {
      return this.rotate && this.active
    }
  }

}
</script>

<style lang="scss" scoped>
.button {
  border: none;
  background-color: transparent;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
  cursor: pointer;

  &__text {
    font-weight: 500;
    font-size: 12px;
    margin: 0 0 0 10px;
  }
}
.border {
  border: 1px solid #C2C5CD;
  height: 22px;
  min-width: 22px;
}
.rotate {
  transform: rotate(-180deg);
}
.text {
  padding: 0 10px;
}
</style>