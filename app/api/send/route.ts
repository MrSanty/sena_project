
import { WelcomeEmailTemplate } from '@/components/ui/EmailTemplate';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { Resend } from 'resend'

const resend = new Resend('re_19debjr5_FmUAXsMpjFGWEih8TB7AG79j');

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const body = await req.json()
    const { email, company, name } = body
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Bienvenido a ${company}`,
      react: WelcomeEmailTemplate({
        name: name,
        company: company,
      })
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
