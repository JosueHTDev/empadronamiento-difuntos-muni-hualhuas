"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { RegistroTitular } from "@/types/registro.types";

export default function ModalDetalleRegistro({
  registro,
  onCerrar,
}: {
  registro: RegistroTitular;
  onCerrar: () => void;
}) {
  const [difuntoActivo, setDifuntoActivo] = useState(0);
  const difunto = registro.difuntos[difuntoActivo];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Detalle del registro</h2>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {registro.difuntos.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {registro.difuntos.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setDifuntoActivo(i)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-md border ${
                    i === difuntoActivo
                      ? "bg-green-700 text-white border-green-700"
                      : "text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {d.nombres} {d.apellidos}
                </button>
              ))}
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Datos del Difunto</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Nombre completo:</span>
              <span className="text-gray-800">{difunto.nombres} {difunto.apellidos}</span>
              <span className="text-gray-500">Fecha de fallecimiento:</span>
              <span className="text-gray-800">{difunto.fechaFallecimiento}</span>
              <span className="text-gray-500">Ubicación del nicho:</span>
              <span className="text-gray-800">{difunto.ubicacionNicho}</span>
              <span className="text-gray-500">Fecha de registro:</span>
              <span className="text-gray-800">{difunto.fechaRegistro}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Documentos adjuntos</h3>
            <div className="flex flex-col gap-2">
              {difunto.documentos.map((doc) => (
                <div key={doc.nombre} className="flex items-center justify-between text-sm border border-gray-200 rounded-md px-3 py-2">
                  <span className="text-gray-700">{doc.nombre}</span>
                  <div className="flex gap-3 text-green-700 font-medium">
                    <button>Ver</button>
                    <button>Descargar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onCerrar}
            className="border border-gray-300 text-gray-600 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}