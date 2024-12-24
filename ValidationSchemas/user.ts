import {z} from "zod";

export const userSchema = z.object({
    name: z.string().min(2, 'Name is required').max(255),
    username: z.string().min(2, 'Username is required').max(255),
    password: z.string().min(6, 'Password is required').max(255).optional().or(z.literal('')),
    role: z.string().min(2, 'Role is required').max(10),
})