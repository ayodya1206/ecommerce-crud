
export interface Category {
    created_at: Date;
    updated_at: Date;
    position: number;
    id?: string;
    name: string;
    type: string;
    image_details: ImageDetails;
    status: string;
}
export interface ImageDetails {
    id?: string;
    imgURL?: string;
}
