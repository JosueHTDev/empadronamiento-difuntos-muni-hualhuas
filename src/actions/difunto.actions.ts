'use server'

import { revalidatePath } from 'next/cache'
import { listarRegistrosDifuntos, registrarDifunto } from '@/services/difunto.service'
import { registrarDifuntoConUrlsSchema } from '@/schemas/difunto.schema'

export async function obtenerDifuntosAction() {
  return listarRegistrosDifuntos()
}

export async function registrarDifuntoAction(input: unknown) {
  const parsed = registrarDifuntoConUrlsSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false as const, errors: parsed.error.flatten().fieldErrors }
  }

  const resultado = await registrarDifunto(parsed.data)

  if (!resultado.success) {
    return {
      success: false as const,
      errors: { general: [resultado.error] },
    }
  }

  revalidatePath('/admin')

  return { success: true as const }
}