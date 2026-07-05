import HeaderForm from "@/components/HeaderForm";
import Footer from "@/components/Footer";
import FormularioRegistro from "@/components/FormularioRegistro";

export default function Page() {
  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <HeaderForm />
      <FormularioRegistro />
      <Footer />
    </div>
  );
}