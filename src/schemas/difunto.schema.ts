import { z } from 'zod'

const archivoSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 10 * 1024 * 1024, 'El archivo no debe superar 10 MB')

export const registrarDifuntoSchema = z.object({
  titularNombres: z.string().min(2, 'Nombres requeridos'),
  titularApellidos: z.string().min(2, 'Apellidos requeridos'),
  titularDni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  titularTelefono: z.string().min(9, 'Teléfono inválido'),
  titularParentesco: z.string().min(2, 'Parentesco requerido'),
  titularArchivoDni: archivoSchema,

  difuntoNombres: z.string().min(2, 'Nombres del difunto requeridos'),
  difuntoApellidos: z.string().min(2, 'Apellidos del difunto requeridos'),
  difuntoFechaFallecimiento: z.coerce.date({ error: 'Fecha inválida' }),
  difuntoUbicacionNicho: z.string().min(2, 'Ubicación del nicho requerida'),

  comprobantePago: archivoSchema,
  actaDefuncion: archivoSchema,
  fotografiaNicho: archivoSchema,
})

export type RegistrarDifuntoInput = z.infer<typeof registrarDifuntoSchema>