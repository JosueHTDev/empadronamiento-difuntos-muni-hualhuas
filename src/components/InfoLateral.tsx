export default function InfoLateral() {
  return (
    <aside className="flex flex-col gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Información importante</h3>
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">Formatos permitidos</p>
            <p className="text-gray-500 text-xs">PDF para documentos e imágenes (JPG, PNG).</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Tamaño máximo</p>
            <p className="text-gray-500 text-xs">10 MB por archivo.</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Rellenar los campos</p>
            <p className="text-gray-500 text-xs">Completa todos los campos requeridos antes de enviar el formulario.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}