import { difuntoRepository } from "@/repositories/difunto.repository";

export function listarDifuntos() {
    return difuntoRepository.findAll();
}