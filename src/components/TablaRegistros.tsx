import { FiEye, FiUsers, FiPhone } from "react-icons/fi";
import { RegistroTitular } from "@/types/registro.types";

export default function TablaRegistros({
  registros,
  onVerDetalle,
}: {
  registros: RegistroTitular[];
  onVerDetalle: (registro: RegistroTitular) => void;
}) {
  return (
    <div className="w-full">
      <table className="hidden md:table w-full table-fixed text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
            <th className="text-left py-3 px-4 font-semibold rounded-l-lg w-12">N°</th>
            <th className="text-left py-3 px-4 font-semibold w-1/3">Titular / Responsable</th>
            <th className="text-left py-3 px-4 font-semibold">Celular</th>
            <th className="text-left py-3 px-4 font-semibold">N° de familiar</th>
            <th className="text-left py-3 px-4 font-semibold">Parentesco</th>
            <th className="text-left py-3 px-4 font-semibold rounded-r-lg w-24">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {registros.map((registro, i) => (
            <tr key={registro.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4 text-gray-500">{i + 1}</td>
              <td className="py-4 px-4">
                <p className="text-gray-800 font-medium truncate">
                  {registro.titular.nombres} {registro.titular.apellidos}
                </p>
                <p className="text-gray-400 text-xs">DNI: {registro.titular.dni}</p>
              </td>
              <td className="py-4 px-4 text-gray-600">
                <span className="flex items-center gap-1.5">
                  <FiPhone className="text-gray-400" size={14} />
                  {registro.titular.celular}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <FiUsers className="text-gray-400" size={14} />
                  {registro.difuntos.length}
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

      <div className="flex flex-col gap-3 md:hidden">
        {registros.map((registro) => (
          <div key={registro.id} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-800 font-medium">
                  {registro.titular.nombres} {registro.titular.apellidos}
                </p>
                <p className="text-gray-400 text-xs">DNI: {registro.titular.dni}</p>
              </div>
              <button
                onClick={() => onVerDetalle(registro)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors shrink-0"
                title="Ver detalle"
              >
                <FiEye size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <FiPhone className="text-gray-400" size={14} />
                {registro.titular.celular}
              </span>
              <span className="flex items-center gap-1.5">
                <FiUsers className="text-gray-400" size={14} />
                {registro.difuntos.length}
              </span>
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