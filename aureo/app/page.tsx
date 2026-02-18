import {
  HomeFeatures,
  HomeFinalCta,
  HomeHeader,
  HomeHero,
  HomeHowItWorks,
  HomePricing,
  HomeSecurity,
  HomeSocialProof,
  HomeTestimonials,
  HomeFooter,
} from "@/components/home/home";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <HomeHeader />
      <HomeHero />
      <HomeSocialProof />
      <HomeFeatures />
      <HomeHowItWorks />
      <HomeTestimonials />
      <HomePricing />
      <HomeSecurity />
      <HomeFinalCta />
      <HomeFooter />
    </main>
  );
}
