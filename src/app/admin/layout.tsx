export const metadata = {
  title: "Panel de Registros - Municipalidad de Hualhuas",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-green-800 text-white px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">Municipalidad Distrital de Hualhuas</p>
          <p className="text-xs text-green-100">Empadronamiento Cementerio General</p>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}