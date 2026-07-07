import { z } from 'zod'

const TIPOS_PDF = ['application/pdf']
const TIPOS_IMAGEN = ['image/jpeg', 'image/jpg', 'image/png']

function crearArchivoSchema(tiposPermitidos: string[], mensajeTipo: string) {
  return z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'El archivo no debe superar 10 MB')
    .refine((file) => tiposPermitidos.includes(file.type), mensajeTipo)
}

const archivoPdf = crearArchivoSchema(TIPOS_PDF, 'El archivo debe ser un PDF')
const archivoPdfOImagen = crearArchivoSchema(
  [...TIPOS_PDF, ...TIPOS_IMAGEN],
  'El archivo debe ser PDF, JPG o PNG'
)
const archivoImagen = crearArchivoSchema(TIPOS_IMAGEN, 'El archivo debe ser una imagen (JPG o PNG)')

export const registrarDifuntoSchema = z.object({
  titularNombres: z.string().min(2, 'Nombres requeridos'),
  titularApellidos: z.string().min(2, 'Apellidos requeridos'),
  titularDni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  titularTelefono: z.string().min(9, 'Teléfono inválido'),
  titularParentesco: z.string().min(2, 'Parentesco requerido'),
  titularArchivoDni: archivoPdfOImagen,

  difuntoNombres: z.string().min(2, 'Nombres del difunto requeridos'),
  difuntoApellidos: z.string().min(2, 'Apellidos del difunto requeridos'),
  difuntoDni: z
    .string()
    .length(8, 'El DNI debe tener 8 dígitos')
    .optional()
    .or(z.literal('')),
  difuntoFechaFallecimiento: z
    .string()
    .min(1, 'Fecha requerida')
    .refine((fecha) => {
      const hoy = new Date().toISOString().split('T')[0]
      return fecha < hoy
    }, 'La fecha de fallecimiento debe ser anterior a hoy'),
  difuntoUbicacionNicho: z.string().min(2, 'Ubicación del nicho requerida'),

  comprobantePago: archivoPdf,
  actaDefuncion: archivoPdf,
  fotografiaNicho: archivoImagen,
})

export type RegistrarDifuntoInput = z.infer<typeof registrarDifuntoSchema>

export const pasoTitularSchema = registrarDifuntoSchema.pick({
  titularNombres: true,
  titularApellidos: true,
  titularDni: true,
  titularTelefono: true,
  titularParentesco: true,
  titularArchivoDni: true,
})

export const pasoDifuntoSchema = registrarDifuntoSchema.pick({
  difuntoNombres: true,
  difuntoApellidos: true,
  difuntoDni: true,
  difuntoFechaFallecimiento: true,
  difuntoUbicacionNicho: true,
})

export const pasoDocumentosSchema = registrarDifuntoSchema.pick({
  comprobantePago: true,
  actaDefuncion: true,
  fotografiaNicho: true,
})

export const schemasPorPaso = [pasoTitularSchema, pasoDifuntoSchema, pasoDocumentosSchema]