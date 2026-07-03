import { prisma } from '@/lib/prisma'

export const difuntoRepository = {
  findAll: () => {
    return prisma.difunto.findMany({
      include: { titular: true },
      orderBy: { fechaRegistro: 'desc' },
    })
  },
}