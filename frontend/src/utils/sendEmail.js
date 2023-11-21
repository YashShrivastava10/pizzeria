"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

export const sendEmail = async () => {
  try {
    await resend.emails.send({
      from: 'Pizzeria <pizzeria.assist@resend.dev>',
      to: 'shrivastavayash10@gmail.com',
      subject: 'Hello World',
      text: "Hello",
    });
  }
  catch (error) {
    console.log(error);
  }
};
