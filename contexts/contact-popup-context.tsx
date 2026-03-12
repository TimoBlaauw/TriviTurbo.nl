"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface ContactPopupContextType {
  isContactOpen: boolean
  openContactPopup: () => void
  closeContactPopup: () => void
}

const ContactPopupContext = createContext<ContactPopupContextType | undefined>(undefined)

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const openContactPopup = () => setIsContactOpen(true)
  const closeContactPopup = () => setIsContactOpen(false)

  return (
    <ContactPopupContext.Provider value={{ isContactOpen, openContactPopup, closeContactPopup }}>
      {children}
    </ContactPopupContext.Provider>
  )
}

export function useContactPopup() {
  const context = useContext(ContactPopupContext)
  if (context === undefined) {
    throw new Error("useContactPopup must be used within a ContactPopupProvider")
  }
  return context
}
