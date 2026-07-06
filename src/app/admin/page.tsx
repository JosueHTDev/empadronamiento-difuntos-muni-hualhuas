import AdminRegistros from "@/components/AdminRegistros";
import { obtenerRegistrosAction } from "@/actions/titular.actions";

export default async function AdminPage() {
  const registros = await obtenerRegistrosAction();

  return <AdminRegistros registrosIniciales={registros} />;
}