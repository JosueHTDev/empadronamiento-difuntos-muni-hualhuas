export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-800 rounded-full" />
          <div>
            <p className="text-xs text-gray-500 leading-none">Municipalidad Distrital de</p>
            <p className="text-lg font-bold text-green-800 leading-tight">HUALHUAS</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>(01) 123 4567</span>
          <span>Lun - Vie: 8:00 a. m. - 4:00 p. m.</span>
        </div>
      </div>

      <div className="bg-linear-to-r from-green-900 to-green-700 text-white px-6 py-10 flex items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold mb-2">
            Registro y Empadronamiento del Cementerio General de Hualhuas
          </h1>
          <p className="text-green-100 text-sm">
            Complete el formulario con los datos solicitados y adjunte los documentos requeridos.
          </p>
        </div>
      </div>
    </header>
  );
}