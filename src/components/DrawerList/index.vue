<template>
  <div class="drawer-list-wrapper">
    <div class="drawer-wrapper">
      <div
          class="drawer-header"
          @click="toggleShowContent"
      >
        <slot name="toddle" :show="showContent"/>
      </div>
      <slot name="header" />
    </div>

    <div
        ref="content"
        class="drawer-content"
        @transitionend="transitionendHandler"
    >
      <slot v-if="showDOM" name="content"/>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DrawerList',
  props: {
    expandDefault: {
      type: Boolean,
      default: false
    },
    headerClickable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      showContent: false,
      showDOM: false
    };
  },
  mounted() {
    if (!this.expandDefault) return;
    setTimeout(() => {
      this.toggleShowContent();
    }, 1000);
  },
  methods: {

    toggleShowContent() {
      if(!this.headerClickable) return;
      this.showContent = !this.showContent;

      const content = this.$refs.content;
      if (this.showContent) {
        this.showDOM = true;
        this.$nextTick(() => (content.style.height = `${content.scrollHeight}px`));
        return;
      }
      content.style.height = `${content.scrollHeight}px`;
      window.getComputedStyle(content, null).getPropertyValue('height');
      content.style.height = '0';
    },
    transitionendHandler() {
      this.showDOM = this.showContent;
      const content = this.$refs.content;
      if (!this.showContent) return;
      content.style.height = `auto`;
    }
  }
};
</script>

<style scoped lang="scss">
.drawer-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border: 1px solid #C2C5CD;
  margin: -1px 0 0 0;
  padding: 0 15px;

}
.drawer-header {
  display: flex;
  align-items: center;
}
.drawer-content {
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: height 500ms ease;
  padding: 0 0 0 15px;
}


</style>