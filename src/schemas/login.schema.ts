import { z } from "zod";

export const loginSchema = z.object({
    usuario: z.string().min(1, "Se necesita el usuario"),
    password: z.string().min(1, "Se necesita la contraseña")
})

export type LoginInput = z.infer<typeof loginSchema>