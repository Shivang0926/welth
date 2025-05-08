"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("Resend API key is not configured");
    return { 
      success: false, 
      error: "Email service is not properly configured" 
    };
  }

  const resend = new Resend(apiKey);

  try {
    if (!to || !subject || !react) {
      throw new Error("Missing required email parameters");
    }

    const data = await resend.emails.send({
      from: "Welth Finance <onboarding@resend.dev>", // Using Resend's default verified domain
      to,
      subject,
      react,
    });

    if (!data || !data.id) {
      throw new Error("Failed to send email - no confirmation received");
    }

    console.log("Email sent successfully:", data.id);
    return { success: true, data };
  } catch (error) {
    const errorMessage = error.message || "Failed to send email";
    console.error("Failed to send email:", errorMessage);
    return { 
      success: false, 
      error: errorMessage,
      details: error.response?.body || error // Include more error details for debugging
    };
  }
}
