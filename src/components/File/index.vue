<template>
  <div class="file">
    <h3 class="file__name" v-text="file.name"/>
    <span class="file__priority" v-text="file.priority"/>
    <span class="file__description" v-text="file.description"/>
    <Button
        class="file__action"
        inactiveIcon="edit.svg"
    />
    <Button
        class="file__action"
        inactiveIcon="delete.svg"
    />
    <Button
        class="file__action handle"
        inactiveIcon="move.svg"
        activeIcon="move_active.svg"
        :active="moved"
        @mousedown="moved = true"
        @mouseout="moved = false"
        @mouseup="moved = false"
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Button from "@/components/Button";
export default {
  name: 'File',
  components: {
    Button,
    draggable
  },
  props: {
    file: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      moved: false
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto 1fr auto auto auto;
  gap: 15px;
  align-items: center;
  height: 35px;
  border: 1px solid #C2C5CD;
  margin: -1px 0 0 0;
  padding: 0 15px;

  &__description {
    font-size: 11px;
    color: #8E9CBB;
    overflow: hidden;
    white-space: nowrap;
    position: relative;

    &::after {
      display: block;
      height: 100%;
      width: 50px;
      content: "";
      box-shadow: -30px 0px 25px -10px rgb(255 255 255) inset;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  &__action {
    width: fit-content;
  }

  &__priority {
    font-size: 11px;
    color: #FF238D;
  }

  &__name {
    white-space: nowrap;
    font-family: 'Fira Sans';;
    font-weight: 500;
    font-size: 13px;
    line-height: 108%;
  }

}
</style>