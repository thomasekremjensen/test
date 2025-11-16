// Email service using Resend
import { Resend } from "resend"

// Initialize Resend lazily to avoid build-time errors
let resendInstance: Resend | null = null
function getResend() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set")
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@ibe160.com"

export async function sendExpirationAlert(
  to: string,
  userName: string,
  expiringItems: Array<{
    name: string
    daysLeft: number
    quantity: number
    unit: string
  }>
) {
  const itemsList = expiringItems
    .map((item) => {
      const status =
        item.daysLeft === 0
          ? "⚠️ **Expires today**"
          : item.daysLeft === 1
          ? "⚠️ **Expires tomorrow**"
          : `⏰ Expires in ${item.daysLeft} days`

      return `- **${item.name}** (${item.quantity} ${item.unit}) - ${status}`
    })
    .join("\n")

  try {
    const { data, error } = await getResend().emails.send({
      from: `ibe160 Food Tracker <${FROM_EMAIL}>`,
      to,
      subject: `🔔 Food Expiration Alert - ${expiringItems.length} items need attention`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Food Expiration Alert</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🔔 Food Expiration Alert</h1>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${userName || "there"},</p>

            <p style="font-size: 16px; margin-bottom: 20px;">
              You have <strong>${expiringItems.length} items</strong> in your pantry that are expiring soon or have already expired.
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <h2 style="color: #f59e0b; margin-top: 0;">Items Requiring Attention:</h2>
              ${itemsList
                .split("\n")
                .map((item) => `<p style="margin: 10px 0;">${item}</p>`)
                .join("")}
            </div>

            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #0369a1;">
                💡 <strong>Tip:</strong> Check the Recipes section to find meals you can make with these ingredients!
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.AUTH_URL || "http://localhost:3000"}/pantry"
                 style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View My Pantry
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

            <p style="font-size: 12px; color: #666; text-align: center;">
              You're receiving this email because you enabled expiration alerts in your ibe160 account.
              <br>
              <a href="${process.env.AUTH_URL || "http://localhost:3000"}/preferences" style="color: #667eea;">Manage preferences</a>
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Email send error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(to: string, userName: string) {
  try {
    const { data, error } = await getResend().emails.send({
      from: `ibe160 Food Tracker <${FROM_EMAIL}>`,
      to,
      subject: "Welcome to ibe160 - Reduce Food Waste Together!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Welcome to ibe160!</h1>
          </div>

          <div style="padding: 30px 0;">
            <p style="font-size: 18px;">Hi ${userName || "there"},</p>

            <p style="font-size: 16px;">
              Thank you for joining ibe160! Together, we're fighting food waste and saving money by tracking what's in your pantry.
            </p>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #16a34a; margin-top: 0;">🚀 Get Started:</h3>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 10px;">Add items to your pantry</li>
                <li style="margin-bottom: 10px;">Enable expiration alerts</li>
                <li style="margin-bottom: 10px;">Discover recipes based on your ingredients</li>
                <li>Reduce waste and save money!</li>
              </ol>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.AUTH_URL || "http://localhost:3000"}/pantry"
                 style="display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Go to My Pantry
              </a>
            </div>

            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 40px;">
              Need help? Contact us anytime!
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Welcome email error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Welcome email error:", error)
    return { success: false, error }
  }
}

export async function sendContactEmail(contactData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@ibe160.com"

  try {
    // Send to support team
    const { data, error } = await resend.emails.send({
      from: `ibe160 Contact Form <${FROM_EMAIL}>`,
      to: SUPPORT_EMAIL,
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📬 New Contact Form Submission</h1>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">Contact Details</h2>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${contactData.name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${contactData.email}</p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${contactData.subject}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a;">
              <h2 style="color: #16a34a; margin-top: 0; font-size: 20px;">Message</h2>
              <p style="white-space: pre-wrap; margin: 0;">${contactData.message}</p>
            </div>

            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; font-size: 14px; color: #0369a1;">
                💡 <strong>Tip:</strong> You can reply directly to this email to respond to ${contactData.name}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Contact email error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Contact email error:", error)
    return { success: false, error }
  }
}
