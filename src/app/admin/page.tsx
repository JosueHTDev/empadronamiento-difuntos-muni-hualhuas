import AdminRegistros from "@/components/AdminRegistros";
import { obtenerDifuntosAction } from "@/actions/difunto.actions";

export default async function AdminPage() {
  const registros = await obtenerDifuntosAction();

  return <AdminRegistros registrosIniciales={registros} />;
}
