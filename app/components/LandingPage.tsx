"use client";

import { AppProvider } from "../context/AppContext";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <AppProvider>
      <div className="grain relative min-h-screen">
        <Header />
        <main>
          <Hero />
          <Features />
          <Pricing />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
