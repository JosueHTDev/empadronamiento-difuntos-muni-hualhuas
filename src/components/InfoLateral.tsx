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
            <p className="font-medium text-gray-700">Cantidad máxima</p>
            <p className="text-gray-500 text-xs">Hasta 5 archivos por campo.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">¿Necesitas ayuda?</h3>
        <p className="text-xs text-gray-500 mb-3">Comunícate con nuestra mesa de partes.</p>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <span>(01) 123 4567</span>
          <span>mesadepartes@munihualhuas.gob.pe</span>
          <span>Lunes a viernes 8:00 a. m. - 4:00 p. m.</span>
        </div>
      </div>
    </aside>
  );
}