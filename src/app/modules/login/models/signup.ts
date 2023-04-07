export interface Signup {
    id?: string;
    created_at: Date;
    updated_at: Date;
    tenetName?: string;
    role?:string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    gender?:string;
    status?: string;
}
