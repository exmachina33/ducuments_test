import store from "@/store";

export class BaseModel {
    delete() {
        store.commit(`${this.namespace}/delete`, this.id)
    };

    update(payload = {}) {
        store.commit(`${this.namespace}/update`, {id:this.id, ...payload})
    };
}