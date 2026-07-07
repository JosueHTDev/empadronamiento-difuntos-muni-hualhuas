import { LuPhone, LuClock, LuCircleArrowRight, LuCalendar } from "react-icons/lu";
import { TbGrave2 } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

export default function HeaderForm() {
  return (
    <header>
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-3 border-b border-gray-200 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-hualhuas.png"
            alt="Municipalidad Distrital de Hualhuas"
            width={50}
            height={50}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-12.5 md:h-12.5"
          />
          <div>
            <p className="text-xs sm:text-sm text-gray-700 leading-none">Municipalidad Distrital de</p>
            <p className="text-xl sm:text-2xl font-bold text-green-800 leading-tight">HUALHUAS</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-600 justify-center">
          <span className="flex items-center gap-1 sm:gap-2">
            <LuCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-700" />
            Lunes - Viernes
          </span>
          <span className="flex items-center gap-1 sm:gap-2">
          </span>
          <span className="flex items-center gap-1 sm:gap-2">
            <LuClock className="w-3 h-3 sm:w-4 sm:h-4 text-green-700" />
            8:00 a. m. - 4:00 p. m.
          </span>
          <Link
            href="/login"
            className="flex items-center gap-1 text-gray-400 hover:text-green-700 transition-colors"
          >
            <LuCircleArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/cementerio-frontis.png"
            alt="Cementerio General de Hualhuas"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative bg-linear-to-r from-green-900 via-green-800/80 to-green-700/0 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10 gap-4 md:gap-0">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full md:max-w-2xl">
              <div className="bg-white/10 rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center shrink-0">
                <TbGrave2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
                  Registro y Empadronamiento del Cementerio General de Hualhuas
                </h1>
                <p className="text-green-100 text-xs sm:text-sm md:text-base">
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