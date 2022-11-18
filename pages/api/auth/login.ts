import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const url = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/authorize?client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENTID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}&audience=${process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}&scope=${process.env.NEXT_PUBLIC_AUTH0_SCOPE}&state=`;
  res.setHeader("Content-Type", "application/json");
  res.redirect(303, url);
}
