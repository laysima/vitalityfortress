import AppShowcase from "@/components/marketing/AppShowcase";
import Coaches from "@/components/marketing/Coaches";
import Disciplines from "@/components/marketing/Disciplines";
import Hero from "@/components/marketing/Hero";
import Membership from "@/components/marketing/Membership";
import Method from "@/components/marketing/Method";
import RevealRoot from "@/components/marketing/RevealRoot";
import SiteFooter, { FinalCta } from "@/components/marketing/SiteFooter";
import SiteHeader from "@/components/marketing/SiteHeader";
import Timetable from "@/components/marketing/Timetable";

export default function Home() {
  return (
    <>
      <RevealRoot />
      <SiteHeader />
      <main>
        <Hero />
        <Method />
        <AppShowcase />
        <Disciplines />
        <Timetable />
        <Coaches />
        <Membership />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
