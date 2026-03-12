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
  host: "smtp.gmail.com",
  port : 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

  await prisma.contactForm.create({
    data: { firstname, lastname, email, telephone, subject, message },
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `[B-MO] Nouveau message : ${subject}`,
      text: `Nouveau message de contact reçu.\n\nNom : ${firstname} ${lastname}\nEmail : ${email}\nTéléphone : ${telephone}\nSujet : ${subject}\n\nMessage :\n${message}`,
    })
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de notification:', error)
  }

  return { success: true }
}

