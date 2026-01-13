import About from "@/components/about";
import CompanyValues from "@/components/company-values";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col text-[#1a1a1a]">
      <Header />
      <Hero />
      <About />
      <CompanyValues />
      <Footer />
    </main>
  );
}
