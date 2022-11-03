import { filesData} from "@/db/data";
import File from "@/models/File";
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        files: {},
        keyword: '',
        categoryIdList: []
    },
    mutations: {
        setFiles(state, files) {
          state.files = files
      },
        delete(state, fileId) {
        },
        update(state, payload) {
            const file = new File({...state.files[payload.id], ...payload})
            Vue.set(state.files, payload.id, file)
        },
        updateSearchFilesData(state, payload) {
            state.keyword = payload.value
            const list = []
            payload.categories.forEach(file => list.push(file.id))
            state.categoryIdList = list
        }
    },
    actions: {
        createFile(ctx) {
            const data = filesData;
            const files = data.reduce((acc, current) => {
                return {...acc, [current.id]:new File(current)}
            }, {});
            ctx.commit('setFiles', files);
        }
    },
    getters: {
        getCategoryFiles(state) {
            return Object.values(state.files).filter(file => file.categoryId && (file.name.toLowerCase().includes(state.keyword) || state.categoryIdList.includes(file.categoryId))).sort((a, b) => a.order - b.order)
        },
        getNotCategoryFiles(state) {
            return Object.values(state.files).filter(file => !file.categoryId && file.name.toLowerCase().includes(state.keyword)).sort((a, b) => a.order - b.order)
        }
    }
}