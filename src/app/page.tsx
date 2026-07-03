import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Empadronamiento de Difuntos
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Municipalidad de Hualhuas
        </p>
      </div>

      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
        <li>Formulario para registrar datos de difuntos</li>
        <li>Panel para poder ver los registros con usuario y contraseña</li>
        <li>Se deben subir archivos e imágenes</li>
      </ul>
    </div>
  );
}
