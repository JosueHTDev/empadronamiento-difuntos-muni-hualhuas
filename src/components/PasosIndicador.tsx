import { PASOS } from "@/hooks/useFormularioPasos";

export default function PasosIndicador({
  pasoActual,
  completados,
}: {
  pasoActual: number;
  completados: boolean[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex justify-between px-8 py-6 -mt-6 mx-6 relative z-10">
      {PASOS.map((paso, i) => {
        const completo = completados[i];
        const activo = paso.id === pasoActual;
        return (
          <div key={paso.id} className="flex flex-col items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                completo || activo ? "bg-green-700 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {completo ? "✓" : paso.id}
            </div>
            <span className={`text-xs font-medium ${activo ? "text-green-700" : "text-gray-400"}`}>
              {paso.nombre}
            </span>
          </div>
        );
      })}
    </div>
  );
}