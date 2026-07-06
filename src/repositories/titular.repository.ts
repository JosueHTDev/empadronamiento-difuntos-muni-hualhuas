import { prisma } from '@/lib/prisma'

export const titularRepository = {
  upsert: (data: {
    nombres: string
    apellidos: string
    dni: string
    telefono: string
    parentesco: string
    archivoDniUrl: string
  }) => {
    return prisma.titular.upsert({
      where: { dni: data.dni },
      update: data,
      create: data,
    })
  },

  findAllConDifuntos: () => {
    return prisma.titular.findMany({
      include: { difuntos: { orderBy: { fechaRegistro: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    })
  },
}