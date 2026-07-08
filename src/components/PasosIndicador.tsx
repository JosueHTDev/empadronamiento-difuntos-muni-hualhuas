import { PASOS } from "@/hooks/useFormularioPasos";
import { FiCheck, FiUser, FiFileText, FiSend } from "react-icons/fi";

const ICONOS_PASOS = [
  FiUser,
  FiUser,
  FiFileText,
  FiSend,
];

export default function PasosIndicador({
  pasoActual,
  completados,
}: {
  pasoActual: number;
  completados: boolean[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-3 sm:px-8 py-4 sm:py-6 -mt-4 sm:-mt-6 mx-3 sm:mx-6 relative z-10">
      <div className="flex justify-between items-start sm:items-center relative">
        <div className="absolute top-5 sm:top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute top-5 sm:top-1/2 left-0 h-0.5 bg-green-600 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((pasoActual - 1) / (PASOS.length - 1)) * 100}%` }}
        />
        
        {PASOS.map((paso, i) => {
          const completo = completados[i];
          const activo = paso.id === pasoActual;
          const Icono = ICONOS_PASOS[i];
          
          return (
            <div key={paso.id} className="flex flex-col items-center gap-1 sm:gap-2 relative z-10 flex-1">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  completo 
                    ? "bg-green-600 text-white shadow-lg shadow-green-200" 
                    : activo 
                      ? "bg-green-600 text-white shadow-lg shadow-green-200 ring-2 sm:ring-4 ring-green-100" 
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {completo ? (
                  <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span className="text-xs sm:text-sm font-semibold">{paso.id}</span>
                )}
              </div>
              <span className={`text-[9px] sm:text-xs font-medium transition-colors duration-200 text-center leading-tight ${
                activo ? "text-green-700" : completo ? "text-gray-700" : "text-gray-400"
              }`}>
                {paso.nombre}
              </span>
              {activo && (
                <div className="w-4 sm:w-6 h-0.5 sm:h-1 rounded-full bg-green-600 animate-pulse mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}