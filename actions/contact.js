'use server'

import { contactFormSchema, parseResult } from "@/lib/schemas"
import { prisma } from "@/lib/prisma"
import { createTransport } from "nodemailer"

export async function submitContactFormAction(_prevState, formData) {
  const parsed = contactFormSchema.safeParse({
    firstname: formData.get('firstname')?.trim(),
    lastname:  formData.get('lastname')?.trim(),
    email:     formData.get('email')?.trim(),
    telephone: formData.get('telephone')?.trim(),
    subject:   formData.get('subject')?.trim(),
    message:   formData.get('message')?.trim(),
  })

  const err = parseResult(parsed)
  if (err) return err

  const { firstname, lastname, email, telephone, subject, message } = parsed.data

  const transporter = createTransport({
  host: "ssl0.ovh.net",
  port : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

  try {
    await prisma.contactForm.create({
      data: { firstname, lastname, email, telephone, subject, message },
    })
  } catch {
    return { error: 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.' }
  }

  try {
    await transporter.sendMail({
      from: `"B-MO (Noreply)" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `[B-MO] Nouveau message : ${subject}`,
      html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouveau message — B-MO</title>
  
  <!-- Pour le stacking propre sur mobile -->
  <style type="text/css">
    @media only screen and (max-width: 599px) {
      .mobile-stack {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 20px !important;
      }
      .mobile-stack:last-child {
        padding-bottom: 0 !important;
      }
    }
  </style>
</head>

<body style="margin:0;padding:0;background-color:#F0F2F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;font-size:1px;color:#F0F2F5;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    Nouveau message de ${firstname} ${lastname} — ${subject}
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0F2F5;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="border-radius:16px 16px 0 0;overflow:hidden;background:linear-gradient(135deg,#D91F2B 0%,#E8500A 100%);padding:44px 48px 36px;text-align:center;">
            <a href="https://www.bmo.bj" target="_blank" style="text-decoration:none;">
              <img src="https://www.bmo.bj/bmo-logo.png" alt="BestCash Money" width="168" style="display:block;margin:0 auto 24px;max-width:168px;" />
            </a>
            <h1 style="margin:0 0 8px;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.6px;">Nouveau message</h1>
            <p style="margin:0;color:rgba(255,255,255,0.88);font-size:15px;">Formulaire de contact · bmo.bj</p>
          </td>
        </tr>

        <!-- BANDE "REÇU LE …" -->
        <tr>
          <td style="background:#F3F4F6;padding:14px 48px;text-align:center;border-bottom:1px solid #E5E7EB;">
            <p style="margin:0;color:#6B7280;font-size:13px;font-weight:500;">
              Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </td>
        </tr>

        <!-- CONTENU PRINCIPAL -->
        <tr>
          <td style="background:#ffffff;padding:48px 48px 52px;">

            <p style="margin:0 0 32px;color:#4B5563;font-size:15px;line-height:1.65;">
              Bonjour,<br/><br/>
              Un nouveau message vient d’être envoyé via le formulaire de contact du site. Voici les informations reçues :
            </p>

            <!-- Prénom + Nom -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
              <tr>
                <td width="48%" class="mobile-stack" style="padding-right:12px;vertical-align:top;">
                  <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:18px 22px;">
                    <p style="margin:0 0 6px;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Prénom</p>
                    <p style="margin:0;font-size:17px;color:#111827;font-weight:700;">${firstname}</p>
                  </div>
                </td>
                <td width="48%" class="mobile-stack" style="padding-left:12px;vertical-align:top;">
                  <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:18px 22px;">
                    <p style="margin:0 0 6px;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Nom</p>
                    <p style="margin:0;font-size:17px;color:#111827;font-weight:700;">${lastname}</p>
                  </div>
                </td>
              </tr>
            </table>

            <!-- Email + Téléphone -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
              <tr>
                <td width="48%" class="mobile-stack" style="padding-right:12px;vertical-align:top;">
                  <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:18px 22px;">
                    <p style="margin:0 0 6px;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Email</p>
                    <p style="margin:0;font-size:15px;color:#D91F2B;font-weight:600;word-break:break-all;">${email}</p>
                  </div>
                </td>
                <td width="48%" class="mobile-stack" style="padding-left:12px;vertical-align:top;">
                  <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:18px 22px;">
                    <p style="margin:0 0 6px;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Téléphone</p>
                    <p style="margin:0;font-size:15px;color:#111827;font-weight:600;">${telephone}</p>
                  </div>
                </td>
              </tr>
            </table>

            <!-- Sujet -->
            <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:12px;padding:18px 22px;margin-bottom:24px;">
              <p style="margin:0 0 6px;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Sujet</p>
              <p style="margin:0;font-size:17px;color:#111827;font-weight:700;">${subject}</p>
            </div>

            <!-- Message -->
            <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-left:5px solid #D91F2B;border-radius:0 12px 12px 0;padding:24px 26px;margin-bottom:44px;">
              <p style="margin:0 0 10px;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Message</p>
              <p style="margin:0;font-size:15.5px;color:#374151;line-height:1.78;white-space:pre-wrap;word-break:break-word;">${message}</p>
            </div>

            <!-- Bouton Répondre -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject)}" 
                     style="display:inline-block;background:linear-gradient(135deg,#D91F2B,#E8500A);color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:18px 52px;border-radius:999px;letter-spacing:0.3px;box-shadow:0 4px 14px rgba(217,31,43,0.22);">
                    ✉&nbsp; Répondre à ${firstname}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#111827;border-radius:0 0 16px 16px;padding:32px 48px;text-align:center;">
            <p style="margin:0 0 8px;color:#ffffff;font-size:14px;font-weight:600;">BESTCASH MONEY · B-MO</p>
            <p style="margin:0;color:rgba(255,255,255,0.50);font-size:12px;line-height:1.5;">
              © ${new Date().getFullYear()} — Message automatique généré par le site bmo.bj<br/>
              Merci de ne pas répondre directement à cet email.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })
  } catch (error) {
    console.error('Erreur envoi email:', error)
  }

  return { success: true }
}

