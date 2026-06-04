import { Navbar } from "@/components/ritual/Navbar";
import { Hero } from "@/components/ritual/Hero";
import { Categories } from "@/components/ritual/Categories";
import { FeaturedPackages } from "@/components/ritual/FeaturedPackages";
import { HowItWorks } from "@/components/ritual/HowItWorks";
import { AddOns } from "@/components/ritual/AddOns";
import { Testimonials } from "@/components/ritual/Testimonials";
import { WhyUs } from "@/components/ritual/WhyUs";
import { FinalCTA } from "@/components/ritual/FinalCTA";
import { Footer } from "@/components/ritual/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <Hero />
      <Categories />
      <FeaturedPackages />
      <HowItWorks />
      <AddOns />
      <Testimonials />
      <WhyUs />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export default Index;
