import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return null

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; usuario: string }
    return payload
  } catch {
    return null
  }
}