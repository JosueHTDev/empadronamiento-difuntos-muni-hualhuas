import Header from "@/components/Header";
export const metadata = {
  title: "Inicio sesion personal - Municipalidad de Hualhuas",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1">{children}</main>
    </div>
  );
}