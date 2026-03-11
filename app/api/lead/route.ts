import { NextRequest, NextResponse } from "next/server"

interface LeadData {
  firstName: string
  email: string
  phone: string
  language: string
  accommodationName: string
  locationCity: string
  locationCountry: string
  platformLink: string
  keyFeatures: string
  colorPreference: string
  currentWebsite: string
  googleBusinessProfile: string
  extraPlatformLinks: string
  inspirationUrl: string
  style: string
  photosLink: string
  bookingPreference: string
  channelManager: string
  channelManagerName: string
  desiredDomain: string
  consent: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()

    // Log the lead data
    console.log("=== NEW LEAD RECEIVED ===")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Lead Data:", JSON.stringify(data, null, 2))
    console.log("=========================")

    // If webhook URL is configured, send data there
    const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL

    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            submittedAt: new Date().toISOString(),
            source: "triviturbo-landing-page",
          }),
        })

        if (!webhookResponse.ok) {
          console.error("Webhook request failed:", webhookResponse.status)
        } else {
          console.log("Lead successfully sent to webhook")
        }
      } catch (webhookError) {
        console.error("Error sending to webhook:", webhookError)
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json(
      { success: true, message: "Lead received successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json(
      { success: false, message: "Failed to process lead" },
      { status: 500 }
    )
  }
}
