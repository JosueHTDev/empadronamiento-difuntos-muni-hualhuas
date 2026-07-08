import type { Metadata } from "next";

import HeaderForm from "@/components/HeaderForm";
import Footer from "@/components/Footer";
import FormularioRegistro from "@/components/FormularioRegistro";

export const metadata: Metadata = {
  title: "Empadronamiento de Difuntos | Municipalidad Distrital de Hualhuas",
  description:
    "Formulario oficial para el empadronamiento de difuntos del Cementerio General de la Municipalidad Distrital de Hualhuas, Huancayo, Perú.",
  keywords: [
    "empadronamiento de difuntos",
    "municipalidad de hualhuas",
    "cementerio hualhuas",
    "registro de difuntos",
    "hualhuas",
    "huancayo",
    "municipalidad distrital de hualhuas",
    "empadronamiento cementerio",
  ],
};

export default function Page() {
  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <HeaderForm />
      <FormularioRegistro />
      <Footer />
    </div>
  );
}