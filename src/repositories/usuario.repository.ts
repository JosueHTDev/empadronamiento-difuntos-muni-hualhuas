import { prisma } from "@/lib/prisma";

export const usuarioRepository = {
  findByUsuario: (usuario: string) => {
    return prisma.usuario.findUnique({ where: { usuario } })
  },
}