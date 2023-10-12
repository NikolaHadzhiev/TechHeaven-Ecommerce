export interface ProductParams {
    orderBy: string;
    search?: string;
    types: string[];
    brands: string[];
    currentPageNumber: number;
    pageSize: number;
}