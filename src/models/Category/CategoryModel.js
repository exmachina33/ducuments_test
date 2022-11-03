import {BaseModel} from '../BaseModel'
import store from "@/store";

export default class CategoryModel extends BaseModel {
    namespace = 'Category';
    constructor(data) {
        super();
        this.id = data.id;
        this.order = data.order;
        this.name = data.name;
        this.description = data.description
    };
}