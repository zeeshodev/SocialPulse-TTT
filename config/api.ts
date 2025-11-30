const getApiBaseUrl = () => {
    // In production, use the environment variable
    if ((import.meta as any).env.PROD) {
        return (import.meta as any).env.VITE_API_URL || 'https://socialpulse-ttt.onrender.com';
    }
    // In development, use localhost or the environment variable if set
    return (import.meta as any).env.VITE_API_URL || 'http://localhost:3000';
};

export const API_BASE_URL = getApiBaseUrl();
