import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Log contact form data
    console.log("=== NEW CONTACT FORM SUBMISSION ===")
    console.log("Name:", data.name)
    console.log("Email:", data.email)
    console.log("Question:", data.question)
    console.log("Submitted at:", new Date().toISOString())
    console.log("===================================")

    // Send to webhook if configured
    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "contact_question",
            ...data,
            submittedAt: new Date().toISOString(),
          }),
        })
      } catch (webhookError) {
        console.error("Webhook error:", webhookError)
        // Continue even if webhook fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Er is iets misgegaan. Probeer het later opnieuw." },
      { status: 500 }
    )
  }
}
