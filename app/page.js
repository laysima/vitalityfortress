import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import QuoteBanner from "@/components/sections/QuoteBanner";
import Pricing from "@/components/sections/Pricing";
import Trainers from "@/components/sections/Trainers";
import ContactCta from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <ScrollTopButton />
      <Header />
      <main>
        <Hero />
        <Statement />
        <About />
        <Services />
        <QuoteBanner />
        <Pricing />
        <Trainers />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
