import Header from "./components/header";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import Services from "./components/services";

export default function LojaPage() {
  return (
    <main className="bg-[#f7f7f7] min-h-screen flex flex-col text-[#1a1a1a]">
      <Header />
      <Hero />
      <HowItWorks />
      <Services />
    </main>
  );
}
