"use client";

import { useFormularioPasos } from "@/hooks/useFormularioPasos";
import PasosIndicador from "./PasosIndicador";
import InfoLateral from "./InfoLateral";

function CampoArchivo({
  label,
  descripcion,
  archivo,
  onChange,
}: {
  label: string;
  descripcion: string;
  archivo: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <label className="block border-2 border-dashed border-gray-300 rounded-lg py-6 text-center hover:border-green-500 cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <p className="text-sm text-green-700 font-medium">
          {archivo ? archivo.name : "Subir archivo"}
        </p>
        <p className="text-xs text-gray-400 mt-1">{descripcion}</p>
      </label>
    </div>
  );
}

function CampoTexto({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
      />
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
        <div className="fixed top-6 right-6 bg-green-700 text-white px-5 py-3 rounded-lg shadow-lg z-[999] text-sm font-medium">
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
                  <CampoTexto label="Nombre *" value={data.titular.nombre} onChange={(v) => actualizarTitular("nombre", v)} />
                  <CampoTexto label="Apellido *" value={data.titular.apellido} onChange={(v) => actualizarTitular("apellido", v)} />
                  <CampoTexto label="DNI *" value={data.titular.dni} onChange={(v) => actualizarTitular("dni", v)} />
                  <CampoTexto label="Teléfono *" placeholder="Ej: 987 654 321" value={data.titular.telefono} onChange={(v) => actualizarTitular("telefono", v)} />
                  <CampoTexto label="Parentesco con el difunto *" value={data.titular.parentesco} onChange={(v) => actualizarTitular("parentesco", v)} />
                </div>
                <CampoArchivo
                  label="Copia de DNI del titular o responsable *"
                  descripcion="PDF o imagen. Máx. 10 MB."
                  archivo={data.titular.archivoDni}
                  onChange={(f) => actualizarTitular("archivoDni", f)}
                />
              </div>
            </section>
          )}

          {pasoActual === 2 && (
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Datos del Difunto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CampoTexto label="Nombres *" value={data.difunto.nombres} onChange={(v) => actualizarDifunto("nombres", v)} />
                <CampoTexto label="Apellidos *" value={data.difunto.apellidos} onChange={(v) => actualizarDifunto("apellidos", v)} />
                <CampoTexto label="Fecha de fallecimiento *" type="date" value={data.difunto.fechaFallecimiento} onChange={(v) => actualizarDifunto("fechaFallecimiento", v)} />
                <CampoTexto label="Ubicación del nicho o sepultura *" value={data.difunto.ubicacionNicho} onChange={(v) => actualizarDifunto("ubicacionNicho", v)} />
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
                  onChange={(f) => actualizarDocumentos("comprobantePago", f)}
                />
                <CampoArchivo
                  label="Acta de defunción *"
                  descripcion="PDF. Máx. 10 MB."
                  archivo={data.documentos.actaDefuncion}
                  onChange={(f) => actualizarDocumentos("actaDefuncion", f)}
                />
              </div>
              <CampoArchivo
                label="Fotografía del nicho o sepultura (plano o ubicación referencial a mano alzada) *"
                descripcion="Imagen. Máx. 10 MB."
                archivo={data.documentos.fotografiaNicho}
                onChange={(f) => actualizarDocumentos("fotografiaNicho", f)}
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
                  <p>{data.difunto.nombres} {data.difunto.apellidos} — {data.difunto.fechaFallecimiento} — {data.difunto.ubicacionNicho}</p>
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
                <button onClick={siguientePaso} className="bg-green-700 text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-green-800">
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