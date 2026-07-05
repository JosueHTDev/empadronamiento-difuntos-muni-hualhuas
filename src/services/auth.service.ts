import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { usuarioRepository } from "@/repositories/usuario.repository"
import type { LoginInput } from "@/schemas/login.schema"

const JWT_SECRET = process.env.JWT_SECRET!

export async function login(input: LoginInput) {
  const usuario = await usuarioRepository.findByUsuario(input.usuario)

  if (!usuario) {
    return { success: false as const, error: "Usuario o contraseña incorrectos" }
  }

  const passwordValida = await bcrypt.compare(input.password, usuario.password)

  if (!passwordValida) {
    return { success: false as const, error: "Usuario o contraseña incorrectos" }
  }

  const token = jwt.sign(
    { id: usuario.id, usuario: usuario.usuario },
    JWT_SECRET,
    { expiresIn: "8h" }
  )

  return { success: true as const, token }
}