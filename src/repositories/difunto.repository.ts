import { prisma } from '@/lib/prisma'

export const difuntoRepository = {
  findAll: () => {
    return prisma.difunto.findMany({
      include: { titular: true },
      orderBy: { fechaRegistro: 'desc' },
    })
  },

  findDuplicado: (nombres: string, apellidos: string, fechaFallecimiento: Date) => {
    return prisma.difunto.findFirst({
      where: { nombres, apellidos, fechaFallecimiento },
    })
  },

  create: (data: {
    nombres: string
    apellidos: string
    fechaFallecimiento: Date
    ubicacionNicho: string
    documentoDefuncionUrl: string
    comprobanteUrl: string
    fotografiaNichoUrl: string
    titularId: number
  }) => {
    return prisma.difunto.create({ data })
  },
}