import { difuntoRepository } from '@/repositories/difunto.repository'
import { titularRepository } from '@/repositories/titular.repository'
import { subirArchivo } from '@/lib/r2'
import type { RegistrarDifuntoInput } from '@/schemas/difunto.schema'
import type { RegistroDifunto, Documento } from '@/types/registro.types'

function detectarTipo(url: string): "PDF" | "JPG" {
  const extension = url.split('.').pop()?.toLowerCase()
  return extension === 'pdf' ? 'PDF' : 'JPG'
}

function crearDocumento(nombre: string, url: string | null): Documento | null {
  if (!url) return null
  return { nombre, tipo: detectarTipo(url), url }
}

export function listarDifuntos() {
  return difuntoRepository.findAll()
}

export async function listarRegistrosDifuntos(): Promise<RegistroDifunto[]> {
  const difuntos = await difuntoRepository.findAll()

  return difuntos.map((d) => ({
    id: d.id.toString(),
    nombres: d.nombres,
    apellidos: d.apellidos,
    dni: d.dni,
    fechaFallecimiento: d.fechaFallecimiento.toISOString(),
    fechaRegistro: d.fechaRegistro.toISOString(),
    ubicacionNicho: d.ubicacionNicho,
    documentos: [
      crearDocumento('Acta de defunción', d.documentoDefuncionUrl),
      crearDocumento('Comprobante de pago', d.comprobanteUrl),
      crearDocumento('Fotografía del nicho', d.fotografiaNichoUrl),
    ].filter((doc): doc is Documento => doc !== null),
    titular: {
      nombres: d.titular.nombres,
      apellidos: d.titular.apellidos,
      dni: d.titular.dni,
      celular: d.titular.telefono,
      parentesco: d.titular.parentesco,
    },
  }))
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