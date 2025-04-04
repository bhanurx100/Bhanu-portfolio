import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToString } from "react-dom/server";
import EmailTemplate from "../../../components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    // Render the React email template to HTML
    const html = renderToString(
      <EmailTemplate subject={subject} message={message} email={email} />
    );

    const data = await resend.emails.send({
      from: fromEmail,
      to: ["bhanuprasad.0921@gmail.com"],
      subject: subject,
      text: `Subject: ${subject}\n\nThank you for contacting us!\n\nNew message submitted:\n${message}\n\nFrom: ${email}`,
      html: html,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}