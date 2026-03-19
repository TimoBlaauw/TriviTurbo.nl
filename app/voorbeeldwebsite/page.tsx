import type { Metadata } from "next"
import { LeadFormStandalone } from "@/components/lead-form-standalone"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function VoorbeeldwebsitePage() {
  return <LeadFormStandalone />
}