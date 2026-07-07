import { FiEye, FiPhone, FiCalendar, FiMapPin } from "react-icons/fi";
import { RegistroDifunto } from "@/types/registro.types";

function iniciales(nombres: string, apellidos: string) {
  return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
}

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-PE", { dateStyle: "medium" });
}

export default function TablaRegistros({
  registros,
  onVerDetalle,
}: {
  registros: RegistroDifunto[];
  onVerDetalle: (registro: RegistroDifunto) => void;
}) {
  return (
    <div className="w-full">
      <table className="hidden lg:table w-full table-fixed text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
            <th className="text-left py-3 px-4 font-semibold rounded-l-lg w-10">N°</th>
            <th className="text-left py-3 px-4 font-semibold w-1/4">Difunto</th>
            <th className="text-left py-3 px-4 font-semibold w-36">Fallecimiento</th>
            <th className="text-left py-3 px-4 font-semibold w-1/4">Titular / Responsable</th>
            <th className="text-left py-3 px-4 font-semibold w-32">Celular</th>
            <th className="text-left py-3 px-4 font-semibold w-32">Parentesco</th>
            <th className="text-left py-3 px-4 font-semibold rounded-r-lg w-16">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {registros.map((registro, i) => (
            <tr key={registro.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4 text-gray-400">{i + 1}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-green-100 text-green-800 text-xs font-semibold flex items-center justify-center">
                    {iniciales(registro.nombres, registro.apellidos)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-gray-800 font-medium truncate">
                      {registro.nombres} {registro.apellidos}
                    </p>
                    <p className="text-gray-400 text-xs truncate flex items-center gap-1">
                      <FiMapPin size={11} className="shrink-0" />
                      {registro.ubicacionNicho}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-600">
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-gray-400 shrink-0" size={14} />
                  {formatearFecha(registro.fechaFallecimiento)}
                </span>
              </td>
              <td className="py-4 px-4 min-w-0">
                <p className="text-gray-800 font-medium truncate">
                  {registro.titular.nombres} {registro.titular.apellidos}
                </p>
                <p className="text-gray-400 text-xs">DNI: {registro.titular.dni}</p>
              </td>
              <td className="py-4 px-4 text-gray-600">
                <span className="flex items-center gap-1.5">
                  <FiPhone className="text-gray-400 shrink-0" size={14} />
                  {registro.titular.celular}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {registro.titular.parentesco}
                </span>
              </td>
              <td className="py-4 px-4">
                <button
                  onClick={() => onVerDetalle(registro)}
                  className="w-9 h-9 flex items-center justify-center rounded-md text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors"
                  title="Ver detalle"
                >
                  <FiEye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-3 lg:hidden">
        {registros.map((registro) => (
          <div key={registro.id} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 shrink-0 rounded-full bg-green-100 text-green-800 text-xs font-semibold flex items-center justify-center">
                  {iniciales(registro.nombres, registro.apellidos)}
                </span>
                <div className="min-w-0">
                  <p className="text-gray-800 font-medium truncate">
                    {registro.nombres} {registro.apellidos}
                  </p>
                  <p className="text-gray-400 text-xs truncate flex items-center gap-1">
                    <FiMapPin size={11} className="shrink-0" />
                    {registro.ubicacionNicho}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onVerDetalle(registro)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors shrink-0"
                title="Ver detalle"
              >
                <FiEye size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <FiCalendar className="text-gray-400 shrink-0" size={14} />
              Falleció: {formatearFecha(registro.fechaFallecimiento)}
            </div>

            <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Titular / Responsable</p>
              <p className="text-gray-800 text-sm font-medium">
                {registro.titular.nombres} {registro.titular.apellidos}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                <span className="text-gray-400 text-xs">DNI: {registro.titular.dni}</span>
                <span className="flex items-center gap-1.5">
                  <FiPhone className="text-gray-400" size={13} />
                  {registro.titular.celular}
                </span>
              </div>
            </div>

            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full self-start">
              {registro.titular.parentesco}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
