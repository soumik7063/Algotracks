import {email, z} from 'zod'

const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(3,{message:"Name must be at least 3 characters long"})
    .max(100,{message:"Name must be no more than 100 characters"}),

    email: z
    .string()
    .trim()
    .email({message:"please enter a valid email address"})
    .max(100,{message:"email must be no more than 100 characters"}),

    password: z
    .string()
    .min(6 , {message:"Password must be al least 6 characters long"})
    .max(100 , {message:"Password must be no more than 100 characters"})
})

const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .email({message:"please enter a valid email address"})
    .max(100,{message:"email must be no more than 100 characters"}),

    password: z
    .string()
    .min(6 , {message:"Password must be al least 6 characters long"})
    .max(100 , {message:"Password must be no more than 100 characters"})
})

export {registerSchema , loginSchema};