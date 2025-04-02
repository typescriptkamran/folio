import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text, html, smtpSettings } = await req.json();

    if (!to || !subject || (!text && !html) || !smtpSettings) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // In a real implementation, you would use a library like nodemailer
    // Since we're in a serverless environment, we'll simulate the email sending
    // and just log the details
    console.log("Sending email with the following details:");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);
    console.log("HTML:", html ? "[HTML Content]" : "None");
    console.log("SMTP Settings:", {
      host: smtpSettings.host,
      port: smtpSettings.port,
      secure: smtpSettings.secure,
      auth: {
        user: smtpSettings.username,
        // Password is masked for security
        pass: "********",
      },
      from: `${smtpSettings.from_name || ""} <${smtpSettings.from_email}>`,
    });

    // In a real implementation, you would use nodemailer like this:
    /*
    const transporter = nodemailer.createTransport({
      host: smtpSettings.host,
      port: smtpSettings.port,
      secure: smtpSettings.secure,
      auth: {
        user: smtpSettings.username,
        pass: smtpSettings.password,
      },
    });

    await transporter.sendMail({
      from: `${smtpSettings.from_name || ""} <${smtpSettings.from_email}>`,
      to,
      subject,
      text,
      html: html || undefined,
    });
    */

    // For now, we'll just simulate a successful email send
    // In a real implementation, you would handle errors from the email service

    // Save the sent email in the database
    const supabase = await createClient();
    const { error } = await supabase.from("emails").insert({
      sender: smtpSettings.from_email,
      recipient: to,
      subject: subject,
      body: text,
      read: true,
      replied: true,
    });

    if (error) {
      console.error("Error saving sent email:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
