<template>
  <div id="app" class="documents">
    <div class="documents-header">
      <h1 class="documents-header__title">Документы</h1>
      <div class="documents-header__created-doc">
        <Button
            class="created-button"
            inactiveIcon="other.svg"
            :border="true"
        />
        <Button
            class="created-button"
            inactiveIcon="plus.svg"
            :border="true"
            text="Новый тип"
        />
        <Button
            class="created-button"
            inactiveIcon="plus.svg"
            :border="true"
            text="Новый документ"
        />
      </div>
    </div>
    <div
        class="documents-search"
        :class="{searchFocus}"
    >
      <img
          :src="require(`@/assets/button_icons/search.svg`)"
          class="documents-search__icon"
      >
      <input
          class="documents-search__field"
          type="text"
          v-model="searchText"
          placeholder="Поиск"
          @focus="searchFocus = true"
          @blur="searchFocus = false"
      >
      <Button
          v-if="searchText"
          class="documents-search__close-button"
          activeIcon="close.svg"
          :active="true"
          @click="clearSearchText"
      />
    </div>
    <div class="documents-categories">
      <draggable
          group="categories"
          handle=".handle"
          :list="categories"
          @change="updateCategories"
          v-bind="dragOptionsCategories">
        <Category
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :dragOptionsFiles="dragOptionsFiles"/>
      </draggable>
    </div>

    <div class="documents-not-categories-files">
      <draggable
          group="files"
          handle=".handle"
          :list="notCategoryFiles"
          @change="updateFiles"
          v-bind="dragOptionsFiles"
      >
        <File
          v-for="file in notCategoryFiles"
          :key="file.id"
          :file="file"
        />
      </draggable>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Category from "@/components/Category";
import File from "@/components/File";
import Button from "@/components/Button";

export default {
  name: "clone",
  display: "Clone",
  components: {
    Button,
    File,
    Category,
    draggable
  },
  data() {
    return {
      searchText: '',
      searchFocus: false
    }
  },
  computed: {
    ...mapGetters({
      getCategories: 'Category/getCategories',
      getNotCategoryFiles: "File/getNotCategoryFiles",
      getCategoryFiles: "File/getCategoryFiles"
    }),
    categories() {
      return this.getCategories
    },
    notCategoryFiles() {
      return this.getNotCategoryFiles;
    },
    categoryFiles() {
      return this.getCategoryFiles;
    },
    dragOptionsFiles() {
      return {
        animation: 300,
        group: "files",
        ghostClass: "ghost",
      };
    },
    dragOptionsCategories() {
      return {
        animation: 300,
        group: "categories",
        ghostClass: "ghost",
      }
    },
  },
  methods: {
    ...mapActions({
      createCategory: 'Category/createCategory',
      createFile: 'File/createFile',
    }),
    ...mapMutations({
      updateSearchFilesData: 'File/updateSearchFilesData',
      updateSearchCategoriesData: 'Category/updateSearchCategoriesData'
    }),


    updateFiles({added, moved}) {
      const data = added || moved
      if(!data) return
      const {element, newIndex} = data
      let order = null
      if(newIndex === 0) order = this.getNotCategoryFiles.length - 1 ? this.getNotCategoryFiles[newIndex + 1].order / 2 : 100
      if(newIndex === this.getNotCategoryFiles.length - 1 && newIndex !== 0) order = this.getNotCategoryFiles[newIndex - 1].order + 100
      if(newIndex > 0 && newIndex < this.getNotCategoryFiles.length - 1) order = (this.getNotCategoryFiles[newIndex - 1].order + this.getNotCategoryFiles[newIndex + 1].order) / 2

      element.update({order, categoryId: null})
    },

    updateCategories({added, moved}) {
      const data = added || moved
      if(!data) return
      const {element, newIndex} = data
      let order = null
      if(newIndex === 0) order = this.categories.length - 1 ? this.categories[newIndex + 1].order / 2 : 100
      if(newIndex === this.categories.length - 1 && newIndex !== 0) order = this.categories[newIndex - 1].order + 100
      if(newIndex > 0 && newIndex < this.categories.length - 1) order = (this.categories[newIndex - 1].order + this.categories[newIndex + 1].order) / 2

      element.update({order})
    },
    clearSearchText() {
      this.searchText = ''
    }

  },
  watch: {
    searchText(value){
      this.updateSearchFilesData({value: value.toLowerCase(), categories: this.categories.filter(cat => cat.name.toLowerCase().includes(value.toLowerCase()))})
      this.updateSearchCategoriesData({value: value.toLowerCase(), categoryFiles: this.categoryFiles})
    }
  },
  mounted() {
    this.createCategory();
    this.createFile()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
* {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Fira Sans';
  }
.test{
  display: flex;
  background-color: aquamarine;
  border: 1px solid black;
  height: 40px;
}
.documents {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 40px 30px;
}

.documents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px 0;

  &__title {
    font-size: 22px;
  }

  &__created-doc {
    display: flex;
  }
}
.documents-search {
  display: flex;
  border-bottom: 1px solid #BFC9E0;
  max-width: 500px;
  padding: 10px 0;
  transition: all 0.2s linear;

  &__field {
    padding: 0 10px;
    border: none;
    width: 100%;
    font-size: 15px;

    &::placeholder {
      font-style: italic;
    }

    &:focus {
      outline: 0;
    }
  }
}

.documents-categories,
.documents-not-categories-files
{
  max-width: 1190px;
  margin: 20px 0;
}
.documents-not-categories-files{
  height: 100%;
}
.created-button {
  margin: 0 0 0 10px;
}
.ghost {
  opacity: 0.5;
}
.searchFocus {
  border-color: #0066FF;
}

</style>