import About from "@/components/about";
import CompanyValues from "@/components/company-values";
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="bg-[#f7f7f7] min-h-screen flex flex-col text-[#1a1a1a]">
      <Header />
      <Hero />
      <About />
      <CompanyValues />
    </main>
  );
}
