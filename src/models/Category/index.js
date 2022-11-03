import CategoryModel from "@/models/Category/CategoryModel";
import store from "@/store";

export default class Category extends CategoryModel{
    get files() {
        const files = store.getters["File/getCategoryFiles"];
        return files.filter(file => file.categoryId === this.id).sort((a, b) => a.order - b.order)
    }

    addFile(file, index) {
        let order = null
        if(index === 0) order = this.files.length ? this.files[index].order / 2 : 100
        if(index === this.files.length && index !== 0) order = this.files[index - 1].order + 100
        if(index > 0 && index < this.files.length) order = (this.files[index - 1].order + this.files[index].order) / 2
        file.update({order, categoryId: this.id})
    }
    moveFile(file, index) {
        let order = null
        if(index === 0) order = this.files.length ? this.files[index].order / 2 : 100
        if(index === this.files.length - 1 && index !== 0) order = this.files[index ].order + 100
        if(index > 0 && index < this.files.length - 1) {
            const currentOrder = this.files[index].order
            let nextOrder = currentOrder > file.order ? this.files[index + 1].order : this.files[index - 1].order
            order = (currentOrder + nextOrder) / 2
        }
        file.update({order, categoryId: this.id})
    }
}