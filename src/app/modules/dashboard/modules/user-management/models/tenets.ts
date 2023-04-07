export interface Tenets {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    name: string;
    email: string;
    phone: string;
    gender: string;
    profile_image?: any;
    address: any;
    status: string;
    gst_number?: string;
    sell_categories?: string;
}

export interface TentImage{
    id?: number;
    tent_phone:string;
    name: string;
    data: string;
}