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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 -mt-6 mx-6 relative z-10">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-green-600 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((pasoActual - 1) / (PASOS.length - 1)) * 100}%` }}
        />
        
        {PASOS.map((paso, i) => {
          const completo = completados[i];
          const activo = paso.id === pasoActual;
          const Icono = ICONOS_PASOS[i];
          
          return (
            <div key={paso.id} className="flex flex-col items-center gap-2 relative z-10 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  completo 
                    ? "bg-green-600 text-white shadow-lg shadow-green-200" 
                    : activo 
                      ? "bg-green-600 text-white shadow-lg shadow-green-200 ring-4 ring-green-100" 
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {completo ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{paso.id}</span>
                )}
              </div>
              <span className={`text-xs font-medium transition-colors duration-200 ${
                activo ? "text-green-700" : completo ? "text-gray-700" : "text-gray-400"
              }`}>
                {paso.nombre}
              </span>
              {activo && (
                <div className="w-6 h-1 rounded-full bg-green-600 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}