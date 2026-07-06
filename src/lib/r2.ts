import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!

export async function subirArchivo(archivo: File, carpeta: string): Promise<string> {
  const extension = archivo.name.split('.').pop()
  const nombreUnico = `${carpeta}/${crypto.randomUUID()}.${extension}`

  const buffer = Buffer.from(await archivo.arrayBuffer())

  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: nombreUnico,
      Body: buffer,
      ContentType: archivo.type,
    })
  )

  return `${R2_PUBLIC_URL}/${nombreUnico}`
}