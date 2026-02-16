import Header from "@/components/header";
import Footer from "@/components/footer";
import OrdersList from "./components/orders-list";
import { ShoppingBag, Truck } from "lucide-react";

export const metadata = {
  title: "Meus Pedidos | Connective",
  description: "Visualize e acompanhe seus pedidos",
};

export default function PedidosPage() {
  return (
    <main className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col text-[#1a1a1a]">
      <Header />

      <div className="flex-1 py-16 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 2xl:px-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3.5 bg-gradient-to-br from-[#8338ec] to-[#5a4fcf] rounded-xl shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8338ec] via-[#5a4fcf] to-[#43bccd] bg-clip-text text-transparent mb-2">
                  Meus Pedidos
                </h1>
                <p className="text-gray-600 text-base md:text-lg">
                  Acompanhe o status de todos os seus pedidos em tempo real
                </p>
              </div>
            </div>

            {/* Decorative color bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#fc5735] via-[#8338ec] to-[#43bccd] rounded-full mt-8" />
          </div>

          <OrdersList />
        </div>
      </div>

      <Footer />
    </main>
  );
}
