import {categoriesData} from "@/db/data";
import Category from "@/models/Category";
import Vue from "vue";
import File from "@/models/File";

export default {
    namespaced: true,
    state: {
        categories: {},
        keyword: '',
        categoryIdList: []
    },
    mutations: {
        setCategories(state, categories) {
          state.categories = categories
      },
        delete(state, categoryId) {
        },

        update(state, payload) {
            const category = new Category({...state.categories[payload.id], ...payload})
            Vue.set(state.categories, payload.id, category)
        },
        updateSearchCategoriesData(state, payload) {
            state.keyword = payload.value
            const list = []
            payload.categoryFiles.forEach(file => list.push(file.categoryId))
            state.categoryIdList = list
        }

    },
    actions: {
        createCategory(ctx) {
            const data = categoriesData;
            const categories = data.reduce((acc, current) => {
                return {...acc, [current.id]:new Category(current)}
            }, {});
            ctx.commit('setCategories', categories);


        }
    },
    getters: {
        getCategories(state) {
            return Object.values(state.categories).filter(category => !category.categoryId && (category.name.toLowerCase().includes(state.keyword) || state.categoryIdList.includes(category.id))).sort((a, b) => a.order - b.order)
        }
    }
}