"use client"

import { PopupProvider } from "@/contexts/popup-context"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Problems } from "@/components/problems"
import { Calculator } from "@/components/calculator"
import { Solution } from "@/components/solution"
import { Portfolio } from "@/components/portfolio"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"
import { LeadFormPopup } from "@/components/lead-form-popup"

export default function Home() {
  return (
    <PopupProvider>
      <main className="min-h-screen overflow-x-hidden">
        <Header />
        <Hero />
        <Problems />
        <Calculator />
        <Solution />
        <Portfolio />
        <Pricing />
        <FAQ />
        <SiteFooter />
        <LeadFormPopup />
      </main>
    </PopupProvider>
  )
}
