'use server'

import { generarUrlSubidaFirmada } from '@/lib/r2'

export async function obtenerUrlSubidaAction(nombreArchivo: string, tipo: string, carpeta: string) {
  return generarUrlSubidaFirmada(nombreArchivo, tipo, carpeta)
}