"use client";

import { useState } from "react";

export const PASOS = [
  { id: 1, nombre: "Datos del Titular" },
  { id: 2, nombre: "Datos del Difunto" },
  { id: 3, nombre: "Documentos" },
  { id: 4, nombre: "Revisión y Envío" },
];

export interface FormularioData {
  titular: {
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    parentesco: string;
    archivoDni: File | null;
  };
  difunto: {
    nombres: string;
    apellidos: string;
    fechaFallecimiento: string;
    ubicacionNicho: string;
  };
  documentos: {
    comprobantePago: File | null;
    actaDefuncion: File | null;
    fotografiaNicho: File | null;
  };
  enviado: boolean;
}

const dataInicial: FormularioData = {
  titular: { nombre: "", apellido: "", dni: "", telefono: "", parentesco: "", archivoDni: null },
  difunto: { nombres: "", apellidos: "", fechaFallecimiento: "", ubicacionNicho: "" },
  documentos: { comprobantePago: null, actaDefuncion: null, fotografiaNicho: null },
  enviado: false,
};

export function useFormularioPasos() {
  const [pasoActual, setPasoActual] = useState(1);
  const [data, setData] = useState<FormularioData>(dataInicial);

  const actualizarTitular = (campo: keyof FormularioData["titular"], valor: any) =>
    setData((prev) => ({ ...prev, titular: { ...prev.titular, [campo]: valor } }));

  const actualizarDifunto = (campo: keyof FormularioData["difunto"], valor: any) =>
    setData((prev) => ({ ...prev, difunto: { ...prev.difunto, [campo]: valor } }));

  const actualizarDocumentos = (campo: keyof FormularioData["documentos"], valor: any) =>
    setData((prev) => ({ ...prev, documentos: { ...prev.documentos, [campo]: valor } }));

  const paso1Completo = Object.values(data.titular).every((v) => v !== "" && v !== null);
  const paso2Completo = Object.values(data.difunto).every((v) => v !== "");
  const paso3Completo = Object.values(data.documentos).every((v) => v !== null);
  const paso4Completo = data.enviado;

  const completados = [paso1Completo, paso2Completo, paso3Completo, paso4Completo];

  const siguientePaso = () => {
    if (pasoActual < PASOS.length) setPasoActual(pasoActual + 1);
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  const enviarFormulario = () => setData((prev) => ({ ...prev, enviado: true }));

  const limpiarFormulario = () => {
    setData(dataInicial);
    setPasoActual(1);
  };

  return {
    pasoActual,
    setPasoActual,
    data,
    actualizarTitular,
    actualizarDifunto,
    actualizarDocumentos,
    completados,
    siguientePaso,
    pasoAnterior,
    enviarFormulario,
    limpiarFormulario,
  };
}