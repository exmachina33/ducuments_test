<template>
  <DrawerList :headerClickable="categoryHasFiles">
    <template v-slot:toddle="{show}">
      <Button
          inactiveIcon="arrow.svg"
          :border="true"
          :rotate="show"
          activeIcon="arrow_active.svg"
          :active="categoryHasFiles"
      />
    </template>
    <template v-slot:header>
        <div class="category">
          <div class="category__content">
            <draggable
              class="draggable"
              group="files"
              :list="category.files"
              handle=".handle"
              @change="update"
              v-bind="dragOptionsFiles"
            />
            <h3
              class="category__name"
              v-text="category.name"
            />
            <span
              class="category__description"
              v-text="category.description"
            />
          </div>
          <Button
              class="category__action"
              inactiveIcon="edit.svg"
          />
          <Button
              class="category__action"
              inactiveIcon="delete.svg"
          />
          <Button
              class="category__action handle"
              inactiveIcon="move.svg"
              activeIcon="move_active.svg"
              :active="moved"
              @mousedown="moved = true"
              @mouseout="moved = false"
              @mouseup="moved = false"
          />
        </div>
    </template>
    <template v-slot:content :category="category">
      <draggable
          group="files"
          :list="category.files"
          handle=".handle"
          @change="update"
          v-bind="dragOptionsFiles">
        <File
            v-for="file in category.files"
            :key="file.id"
            :file="file"/>
      </draggable>
    </template>
  </DrawerList>
</template>

<script>
import draggable from 'vuedraggable'
import DrawerList from "@/components/DrawerList";
import File from "@/components/File";
import Button from "@/components/Button";

export default {
  name: 'Category',
  components: {
    Button,
    File,
    DrawerList,
    draggable
  },
  props: {
    category: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dragOptionsFiles: {
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
  },
  computed: {
    categoryHasFiles() {
      return this.category.files.length !== 0
    }
  },
  methods: {
    update({added, moved}) {
      const data = added || moved
      if(!data) return
      const {element, newIndex} = data
      if(added) this.category.addFile(element, newIndex)
      if(moved) this.category.moveFile(element, newIndex)
    },

  }
}
</script>

<style lang="scss" scoped>
.draggable {
  height: 100%;
  width: 100%;
  position: absolute;

}
.category {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 15px;
  align-items: center;
  height: 48px;
  padding: 0 0 0 15px;

  &__content {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 15px;
    align-items: center;
    height: 100%;
  }

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

  &__name {
    white-space: nowrap;
    font-family: 'Fira Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 108%;
  }
  .ghost {
    opacity: 0.5;
  }

}
</style>