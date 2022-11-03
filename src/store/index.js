import Vue from 'vue'
import Vuex from 'vuex'
import Category from "@/store/modules/Category";
import File from "@/store/modules/File";


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Category,
    File
  }
})
