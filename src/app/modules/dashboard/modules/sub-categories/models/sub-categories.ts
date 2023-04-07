export interface SubCategories {
    created_at: Date;
    updated_at: Date;
    position: number;
    id?: string;
    name: string;
    categoryName:string;
    type: string;
    image_details: ImageDetails;
    status: string;
}
export interface ImageDetails {
    id?: string;
    imgURL?: string;
}
