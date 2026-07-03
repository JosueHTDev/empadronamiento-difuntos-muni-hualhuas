import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const result = await prisma.$queryRaw`SELECT NOW()`
  console.log('Conexión exitosa:', result)
}

main()
  .catch((e) => {
    console.error('Error de conexión:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })