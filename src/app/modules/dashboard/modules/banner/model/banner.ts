export interface Banner {
    created_at: Date;
    updated_at: Date;
    position: number;
    id?: string;
    image_details: ImageDetails;
    status: string;
}

export interface ImageDetails {
    id?: string;
    imgURL?: string;
}