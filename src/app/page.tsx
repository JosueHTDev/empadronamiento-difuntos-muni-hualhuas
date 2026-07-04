import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormularioRegistro from "@/components/FormularioRegistro";

export default function Page() {
  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <Header />
      <FormularioRegistro />
      <Footer />
    </div>
  );
}