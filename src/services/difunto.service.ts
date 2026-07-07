import { difuntoRepository } from '@/repositories/difunto.repository'
import { titularRepository } from '@/repositories/titular.repository'
import { subirArchivo } from '@/lib/r2'
import type { RegistrarDifuntoInput } from '@/schemas/difunto.schema'

export function listarDifuntos() {
  return difuntoRepository.findAll()
}

export async function registrarDifunto(input: RegistrarDifuntoInput) {
  const tieneDni = !!input.difuntoDni

  // Validar duplicado: por DNI si existe, si no por nombre + fecha
  const duplicado = tieneDni
    ? await difuntoRepository.findPorDni(input.difuntoDni!)
    : await difuntoRepository.findPorNombreYFecha(
        input.difuntoNombres,
        input.difuntoApellidos,
        input.difuntoFechaFallecimiento
      )

  if (duplicado) {
    return {
      success: false as const,
      error: 'Este difunto ya se encuentra registrado en el sistema.',
    }
  }

  const [archivoDniUrl, documentoDefuncionUrl, comprobanteUrl, fotografiaNichoUrl] =
    await Promise.all([
      subirArchivo(input.titularArchivoDni, 'titulares'),
      subirArchivo(input.actaDefuncion, 'difuntos'),
      subirArchivo(input.comprobantePago, 'difuntos'),
      subirArchivo(input.fotografiaNicho, 'difuntos'),
    ])

  const titular = await titularRepository.upsert({
    nombres: input.titularNombres,
    apellidos: input.titularApellidos,
    dni: input.titularDni,
    telefono: input.titularTelefono,
    parentesco: input.titularParentesco,
    archivoDniUrl,
  })

  const difunto = await difuntoRepository.create({
    nombres: input.difuntoNombres,
    apellidos: input.difuntoApellidos,
    dni: input.difuntoDni || undefined,
    fechaFallecimiento: input.difuntoFechaFallecimiento,
    ubicacionNicho: input.difuntoUbicacionNicho,
    documentoDefuncionUrl,
    comprobanteUrl,
    fotografiaNichoUrl,
    titularId: titular.id,
  })

  return { success: true as const, difunto }
}