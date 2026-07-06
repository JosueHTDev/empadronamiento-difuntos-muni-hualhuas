import { titularRepository } from '@/repositories/titular.repository'
import type { RegistroTitular, Documento } from '@/types/registro.types'

function detectarTipo(url: string): "PDF" | "JPG" {
  const extension = url.split('.').pop()?.toLowerCase()
  return extension === 'pdf' ? 'PDF' : 'JPG'
}

function crearDocumento(nombre: string, url: string | null): Documento | null {
  if (!url) return null
  return { nombre, tipo: detectarTipo(url), url }
}

export async function listarRegistros(): Promise<RegistroTitular[]> {
  const titulares = await titularRepository.findAllConDifuntos()

  return titulares.map((t) => ({
    id: t.id.toString(),
    titular: {
      nombres: t.nombres,
      apellidos: t.apellidos,
      dni: t.dni,
      celular: t.telefono,
      parentesco: t.parentesco,
    },
    difuntos: t.difuntos.map((d) => ({
      id: d.id.toString(),
      nombres: d.nombres,
      apellidos: d.apellidos,
      fechaFallecimiento: d.fechaFallecimiento.toISOString(),
      fechaRegistro: d.fechaRegistro.toISOString(),
      ubicacionNicho: d.ubicacionNicho,
      documentos: [
        crearDocumento('Acta de defunción', d.documentoDefuncionUrl),
        crearDocumento('Comprobante de pago', d.comprobanteUrl),
        crearDocumento('Fotografía del nicho', d.fotografiaNichoUrl),
      ].filter((doc): doc is Documento => doc !== null),
    })),
  }))
}