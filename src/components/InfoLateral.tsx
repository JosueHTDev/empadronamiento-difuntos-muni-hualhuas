import { FiInfo, FiFile, FiMaximize2, FiCheckCircle, FiPhone, FiHelpCircle } from "react-icons/fi";

export default function InfoLateral() {
  return (
    <aside className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiInfo className="w-4 h-4 text-green-600" />
          Información importante
        </h3>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
              <FiFile className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Formatos permitidos</p>
              <p className="text-gray-500 text-xs">PDF para documentos e imágenes (JPG, PNG).</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
              <FiMaximize2 className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Tamaño máximo</p>
              <p className="text-gray-500 text-xs">10 MB por archivo.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Rellenar los campos</p>
              <p className="text-gray-500 text-xs">Completa todos los campos requeridos antes de enviar el formulario.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FiHelpCircle className="w-4 h-4 text-green-600" />
          ¿Necesitas ayuda?
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Contáctanos para resolver tus dudas
        </p>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <FiPhone className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Teléfono</p>
            <p className="text-sm font-semibold text-gray-800">986 583 092</p>
          </div>
        </div>
      </div>
    </aside>
  );
}