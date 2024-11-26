export interface AdminUser {
    id: string;
    name: string;
    email: string;
    password: string; // In production, this should be hashed
}

export interface AdminLoginCredentials {
    email: string;
    password: string;
}
