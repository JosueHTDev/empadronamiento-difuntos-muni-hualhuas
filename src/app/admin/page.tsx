"use client";

import { useState } from "react";
import { registrosMock } from "@/lib/mockRegistros";
import { RegistroTitular } from "@/types/registro.types";
import TablaRegistros from "@/components/TablaRegistros";
import ModalDetalleRegistro from "@/components/ModalDetalleRegistro";

export default function AdminPage() {
  const [registroSeleccionado, setRegistroSeleccionado] = useState<RegistroTitular | null>(null);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-5 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Registros de Formularios</h1>
        <p className="text-sm text-gray-500">Consulta y gestión de formularios recibidos</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 w-full">
        <TablaRegistros registros={registrosMock} onVerDetalle={setRegistroSeleccionado} />
      </div>

      {registroSeleccionado && (
        <ModalDetalleRegistro registro={registroSeleccionado} onCerrar={() => setRegistroSeleccionado(null)} />
      )}
    </div>
  );
}