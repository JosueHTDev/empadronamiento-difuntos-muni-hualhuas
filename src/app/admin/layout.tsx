import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Panel de Registros - Municipalidad de Hualhuas",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="min-h-screen">{children}</main>

      <Footer />
    </div>
  );
}