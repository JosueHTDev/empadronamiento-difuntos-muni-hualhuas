"use client";

import { useState } from "react";
import { registrarDifuntoAction } from "@/actions/difunto.actions";

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
    dni: string;
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
  difunto: { nombres: "", apellidos: "", dni: "", fechaFallecimiento: "", ubicacionNicho: "" },
  documentos: { comprobantePago: null, actaDefuncion: null, fotografiaNicho: null },
  enviado: false,
};

export function useFormularioPasos() {
  const [pasoActual, setPasoActual] = useState(1);
  const [data, setData] = useState<FormularioData>(dataInicial);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string[]> | null>(null);
  const [mostrarExito, setMostrarExito] = useState(false);

  const actualizarTitular = (campo: keyof FormularioData["titular"], valor: any) =>
    setData((prev) => ({ ...prev, titular: { ...prev.titular, [campo]: valor } }));

  const actualizarDifunto = (campo: keyof FormularioData["difunto"], valor: any) =>
    setData((prev) => ({ ...prev, difunto: { ...prev.difunto, [campo]: valor } }));

  const actualizarDocumentos = (campo: keyof FormularioData["documentos"], valor: any) =>
    setData((prev) => ({ ...prev, documentos: { ...prev.documentos, [campo]: valor } }));

  const paso1Completo = Object.values(data.titular).every((v) => v !== "" && v !== null);
  const { dni, ...difuntoObligatorio } = data.difunto;
  const paso2Completo = Object.values(difuntoObligatorio).every((v) => v !== "");
  const paso3Completo = Object.values(data.documentos).every((v) => v !== null);
  const paso4Completo = data.enviado;

  const completados = [paso1Completo, paso2Completo, paso3Completo, paso4Completo];

  const siguientePaso = () => {
    if (pasoActual < PASOS.length) setPasoActual(pasoActual + 1);
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  const enviarFormulario = async () => {
    setEnviando(true);
    setErrores(null);

    const formData = new FormData();
    formData.append("titularNombres", data.titular.nombre);
    formData.append("titularApellidos", data.titular.apellido);
    formData.append("titularDni", data.titular.dni);
    formData.append("titularTelefono", data.titular.telefono);
    formData.append("titularParentesco", data.titular.parentesco);
    if (data.titular.archivoDni) {
      formData.append("titularArchivoDni", data.titular.archivoDni);
    }

    formData.append("difuntoNombres", data.difunto.nombres);
    formData.append("difuntoApellidos", data.difunto.apellidos);
    formData.append("difuntoDni", data.difunto.dni);
    formData.append("difuntoFechaFallecimiento", data.difunto.fechaFallecimiento);
    formData.append("difuntoUbicacionNicho", data.difunto.ubicacionNicho);

    if (data.documentos.comprobantePago) {
      formData.append("comprobantePago", data.documentos.comprobantePago);
    }
    if (data.documentos.actaDefuncion) {
      formData.append("actaDefuncion", data.documentos.actaDefuncion);
    }
    if (data.documentos.fotografiaNicho) {
      formData.append("fotografiaNicho", data.documentos.fotografiaNicho);
    }

    const resultado = await registrarDifuntoAction(formData);

    setEnviando(false);

    if (!resultado.success) {
      setErrores(resultado.errors ?? null);
      return;
    }

    setData(dataInicial);
    setPasoActual(1);
    setMostrarExito(true);
    setTimeout(() => setMostrarExito(false), 5000);
  };

  const limpiarFormulario = () => {
    setData(dataInicial);
    setPasoActual(1);
    setErrores(null);
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
    enviando,
    errores,
    mostrarExito,
    limpiarFormulario,
  };
}