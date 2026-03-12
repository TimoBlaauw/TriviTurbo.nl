"use client"

import { PopupProvider } from "@/contexts/popup-context"
import { ContactPopupProvider } from "@/contexts/contact-popup-context"
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
import { ContactPopup } from "@/components/contact-popup"

export default function Home() {
  return (
    <PopupProvider>
      <ContactPopupProvider>
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
          <ContactPopup />
        </main>
      </ContactPopupProvider>
    </PopupProvider>
  )
}
