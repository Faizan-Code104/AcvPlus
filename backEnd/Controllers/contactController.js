import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate SMTP configuration
    const requiredEnvVars = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "SMTP_FROM",
      "CONTACT_RECEIVER_EMAIL",
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (key) => !process.env[key]
    );

    if (missingEnvVars.length > 0) {
      console.error(
        `Missing SMTP configuration: ${missingEnvVars.join(", ")}`
      );

      return res.status(500).json({
        success: false,
        message: "Contact service is currently unavailable.",
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send contact email
    await transporter.sendMail({
      from: `"ACV Plus Website" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email.trim().toLowerCase(),
      subject: `[ACV Plus Contact] ${subject.trim()}`,
      text: `
ACV Plus Website Contact Form

Name: ${name.trim()}
Email: ${email.trim().toLowerCase()}
Subject: ${subject.trim()}

Message:
${message.trim()}

---
Submitted through ACV Plus
Descriptor: Sophia Strategic Travisions LLC
      `.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("ACV Plus contact form error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now.",
    });
  }
};