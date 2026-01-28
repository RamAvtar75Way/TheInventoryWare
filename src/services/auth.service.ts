import type { LoginInput, SignupInput } from '../schemas/auth.schema';

const USERS_KEY = 'inventory_users';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface StoredUser extends User {
    password?: string;
}

interface AuthResponse {
    user: User;
    token: string;
}

const getUsers = (): StoredUser[] => {
    try {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : [];
    } catch {
        return [];
    }
};

export const authService = {
    login: async (data: LoginInput): Promise<AuthResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = getUsers();
        const user = users.find((u) => u.email === data.email && u.password === data.password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: 'user',
            },
            token: 'mock-jwt-token-' + Date.now(),
        };
    },

    signup: async (data: SignupInput): Promise<AuthResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = getUsers();
        if (users.find((u) => u.email === data.email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: Date.now().toString(),
            email: data.email,
            name: data.name,
            password: data.password,
            role: 'user', 
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        return {
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: 'user',
            },
            token: 'mock-jwt-token-' + Date.now(),
        };
    }
};
