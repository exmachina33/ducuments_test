import {BaseModel} from '../BaseModel'

export default class FileModel extends BaseModel {
    namespace = 'File';
    constructor(data) {
        super();
        this.id = data.id;
        this.categoryId = data.categoryId
        this.order = data.order;
        this.name = data.name;
        this.priority = data.priority
        this.description = data.description;

    }
}