"use client";

import { FiX, FiPhone, FiUser } from "react-icons/fi";
import { RegistroDifunto } from "@/types/registro.types";

export default function ModalDetalleRegistro({
  registro,
  onCerrar,
}: {
  registro: RegistroDifunto;
  onCerrar: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Detalle del difunto</h2>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Datos del Difunto</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Nombre completo:</span>
              <span className="text-gray-800">{registro.nombres} {registro.apellidos}</span>
              <span className="text-gray-500">DNI:</span>
              <span className="text-gray-800">{registro.dni || "No registrado"}</span>
              <span className="text-gray-500">Fecha de fallecimiento:</span>
              <span className="text-gray-800">
                {new Date(registro.fechaFallecimiento).toLocaleDateString('es-PE')}
              </span>
              <span className="text-gray-500">Ubicación del nicho:</span>
              <span className="text-gray-800">{registro.ubicacionNicho}</span>
              <span className="text-gray-500">Fecha de registro:</span>
              <span className="text-gray-800">
                {new Date(registro.fechaRegistro).toLocaleDateString('es-PE', { dateStyle: 'medium' })}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
              <FiUser size={14} className="text-gray-500" />
              Titular / Responsable
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Nombre completo:</span>
              <span className="text-gray-800">{registro.titular.nombres} {registro.titular.apellidos}</span>
              <span className="text-gray-500">DNI:</span>
              <span className="text-gray-800">{registro.titular.dni}</span>
              <span className="text-gray-500">Parentesco:</span>
              <span className="text-gray-800">{registro.titular.parentesco}</span>
              <span className="text-gray-500">Celular:</span>
              <span className="text-gray-800 flex items-center gap-1.5">
                <FiPhone size={12} className="text-gray-400" />
                {registro.titular.celular}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Documentos adjuntos</h3>
            <div className="flex flex-col gap-2">
              {registro.documentos.map((doc) => (
                <div key={doc.nombre} className="flex items-center justify-between text-sm border border-gray-200 rounded-md px-3 py-2">
                  <span className="text-gray-700">{doc.nombre}</span>
                  <div className="flex gap-3 text-green-700 font-medium">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">Ver</a>
                    <a href={doc.url} download>Descargar</a>
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
