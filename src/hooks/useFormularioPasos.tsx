"use client";

import { useState } from "react";
import { registrarDifuntoAction } from "@/actions/difunto.actions";
import { obtenerUrlSubidaAction } from "@/actions/r2.actions";
import { schemasPorPaso } from "@/schemas/difunto.schema";

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

async function subirArchivoAR2(archivo: File, carpeta: string): Promise<string> {
  const { urlSubida, urlPublica } = await obtenerUrlSubidaAction(archivo.name, archivo.type, carpeta);

  const respuesta = await fetch(urlSubida, {
    method: "PUT",
    body: archivo,
    headers: { "Content-Type": archivo.type },
  });

  if (!respuesta.ok) {
    throw new Error(`No se pudo subir ${archivo.name}`);
  }

  return urlPublica;
}

export function useFormularioPasos() {
  const [pasoActual, setPasoActual] = useState(1);
  const [data, setData] = useState<FormularioData>(dataInicial);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string[]> | null>(null);
  const [erroresPaso, setErroresPaso] = useState<Record<string, string>>({});
  const [mostrarExito, setMostrarExito] = useState(false);

  const actualizarTitular = (campo: keyof FormularioData["titular"], valor: any) =>
    setData((prev) => ({ ...prev, titular: { ...prev.titular, [campo]: valor } }));

  const actualizarDifunto = (campo: keyof FormularioData["difunto"], valor: any) =>
    setData((prev) => ({ ...prev, difunto: { ...prev.difunto, [campo]: valor } }));

  const actualizarDocumentos = (campo: keyof FormularioData["documentos"], valor: any) =>
    setData((prev) => ({ ...prev, documentos: { ...prev.documentos, [campo]: valor } }));

  const mapearDatosAPlano = () => ({
    titularNombres: data.titular.nombre,
    titularApellidos: data.titular.apellido,
    titularDni: data.titular.dni,
    titularTelefono: data.titular.telefono,
    titularParentesco: data.titular.parentesco,
    titularArchivoDni: data.titular.archivoDni,
    difuntoNombres: data.difunto.nombres,
    difuntoApellidos: data.difunto.apellidos,
    difuntoDni: data.difunto.dni,
    difuntoFechaFallecimiento: data.difunto.fechaFallecimiento,
    difuntoUbicacionNicho: data.difunto.ubicacionNicho,
    comprobantePago: data.documentos.comprobantePago,
    actaDefuncion: data.documentos.actaDefuncion,
    fotografiaNicho: data.documentos.fotografiaNicho,
  });

  const validarPaso = (paso: number) => {
    const schema = schemasPorPaso[paso - 1];
    if (!schema) return true;

    const resultado = schema.safeParse(mapearDatosAPlano());

    if (!resultado.success) {
      const nuevosErrores: Record<string, string> = {};
      resultado.error.issues.forEach((issue) => {
        nuevosErrores[issue.path[0] as string] = issue.message;
      });
      setErroresPaso(nuevosErrores);
      return false;
    }

    setErroresPaso({});
    return true;
  };

  const validarCampo = (nombreCampo: string, valorTemporal?: any) => {
    const schema = schemasPorPaso[pasoActual - 1];
    if (!schema) return;

    const datosParaValidar = mapearDatosAPlano();
    if (valorTemporal !== undefined) {
      (datosParaValidar as any)[nombreCampo] = valorTemporal;
    }

    const resultado = schema.safeParse(datosParaValidar);

    setErroresPaso((prev) => {
      const nuevosErrores = { ...prev };

      if (resultado.success) {
        delete nuevosErrores[nombreCampo];
        return nuevosErrores;
      }

      const issue = resultado.error.issues.find((i) => i.path[0] === nombreCampo);

      if (issue) {
        nuevosErrores[nombreCampo] = issue.message;
      } else {
        delete nuevosErrores[nombreCampo];
      }
      return nuevosErrores;
    });
  };

  const pasoActualEsValido = (paso: number = pasoActual) => {
    const schema = schemasPorPaso[paso - 1];
    if (!schema) return true;
    return schema.safeParse(mapearDatosAPlano()).success;
  };

  const paso1Completo = pasoActualEsValido(1);
  const paso2Completo = pasoActualEsValido(2);
  const paso3Completo = pasoActualEsValido(3);
  const paso4Completo = data.enviado;

  const completados = [paso1Completo, paso2Completo, paso3Completo, paso4Completo];

  const siguientePaso = () => {
    if (!validarPaso(pasoActual)) return;
    if (pasoActual < PASOS.length) setPasoActual(pasoActual + 1);
  };

  const pasoAnterior = () => {
    setErroresPaso({});
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  const enviarFormulario = async () => {
    setEnviando(true);
    setErrores(null);

    try {
      const [titularArchivoDniUrl, comprobantePagoUrl, actaDefuncionUrl, fotografiaNichoUrl] =
        await Promise.all([
          subirArchivoAR2(data.titular.archivoDni!, "titulares"),
          subirArchivoAR2(data.documentos.comprobantePago!, "difuntos"),
          subirArchivoAR2(data.documentos.actaDefuncion!, "difuntos"),
          subirArchivoAR2(data.documentos.fotografiaNicho!, "difuntos"),
        ]);

      const resultado = await registrarDifuntoAction({
        titularNombres: data.titular.nombre,
        titularApellidos: data.titular.apellido,
        titularDni: data.titular.dni,
        titularTelefono: data.titular.telefono,
        titularParentesco: data.titular.parentesco,
        titularArchivoDniUrl,

        difuntoNombres: data.difunto.nombres,
        difuntoApellidos: data.difunto.apellidos,
        difuntoDni: data.difunto.dni,
        difuntoFechaFallecimiento: data.difunto.fechaFallecimiento,
        difuntoUbicacionNicho: data.difunto.ubicacionNicho,

        comprobantePagoUrl,
        actaDefuncionUrl,
        fotografiaNichoUrl,
      });

      setEnviando(false);

      if (!resultado.success) {
        setErrores(resultado.errors ?? null);
        return;
      }

      setData(dataInicial);
      setPasoActual(1);
      setErroresPaso({});
      setMostrarExito(true);
      setTimeout(() => setMostrarExito(false), 5000);
    } catch (e) {
      setEnviando(false);
      setErrores({ general: ["Ocurrió un error al subir los archivos. Intenta nuevamente."] });
    }
  };

  const limpiarFormulario = () => {
    setData(dataInicial);
    setPasoActual(1);
    setErrores(null);
    setErroresPaso({});
  };

  return {
    pasoActual,
    setPasoActual,
    data,
    actualizarTitular,
    actualizarDifunto,
    actualizarDocumentos,
    completados,
    erroresPaso,
    validarCampo,
    pasoActualEsValido,
    siguientePaso,
    pasoAnterior,
    enviarFormulario,
    enviando,
    errores,
    mostrarExito,
    limpiarFormulario,
  };
}