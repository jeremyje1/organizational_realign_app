

import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { to, subject, link, orgName } = req.body;

  try {
    await resend.emails.send({
      from: "reports@northpathstrategies.org",
      to,
      subject,
      html: `
        <p>Your report for <strong>${orgName}</strong> is ready.</p>
        <p><a href="${link}" target="_blank">Download your PDF</a></p>
        <p>Thank you,<br/>NorthPath Strategies Team</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email failed:", error);
    res.status(500).json({ error: "Email failed to send." });
  }
}