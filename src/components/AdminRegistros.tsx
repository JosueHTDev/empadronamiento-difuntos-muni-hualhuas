"use client";

import { useMemo, useState } from "react";
import { FiUsers, FiUserCheck, FiInbox } from "react-icons/fi";
import { RegistroDifunto } from "@/types/registro.types";
import TablaRegistros from "@/components/TablaRegistros";
import ModalDetalleRegistro from "@/components/ModalDetalleRegistro";
import FiltrosRegistros, {
  FILTROS_INICIALES,
  FiltrosState,
  hayFiltrosActivos,
} from "@/components/FiltrosRegistros";
import { normalizarTexto } from "@/lib/texto";

function coincideTexto(registro: RegistroDifunto, texto: string) {
  if (!texto) return true;

  const objetivo = normalizarTexto(texto);
  const campos = [
    registro.nombres,
    registro.apellidos,
    registro.dni ?? "",
    registro.titular.nombres,
    registro.titular.apellidos,
    registro.titular.dni,
  ];

  return campos.some((campo) => normalizarTexto(campo).includes(objetivo));
}

function coincideRangoFecha(registro: RegistroDifunto, filtros: FiltrosState) {
  if (!filtros.fechaDesde && !filtros.fechaHasta) return true;

  const fechaBase = new Date(
    filtros.campoFecha === "fallecimiento" ? registro.fechaFallecimiento : registro.fechaRegistro
  );

  if (filtros.fechaDesde) {
    const desde = new Date(filtros.fechaDesde + "T00:00:00");
    if (fechaBase < desde) return false;
  }

  if (filtros.fechaHasta) {
    const hasta = new Date(filtros.fechaHasta + "T23:59:59");
    if (fechaBase > hasta) return false;
  }

  return true;
}

export default function AdminRegistros({
  registrosIniciales,
}: {
  registrosIniciales: RegistroDifunto[];
}) {
  const [registroSeleccionado, setRegistroSeleccionado] = useState<RegistroDifunto | null>(null);
  const [filtros, setFiltros] = useState<FiltrosState>(FILTROS_INICIALES);

  const registrosFiltrados = useMemo(() => {
    return registrosIniciales.filter(
      (registro) => coincideTexto(registro, filtros.texto) && coincideRangoFecha(registro, filtros)
    );
  }, [registrosIniciales, filtros]);

  const titularesUnicos = useMemo(() => {
    return new Set(registrosFiltrados.map((r) => r.titular.dni)).size;
  }, [registrosFiltrados]);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-5 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Registros de Difuntos</h1>
        <p className="text-sm text-gray-500">Consulta y gestión de difuntos empadronados</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <FiInbox size={18} />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 leading-none">{registrosFiltrados.length}</p>
            <p className="text-xs text-gray-500 mt-1">Difuntos registrados</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <FiUserCheck size={18} />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 leading-none">{titularesUnicos}</p>
            <p className="text-xs text-gray-500 mt-1">Titulares distintos</p>
          </div>
        </div>
      </div>

      <FiltrosRegistros filtros={filtros} onChange={setFiltros} />

      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 w-full">
        {registrosIniciales.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            Todavía no hay difuntos registrados.
          </p>
        ) : registrosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <FiUsers className="text-gray-300" size={28} />
            <p className="text-sm text-gray-500">
              No se encontraron registros con los filtros aplicados.
            </p>
            {hayFiltrosActivos(filtros) && (
              <button
                onClick={() => setFiltros(FILTROS_INICIALES)}
                className="text-sm font-medium text-green-700 hover:underline mt-1"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <TablaRegistros registros={registrosFiltrados} onVerDetalle={setRegistroSeleccionado} />
        )}
      </div>

      {registroSeleccionado && (
        <ModalDetalleRegistro registro={registroSeleccionado} onCerrar={() => setRegistroSeleccionado(null)} />
      )}
    </div>
  );
}
