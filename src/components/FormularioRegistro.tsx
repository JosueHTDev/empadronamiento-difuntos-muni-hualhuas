"use client";

import { useFormularioPasos } from "@/hooks/useFormularioPasos";
import PasosIndicador from "./PasosIndicador";
import InfoLateral from "./InfoLateral";
import { 
  FiUser, 
  FiFile, 
  FiUpload, 
  FiCheck, 
  FiArrowRight, 
  FiArrowLeft,
  FiTrash2,
  FiSend,
  FiUserPlus,
  FiCalendar,
  FiMapPin,
  FiFileText,
  FiImage,
  FiCreditCard
} from "react-icons/fi";
import { FaRegFilePdf, FaRegFileImage } from "react-icons/fa";

function CampoArchivo({
  label,
  descripcion,
  archivo,
  onChange,
  accept,
  error,
}: {
  label: string;
  descripcion: string;
  archivo: File | null;
  onChange: (file: File | null) => void;
  accept: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <label
        className={`block border-2 border-dashed rounded-xl py-8 px-4 text-center cursor-pointer transition-all duration-200 ${
          error 
            ? "border-red-400 bg-red-50" 
            : archivo 
              ? "border-green-400 bg-green-50" 
              : "border-gray-300 hover:border-green-400 hover:bg-green-50"
        }`}
      >
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <div className="flex flex-col items-center gap-2">
          {archivo ? (
            <>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FiFile className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-green-700 font-medium truncate max-w-xs">
                {archivo.name}
              </p>
              <p className="text-xs text-gray-400">
                {(archivo.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FiUpload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-600">Subir archivo</p>
              <p className="text-xs text-gray-400">{descripcion}</p>
            </>
          )}
        </div>
      </label>
      {error && (
        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
}

function CampoTexto({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  error?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full border rounded-xl px-3 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
            icon ? "pl-10" : "pl-3"
          } ${
            error 
              ? "border-red-400 focus:ring-red-500 bg-red-50" 
              : "border-gray-300 focus:ring-green-500 focus:border-green-500"
          }`}
        />
      </div>
      {error && (
        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
}

export default function FormularioRegistro() {
  const {
    pasoActual,
    setPasoActual,
    data,
    actualizarTitular,
    actualizarDifunto,
    actualizarDocumentos,
    completados,
    erroresPaso,
    validarCampo,
    pasoActualEsValido,
    siguientePaso,
    pasoAnterior,
    enviarFormulario,
    enviando,
    errores,
    mostrarExito,
    limpiarFormulario,
  } = useFormularioPasos();

  return (
    <div className="px-6 pb-10 relative">
      {mostrarExito && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <FiCheck className="w-5 h-5" />
          Formulario enviado correctamente
        </div>
      )}

      <PasosIndicador pasoActual={pasoActual} completados={completados} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">
        <div className="flex flex-col gap-6">
          {pasoActual === 1 && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Datos del Titular o Responsable
                </h2>
              </div>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CampoTexto
                    label="Nombre *"
                    placeholder="Ej: Marco Antonio"
                    value={data.titular.nombre}
                    onChange={(v) => actualizarTitular("nombre", v)}
                    onBlur={() => validarCampo("titularNombres")}
                    error={erroresPaso?.titularNombres}
                    icon={<FiUser className="w-4 h-4" />}
                  />
                  <CampoTexto
                    label="Apellido *"
                    placeholder="Ej: Perez López"
                    value={data.titular.apellido}
                    onChange={(v) => actualizarTitular("apellido", v)}
                    onBlur={() => validarCampo("titularApellidos")}
                    error={erroresPaso?.titularApellidos}
                    icon={<FiUser className="w-4 h-4" />}
                  />
                  <CampoTexto
                    label="DNI *"
                    placeholder="Ej: 87654321"
                    value={data.titular.dni}
                    onChange={(v) => actualizarTitular("dni", v)}
                    onBlur={() => validarCampo("titularDni")}
                    error={erroresPaso?.titularDni}
                    icon={<FiCreditCard className="w-4 h-4" />}
                  />
                  <CampoTexto
                    label="Teléfono *"
                    placeholder="Ej: 987 654 321"
                    value={data.titular.telefono}
                    onChange={(v) => actualizarTitular("telefono", v)}
                    onBlur={() => validarCampo("titularTelefono")}
                    error={erroresPaso?.titularTelefono}
                  />
                  <CampoTexto
                    label="Parentesco con el difunto *"
                    placeholder="Ej: Hijo(a), Nieto(a), etc."
                    value={data.titular.parentesco}
                    onChange={(v) => actualizarTitular("parentesco", v)}
                    onBlur={() => validarCampo("titularParentesco")}
                    error={erroresPaso?.titularParentesco}
                    icon={<FiUserPlus className="w-4 h-4" />}
                  />
                </div>
                <CampoArchivo
                  label="Copia de DNI del titular o responsable *"
                  descripcion="PDF o imagen. Máx. 10 MB."
                  archivo={data.titular.archivoDni}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(f) => {
                    actualizarTitular("archivoDni", f);
                    validarCampo("titularArchivoDni", f);
                  }}
                  error={erroresPaso.titularArchivoDni}
                />
              </div>
            </section>
          )}

          {pasoActual === 2 && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Datos del Difunto
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CampoTexto
                  label="Nombres *"
                  placeholder="Ej: Luis"
                  value={data.difunto.nombres}
                  onChange={(v) => actualizarDifunto("nombres", v)}
                  onBlur={() => validarCampo("difuntoNombres")}
                  error={erroresPaso.difuntoNombres}
                  icon={<FiUser className="w-4 h-4" />}
                />
                <CampoTexto
                  label="Apellidos *"
                  placeholder="Ej: García Torres"
                  value={data.difunto.apellidos}
                  onChange={(v) => actualizarDifunto("apellidos", v)}
                  onBlur={() => validarCampo("difuntoApellidos")}
                  error={erroresPaso.difuntoApellidos}
                  icon={<FiUser className="w-4 h-4" />}
                />
                <CampoTexto
                  label="DNI (opcional)"
                  placeholder="Ej: 12345678"
                  value={data.difunto.dni}
                  onChange={(v) => actualizarDifunto("dni", v)}
                  onBlur={() => validarCampo("difuntoDni")}
                  error={erroresPaso.difuntoDni}
                  icon={<FiCreditCard className="w-4 h-4" />}
                />
                <CampoTexto
                  label="Fecha de fallecimiento *"
                  type="date"
                  value={data.difunto.fechaFallecimiento}
                  onChange={(v) => actualizarDifunto("fechaFallecimiento", v)}
                  onBlur={() => validarCampo("difuntoFechaFallecimiento")}
                  error={erroresPaso.difuntoFechaFallecimiento}
                  icon={<FiCalendar className="w-4 h-4" />}
                />
                <CampoTexto
                  label="Ubicación del nicho o sepultura *"
                  placeholder="Ej: Pabellón 3, Fila 2, Nicho 15"
                  value={data.difunto.ubicacionNicho}
                  onChange={(v) => actualizarDifunto("ubicacionNicho", v)}
                  onBlur={() => validarCampo("difuntoUbicacionNicho")}
                  error={erroresPaso.difuntoUbicacionNicho}
                  icon={<FiMapPin className="w-4 h-4" />}
                />
              </div>
            </section>
          )}

          {pasoActual === 3 && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <FiFileText className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Documentos Requeridos
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <CampoArchivo
                  label="Comprobante de pago del espacio usado *"
                  descripcion="PDF. Máx. 10 MB."
                  archivo={data.documentos.comprobantePago}
                  accept=".pdf"
                  onChange={(f) => {
                    actualizarDocumentos("comprobantePago", f);
                    validarCampo("comprobantePago", f);
                  }}
                  error={erroresPaso.comprobantePago}
                />
                <CampoArchivo
                  label="Acta de defunción *"
                  descripcion="PDF. Máx. 10 MB."
                  archivo={data.documentos.actaDefuncion}
                  accept=".pdf"
                  onChange={(f) => {
                    actualizarDocumentos("actaDefuncion", f);
                    validarCampo("actaDefuncion", f);
                  }}
                  error={erroresPaso.actaDefuncion}
                />
              </div>
              <CampoArchivo
                label="Fotografía del nicho o sepultura *"
                descripcion="Imagen. Máx. 10 MB."
                archivo={data.documentos.fotografiaNicho}
                accept=".jpg,.jpeg,.png"
                onChange={(f) => {
                  actualizarDocumentos("fotografiaNicho", f);
                  validarCampo("fotografiaNicho", f);
                }}
                error={erroresPaso.fotografiaNicho}
              />
            </section>
          )}

          {pasoActual === 4 && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <FiCheck className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Revisión y Envío
                </h2>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <FiUser className="w-4 h-4 text-green-600" />
                    Titular
                  </p>
                  <p className="text-gray-700">
                    {data.titular.nombre} {data.titular.apellido} — DNI {data.titular.dni} — {data.titular.telefono} — {data.titular.parentesco}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <FiUser className="w-4 h-4 text-green-600" />
                    Difunto
                  </p>
                  <p className="text-gray-700">
                    {data.difunto.nombres} {data.difunto.apellidos} {data.difunto.dni && `— DNI ${data.difunto.dni}`} — {data.difunto.fechaFallecimiento} — {data.difunto.ubicacionNicho}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <FiFile className="w-4 h-4 text-green-600" />
                    Documentos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.documentos.comprobantePago && (
                      <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200 text-xs">
                        <FaRegFilePdf className="text-red-500" />
                        {data.documentos.comprobantePago.name}
                      </span>
                    )}
                    {data.documentos.actaDefuncion && (
                      <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200 text-xs">
                        <FaRegFilePdf className="text-red-500" />
                        {data.documentos.actaDefuncion.name}
                      </span>
                    )}
                    {data.documentos.fotografiaNicho && (
                      <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200 text-xs">
                        <FaRegFileImage className="text-blue-500" />
                        {data.documentos.fotografiaNicho.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={enviarFormulario}
                disabled={enviando}
                className="mt-5 w-full bg-green-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Enviar formulario
                  </>
                )}
              </button>

              {errores && (
                <div className="mt-3 bg-red-50 rounded-xl p-4 border border-red-200">
                  <ul className="text-red-600 text-xs space-y-1">
                    {Object.entries(errores).map(([campo, msgs]) => (
                      <li key={campo} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{campo}: {msgs.join(", ")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
            <button
              onClick={limpiarFormulario}
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
            >
              <FiTrash2 className="w-4 h-4" />
              Limpiar formulario
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              {pasoActual > 1 && (
                <button
                  onClick={pasoAnterior}
                  className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 flex-1 sm:flex-none"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
              )}
              {pasoActual < 4 && (
                <button
                  onClick={siguientePaso}
                  disabled={!pasoActualEsValido()}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex-1 sm:flex-none"
                >
                  Siguiente
                  <FiArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <InfoLateral />
      </div>
    </div>
  );
}