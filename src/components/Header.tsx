import { LuPhone, LuClock } from "react-icons/lu";
import { TbGrave2 } from "react-icons/tb";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between px-12 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-hualhuas.png"
            alt="Municipalidad Distrital de Hualhuas"
            width={50}
            height={50}
          />
          <div>
            <p className="text-sm text-gray-700 leading-none">Municipalidad Distrital de</p>
            <p className="text-2xl font-bold text-green-800 leading-tight">HUALHUAS</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 justify-center">
          <span className="flex items-center gap-2">
            <LuPhone className="w-4 h-4 text-green-700" />
            (01) 123 4567
          </span>
          <span className="flex items-center gap-2">
            <LuClock className="w-4 h-4 text-green-700" />
            Lun - Vie: 8:00 a. m. - 4:00 p. m.
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/cementerio-hualhuas.png"
            alt="Cementerio General de Hualhuas"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative bg-linear-to-r from-green-900 via-green-800/80 to-green-700/0 text-white">
          <div className="flex items-center justify-between px-6 md:px-12 py-8 md:py-10">
            <div className="flex items-center gap-4 md:gap-6 max-w-2xl">
              <div className="bg-white/10 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0">
                <TbGrave2 className="text-5xl md:text-6xl text-white" />
              </div>

              <div>
                <h1 className="text-xl md:text-3xl font-bold mb-2">
                  Registro y Empadronamiento del Cementerio General de Hualhuas
                </h1>
                <p className="text-green-100 text-sm md:text-base">
                  Complete el formulario con los datos solicitados y adjunte los documentos requeridos.
                </p>
              </div>
            </div>

            <div className="hidden lg:block w-80 h-48 relative pointer-events-none"></div>
          </div>
        </div>
      </div>
    </header>
  );
}