import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean().optional(),
});

export const signupSchema = loginSchema.extend({
    name: z.string().min(2, 'Name is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
