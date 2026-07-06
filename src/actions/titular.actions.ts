'use server'

import { listarRegistros } from '@/services/titular.service'

export async function obtenerRegistrosAction() {
  return listarRegistros()
}