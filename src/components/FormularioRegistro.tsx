"use client";

import { useFormularioPasos } from "@/hooks/useFormularioPasos";
import PasosIndicador from "./PasosIndicador";
import InfoLateral from "./InfoLateral";

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
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <label
        className={`block border-2 border-dashed rounded-lg py-6 text-center cursor-pointer ${
          error ? "border-red-400" : "border-gray-300 hover:border-green-500"
        }`}
      >
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <p className="text-sm text-green-700 font-medium">
          {archivo ? archivo.name : "Subir archivo"}
        </p>
        <p className="text-xs text-gray-400 mt-1">{descripcion}</p>
      </label>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-green-600"
        }`}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
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
        <div className="fixed top-6 right-6 bg-green-700 text-white px-5 py-3 rounded-lg shadow-lg z-999 text-sm font-medium">
          ✓ Formulario enviado correctamente
        </div>
      )}

      <PasosIndicador pasoActual={pasoActual} completados={completados} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">
        <div className="flex flex-col gap-6">
          {pasoActual === 1 && (
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Datos del Titular o Responsable</h2>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CampoTexto
                    label="Nombre *"
                    placeholder="Ej: Marco Antonio"
                    value={data.titular.nombre}
                    onChange={(v) => actualizarTitular("nombre", v)}
                    onBlur={() => validarCampo("titularNombres")}
                    error={erroresPaso?.titularNombres}
                  />
                  <CampoTexto
                    label="Apellido *"
                    placeholder="Ej: Perez López"
                    value={data.titular.apellido}
                    onChange={(v) => actualizarTitular("apellido", v)}
                    onBlur={() => validarCampo("titularApellidos")}
                    error={erroresPaso?.titularApellidos}
                  />
                  <CampoTexto
                    label="DNI *"
                    placeholder="Ej: 87654321"
                    value={data.titular.dni}
                    onChange={(v) => actualizarTitular("dni", v)}
                    onBlur={() => validarCampo("titularDni")}
                    error={erroresPaso?.titularDni}
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
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Datos del Difunto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CampoTexto
                  label="Nombres *"
                  placeholder="Ej: Luis"
                  value={data.difunto.nombres}
                  onChange={(v) => actualizarDifunto("nombres", v)}
                  onBlur={() => validarCampo("difuntoNombres")}
                  error={erroresPaso.difuntoNombres}
                />
                <CampoTexto
                  label="Apellidos *"
                  placeholder="Ej: García Torres"
                  value={data.difunto.apellidos}
                  onChange={(v) => actualizarDifunto("apellidos", v)}
                  onBlur={() => validarCampo("difuntoApellidos")}
                  error={erroresPaso.difuntoApellidos}
                />
                <CampoTexto
                  label="DNI (opcional)"
                  placeholder="Ej: 12345678"
                  value={data.difunto.dni}
                  onChange={(v) => actualizarDifunto("dni", v)}
                  onBlur={() => validarCampo("difuntoDni")}
                  error={erroresPaso.difuntoDni}
                />
                <CampoTexto
                  label="Fecha de fallecimiento *"
                  type="date"
                  value={data.difunto.fechaFallecimiento}
                  onChange={(v) => actualizarDifunto("fechaFallecimiento", v)}
                  onBlur={() => validarCampo("difuntoFechaFallecimiento")}
                  error={erroresPaso.difuntoFechaFallecimiento}
                />
                <CampoTexto
                  label="Ubicación del nicho o sepultura *"
                  value={data.difunto.ubicacionNicho}
                  onChange={(v) => actualizarDifunto("ubicacionNicho", v)}
                  onBlur={() => validarCampo("difuntoUbicacionNicho")}
                  error={erroresPaso.difuntoUbicacionNicho}
                />
              </div>
            </section>
          )}

          {pasoActual === 3 && (
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Documentos Requeridos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
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
                label="Fotografía del nicho o sepultura (plano o ubicación referencial a mano alzada) *"
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
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Revisión y Envío</h2>
              <div className="flex flex-col gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-800">Titular</p>
                  <p>{data.titular.nombre} {data.titular.apellido} — DNI {data.titular.dni} — {data.titular.telefono} — {data.titular.parentesco}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Difunto</p>
                  <p>{data.difunto.nombres} {data.difunto.apellidos} {data.difunto.dni && `— DNI ${data.difunto.dni}`} — {data.difunto.fechaFallecimiento} — {data.difunto.ubicacionNicho}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Documentos</p>
                  <p>{data.documentos.comprobantePago?.name}, {data.documentos.actaDefuncion?.name}, {data.documentos.fotografiaNicho?.name}</p>
                </div>
              </div>

              <button
                onClick={enviarFormulario}
                disabled={enviando}
                className="mt-5 bg-green-700 text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-green-800 disabled:bg-gray-400"
              >
                {enviando ? "Enviando..." : "Enviar formulario"}
              </button>

              {errores && (
                <ul className="mt-3 text-red-600 text-xs space-y-1">
                  {Object.entries(errores).map(([campo, msgs]) => (
                    <li key={campo}>{campo}: {msgs.join(", ")}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <div className="flex justify-between">
            <button onClick={limpiarFormulario} className="border border-gray-300 text-gray-600 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Limpiar formulario
            </button>
            <div className="flex gap-3">
              {pasoActual > 1 && (
                <button onClick={pasoAnterior} className="border border-gray-300 text-gray-600 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  ← Anterior
                </button>
              )}
              {pasoActual < 4 && (
                <button
                  onClick={siguientePaso}
                  disabled={!pasoActualEsValido()}
                  className="bg-green-700 text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Siguiente →
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