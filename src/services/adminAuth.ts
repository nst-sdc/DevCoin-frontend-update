import { AdminUser, AdminLoginCredentials } from '../types/admin';

// In a real application, this would be stored in a secure database
const ADMIN_USER: AdminUser = {
    id: '1',
    name: 'Vivek',
    email: 'vivek.aryanvbw@gmail.com',
    password: 'Vivek@2024' // In production, this should be hashed
};

export const adminAuth = {
    login: (credentials: AdminLoginCredentials): boolean => {
        if (credentials.email === ADMIN_USER.email && credentials.password === ADMIN_USER.password) {
            localStorage.setItem('adminToken', JSON.stringify({
                id: ADMIN_USER.id,
                name: ADMIN_USER.name,
                email: ADMIN_USER.email,
                timestamp: new Date().toISOString()
            }));
            return true;
        }
        return false;
    },

    logout: (): void => {
        localStorage.removeItem('adminToken');
    },

    isAuthenticated: (): boolean => {
        const adminToken = localStorage.getItem('adminToken');
        if (!adminToken) return false;
        
        try {
            const { timestamp } = JSON.parse(adminToken);
            // Token expires after 24 hours
            const expirationTime = new Date(timestamp).getTime() + (24 * 60 * 60 * 1000);
            return new Date().getTime() < expirationTime;
        } catch {
            return false;
        }
    },

    getAdminInfo: (): Partial<AdminUser> | null => {
        const adminToken = localStorage.getItem('adminToken');
        if (!adminToken) return null;
        
        try {
            const { id, name, email } = JSON.parse(adminToken);
            return { id, name, email };
        } catch {
            return null;
        }
    }
};
