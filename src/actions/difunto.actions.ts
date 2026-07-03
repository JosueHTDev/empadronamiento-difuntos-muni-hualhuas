"use server"

import { listarDifuntos } from "@/services/difunto.service"

export async function obtenerDifuntosAction() {
    const difuntos = await listarDifuntos();
    return difuntos;
}