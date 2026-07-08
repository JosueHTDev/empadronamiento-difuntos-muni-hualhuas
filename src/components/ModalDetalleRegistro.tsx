"use client";

import { FiX, FiPhone, FiUser, FiCalendar, FiMapPin, FiFile, FiDownload, FiEye, FiUserCheck } from "react-icons/fi";

export default function ModalDetalleRegistro({
  registro,
  onCerrar,
}: {
  registro: any;
  onCerrar: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiUser className="w-5 h-5 text-green-600" />
            Detalle del difunto
          </h2>
          <button 
            onClick={onCerrar} 
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl p-2 transition-all duration-200"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUser className="w-4 h-4 text-green-600" />
              Datos del Difunto
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="col-span-2 flex items-start gap-2 border-b border-green-100 pb-2">
                <span className="text-gray-500 min-w-25">Nombre completo:</span>
                <span className="text-gray-800 font-medium">{registro.nombres} {registro.apellidos}</span>
              </div>
              <div className="col-span-2 flex items-start gap-2 border-b border-green-100 pb-2">
                <span className="text-gray-500 min-w-25">DNI:</span>
                <span className="text-gray-800">{registro.dni || "No registrado"}</span>
              </div>
              <div className="col-span-2 flex items-start gap-2 border-b border-green-100 pb-2">
                <span className="text-gray-500 min-w-25 flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  Fecha fallecimiento:
                </span>
                <span className="text-gray-800">
                  {new Date(registro.fechaFallecimiento).toLocaleDateString('es-PE', { 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="col-span-2 flex items-start gap-2 border-b border-green-100 pb-2">
                <span className="text-gray-500 min-w-25 flex items-center gap-1">
                  <FiMapPin className="w-3 h-3" />
                  Ubicación:
                </span>
                <span className="text-gray-800">{registro.ubicacionNicho}</span>
              </div>
              <div className="col-span-2 flex items-start gap-2">
                <span className="text-gray-500 min-w-25">Fecha registro:</span>
                <span className="text-gray-800">
                  {new Date(registro.fechaRegistro).toLocaleDateString('es-PE', { 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUserCheck className="w-4 h-4 text-blue-600" />
              Titular / Responsable
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="col-span-2 flex items-start gap-2 border-b border-blue-100 pb-2">
                <span className="text-gray-500 min-w-25">Nombre completo:</span>
                <span className="text-gray-800 font-medium">{registro.titular.nombres} {registro.titular.apellidos}</span>
              </div>
              <div className="col-span-2 flex items-start gap-2 border-b border-blue-100 pb-2">
                <span className="text-gray-500 min-w-25">DNI:</span>
                <span className="text-gray-800">{registro.titular.dni}</span>
              </div>
              <div className="col-span-2 flex items-start gap-2 border-b border-blue-100 pb-2">
                <span className="text-gray-500 min-w-25">Parentesco:</span>
                <span className="text-gray-800">{registro.titular.parentesco}</span>
              </div>
              <div className="col-span-2 flex items-start gap-2">
                <span className="text-gray-500 min-w-25 flex items-center gap-1">
                  <FiPhone className="w-3 h-3" />
                  Celular:
                </span>
                <span className="text-gray-800">{registro.titular.celular}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiFile className="w-4 h-4 text-gray-600" />
              Documentos adjuntos
            </h3>
            <div className="flex flex-col gap-2">
              {registro.documentos.map((doc: any) => (
                <div key={doc.nombre} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-sm transition-all duration-200">
                  <span className="text-sm text-gray-700 truncate flex-1">{doc.nombre}</span>
                  <div className="flex gap-2 ml-4">
                    <a 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-green-700 hover:text-green-800 hover:bg-green-50 px-3 py-1 rounded-lg transition-colors duration-200"
                    >
                      <FiEye className="w-3 h-3" />
                      Ver
                    </a>
                    <a 
                      href={doc.url} 
                      download
                      className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors duration-200"
                    >
                      <FiDownload className="w-3 h-3" />
                      Descargar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white z-10 px-6 py-4 border-t border-gray-100 rounded-b-2xl flex justify-end">
          <button
            onClick={onCerrar}
            className="border border-gray-300 text-gray-600 rounded-xl px-6 py-2.5 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}