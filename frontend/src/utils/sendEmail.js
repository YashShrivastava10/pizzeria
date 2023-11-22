"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

export const sendEmail = async (email) => {
  try {
    const result = await resend.emails.send({
      from: 'Pizzeria <pizzeria.assist@resend.dev>',
      to: email,
      subject: 'Hello World',
      text: "Hello",
    });
    return result
  }
  catch (error) {
    console.log(error);
    return {id: null}
  }
};
