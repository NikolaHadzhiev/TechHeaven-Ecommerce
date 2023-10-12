import { Pagination } from "../interfaces/pagination";

export class PaginatedResponse<T>{
    items: T
    pagination: Pagination

    constructor (items: T, pagination: Pagination){
        this.items = items;
        this.pagination = pagination
    }
}