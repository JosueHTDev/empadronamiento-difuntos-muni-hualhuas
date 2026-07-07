"use client";

import { FiSearch, FiX, FiCalendar } from "react-icons/fi";

export interface FiltrosState {
  texto: string;
  campoFecha: "fallecimiento" | "registro";
  fechaDesde: string;
  fechaHasta: string;
}

export const FILTROS_INICIALES: FiltrosState = {
  texto: "",
  campoFecha: "fallecimiento",
  fechaDesde: "",
  fechaHasta: "",
};

export function hayFiltrosActivos(filtros: FiltrosState) {
  return (
    filtros.texto.trim() !== "" ||
    filtros.fechaDesde !== "" ||
    filtros.fechaHasta !== ""
  );
}

export default function FiltrosRegistros({
  filtros,
  onChange,
}: {
  filtros: FiltrosState;
  onChange: (filtros: FiltrosState) => void;
}) {
  const actualizar = (cambios: Partial<FiltrosState>) => {
    onChange({ ...filtros, ...cambios });
  };

  return (
    <div className="flex flex-col gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={filtros.texto}
          onChange={(e) => actualizar({ texto: e.target.value })}
          placeholder="Buscar por nombre o DNI (difunto o titular)"
          className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Filtrar fecha de</label>
          <select
            value={filtros.campoFecha}
            onChange={(e) =>
              actualizar({ campoFecha: e.target.value as FiltrosState["campoFecha"] })
            }
            className="text-sm rounded-md border border-gray-300 bg-white px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700"
          >
            <option value="fallecimiento">Fallecimiento</option>
            <option value="registro">Registro</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
            <FiCalendar size={12} /> Desde
          </label>
          <input
            type="date"
            value={filtros.fechaDesde}
            onChange={(e) => actualizar({ fechaDesde: e.target.value })}
            className="text-sm rounded-md border border-gray-300 bg-white px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
            <FiCalendar size={12} /> Hasta
          </label>
          <input
            type="date"
            value={filtros.fechaHasta}
            onChange={(e) => actualizar({ fechaHasta: e.target.value })}
            className="text-sm rounded-md border border-gray-300 bg-white px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700"
          />
        </div>

        {hayFiltrosActivos(filtros) && (
          <button
            onClick={() => onChange(FILTROS_INICIALES)}
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 border border-gray-300 hover:border-red-300 rounded-md px-3 py-2 transition-colors"
          >
            <FiX size={14} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
