import Header from "@/components/header";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import Services from "./components/services";
import Footer from "@/components/footer";

export default function LojaPage() {
  return (
    <main className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col text-[#1a1a1a]">
      <Header />
      <Hero />
      <HowItWorks />
      <Services />
      <Footer />
    </main>
  );
}
