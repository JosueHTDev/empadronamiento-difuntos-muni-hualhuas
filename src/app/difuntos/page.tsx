import { obtenerDifuntosAction } from "@/actions/difunto.actions"; 

 async function DifuntosPage() {
    const difuntos = await obtenerDifuntosAction();
  return (
    <div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nombres</th>
            <th className="border p-2 text-left">Apellidos</th>
            <th className="border p-2 text-left">Fecha fallecimiento</th>
            <th className="border p-2 text-left">Titular</th>
          </tr>
        </thead>
        <tbody>
          {difuntos.map((difunto) => (
            <tr key={difunto.id}>
              <td className="border p-2">{difunto.nombres}</td>
              <td className="border p-2">{difunto.apellidos}</td>
              <td className="border p-2">
                {difunto.fechaFallecimiento.toLocaleDateString('es-PE')}
              </td>
              <td className="border p-2">
                {difunto.titular.nombres} {difunto.titular.apellidos}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DifuntosPage
