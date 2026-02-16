import Header from "@/components/header";
import Footer from "@/components/footer";
import OrdersList from "./components/orders-list";

export const metadata = {
  title: "Meus Pedidos | Connective",
  description: "Visualize e acompanhe seus pedidos",
};

export default function PedidosPage() {
  return (
    <main className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col text-[#1a1a1a]">
      <Header />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Meus Pedidos
            </h1>
            <p className="text-gray-600">
              Visualize e acompanhe todos os seus pedidos
            </p>
          </div>

          <OrdersList />
        </div>
      </div>

      <Footer />
    </main>
  );
}
