import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null;

function getResendClient(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export const resend = {
  emails: {
    send: async (options: Parameters<Resend["emails"]["send"]>[0]) => {
      return getResendClient().emails.send(options);
    },
  },
};

export const FROM_EMAIL = process.env.EMAIL_FROM || "David <onboarding@resend.dev>";

// Email Templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome to Elite Fitness Training! 🎯",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Elite Fitness</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Elite Fitness Training</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
              <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 20px 0;">Welcome, ${name}! 🎉</h2>
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for joining the Elite Fitness community! You've taken the first step towards transforming your body and mind.
              </p>
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Here's what you can do next:
              </p>
              
              <ul style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.8; margin: 0 0 30px 20px; padding: 0;">
                <li>Complete your profile</li>
                <li>Explore our training programs</li>
                <li>Book a 1-on-1 coaching session</li>
                <li>Join our community</li>
              </ul>
              
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                Go to Dashboard
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} Elite Fitness Training. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),

  orderConfirmation: (
    name: string,
    orderNumber: string,
    items: Array<{ name: string; price: number }>,
    total: number
  ) => ({
    subject: `Order Confirmed - #${orderNumber} 🎯`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Elite Fitness Training</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 48px;">✅</span>
                <h2 style="color: #ffffff; font-size: 24px; margin: 20px 0 10px 0;">Order Confirmed!</h2>
                <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0;">Order #${orderNumber}</p>
              </div>
              
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Hi ${name}, thank you for your purchase! Here's your order summary:
              </p>
              
              <!-- Order Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                ${items
                  .map(
                    (item) => `
                <tr>
                  <td style="color: #ffffff; font-size: 16px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    ${item.name}
                  </td>
                  <td align="right" style="color: #ffffff; font-size: 16px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    $${item.price.toFixed(2)}
                  </td>
                </tr>
                `
                  )
                  .join("")}
                <tr>
                  <td style="color: #ffffff; font-size: 18px; font-weight: 600; padding-top: 20px;">
                    Total
                  </td>
                  <td align="right" style="color: #ffffff; font-size: 18px; font-weight: 600; padding-top: 20px;">
                    $${total.toFixed(2)}
                  </td>
                </tr>
              </table>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/programs" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                  Access Your Programs
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} Elite Fitness Training. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),

  bookingConfirmation: (
    name: string,
    date: string,
    time: string,
    sessionType: string
  ) => ({
    subject: `Booking Confirmed - ${sessionType} Session 📅`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Elite Fitness Training</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 48px;">📅</span>
                <h2 style="color: #ffffff; font-size: 24px; margin: 20px 0 10px 0;">Session Booked!</h2>
              </div>
              
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Hi ${name}, your coaching session has been confirmed. Here are the details:
              </p>
              
              <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 14px; padding: 8px 0;">Session Type</td>
                    <td align="right" style="color: #ffffff; font-size: 16px; font-weight: 600; padding: 8px 0;">${sessionType}</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 14px; padding: 8px 0;">Date</td>
                    <td align="right" style="color: #ffffff; font-size: 16px; font-weight: 600; padding: 8px 0;">${date}</td>
                  </tr>
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 14px; padding: 8px 0;">Time</td>
                    <td align="right" style="color: #ffffff; font-size: 16px; font-weight: 600; padding: 8px 0;">${time}</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                You'll receive a meeting link 24 hours before your session. Make sure to prepare:
              </p>
              
              <ul style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.8; margin: 0 0 30px 20px; padding: 0;">
                <li>Comfortable workout clothes</li>
                <li>Water bottle</li>
                <li>Any equipment mentioned for the session</li>
                <li>Quiet space with good internet connection</li>
              </ul>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/bookings" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                  View Booking Details
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} Elite Fitness Training. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),

  contactResponse: (name: string) => ({
    subject: "We received your message! 📬",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Elite Fitness Training</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
              <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 20px 0;">Thanks for reaching out, ${name}!</h2>
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                I've received your message and will get back to you within 24-48 hours.
              </p>
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                In the meantime, feel free to explore our programs or follow me on social media for daily fitness tips!
              </p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/programs" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                  Explore Programs
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} Elite Fitness Training. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),

  passwordReset: (name: string, resetUrl: string) => ({
    subject: "Reset Your Password 🔐",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Elite Fitness Training</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 48px;">🔐</span>
                <h2 style="color: #ffffff; font-size: 24px; margin: 20px 0 10px 0;">Reset Your Password</h2>
              </div>
              
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi ${name}, we received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                This link will expire in <strong style="color: #ffffff;">1 hour</strong> for security reasons.
              </p>
              
              <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 0;">
                If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.
              </p>
              
              <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;" />
              
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; line-height: 1.6; margin: 0;">
                If the button doesn't work, copy and paste this link into your browser:<br />
                <span style="color: rgba(255,255,255,0.6); word-break: break-all;">${resetUrl}</span>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} Elite Fitness Training. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),

  newsletter: (email: string) => ({
    subject: "Welcome to the Elite Fitness Newsletter! 💪",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Elite Fitness Training</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 48px;">🎉</span>
                <h2 style="color: #ffffff; font-size: 24px; margin: 20px 0 10px 0;">You're In!</h2>
              </div>
              
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Welcome to the Elite Fitness community! You'll now receive:
              </p>
              
              <ul style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.8; margin: 0 0 30px 20px; padding: 0;">
                <li>Exclusive workout tips and techniques</li>
                <li>Nutrition advice and meal ideas</li>
                <li>Early access to new programs</li>
                <li>Special discounts and offers</li>
                <li>Motivation and inspiration</li>
              </ul>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/programs" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                  Start Your Journey
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0 0 10px 0;">
                You're receiving this email because you subscribed at ${email}
              </p>
              <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} Elite Fitness Training. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),
};

// Email sending functions
export async function sendWelcomeEmail(email: string, name: string) {
  const template = emailTemplates.welcome(name);
  
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
}

export async function sendOrderConfirmationEmail(
  email: string,
  name: string,
  orderNumber: string,
  items: Array<{ name: string; price: number }>,
  total: number
) {
  const template = emailTemplates.orderConfirmation(name, orderNumber, items, total);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("Error sending order confirmation email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendBookingConfirmationEmail(
  email: string,
  name: string,
  date: string,
  time: string,
  sessionType: string
) {
  const template = emailTemplates.bookingConfirmation(name, date, time, sessionType);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("Error sending booking confirmation email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendContactResponseEmail(email: string, name: string) {
  const template = emailTemplates.contactResponse(name);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("Error sending contact response email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending contact response email:", error);
    return { success: false, error };
  }
}

export async function sendNewsletterWelcomeEmail(email: string) {
  const template = emailTemplates.newsletter(email);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("Error sending newsletter email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetToken: string
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  const template = emailTemplates.passwordReset(name, resetUrl);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("Error sending password reset email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error };
  }
}
