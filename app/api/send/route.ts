
import { WelcomeEmailTemplate } from '@/components/ui/EmailTemplate';
import { Resend } from 'resend'

const resend = new Resend('re_19debjr5_FmUAXsMpjFGWEih8TB7AG79j');

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['sr.santyquinteror@gmail.com'],
      subject: 'Hello world',
      react: WelcomeEmailTemplate(),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
