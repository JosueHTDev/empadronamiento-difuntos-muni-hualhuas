'use server'

import { revalidatePath } from 'next/cache'
import { listarRegistrosDifuntos, registrarDifunto } from '@/services/difunto.service'
import { registrarDifuntoSchema } from '@/schemas/difunto.schema'

export async function obtenerDifuntosAction() {
  return listarRegistrosDifuntos()
}

export async function registrarDifuntoAction(formData: FormData) {
  const raw = {
    titularNombres: formData.get('titularNombres'),
    titularApellidos: formData.get('titularApellidos'),
    titularDni: formData.get('titularDni'),
    titularTelefono: formData.get('titularTelefono'),
    titularParentesco: formData.get('titularParentesco'),
    titularArchivoDni: formData.get('titularArchivoDni'),

    difuntoNombres: formData.get('difuntoNombres'),
    difuntoApellidos: formData.get('difuntoApellidos'),
    difuntoDni: formData.get('difuntoDni'),
    difuntoFechaFallecimiento: formData.get('difuntoFechaFallecimiento'),
    difuntoUbicacionNicho: formData.get('difuntoUbicacionNicho'),

    comprobantePago: formData.get('comprobantePago'),
    actaDefuncion: formData.get('actaDefuncion'),
    fotografiaNicho: formData.get('fotografiaNicho'),
  }

  const parsed = registrarDifuntoSchema.safeParse(raw)

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