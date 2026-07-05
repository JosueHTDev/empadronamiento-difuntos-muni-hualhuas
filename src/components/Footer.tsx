import Image from "next/image";

export default function Footer() {
  return (
   <footer className="bg-green-900 text-white px-6 py-5 mt-10 flex items-center gap-4">
    <Image
      src="/images/logo-hualhuas.png"
      alt="Municipalidad Distrital de Hualhuas"
      width={50}
      height={50}
    />

    <div>
      <p className="font-semibold text-sm">
        Municipalidad Distrital de Hualhuas
      </p>
      <p className="text-xs text-green-200">
        Gerencia de Gestión Ambiental y Servicios Locales
      </p>
    </div>
  </footer>
  );
}