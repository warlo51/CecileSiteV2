import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryCode = req.query.code;

  const auth0 = await fetch(`${process.env.AUTH0_TOKEN}`, {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: `grant_type=authorization_code&client_id=${process.env.AUTH0_CLIENTID}&client_secret=${process.env.AUTH0_CLIENTSECRET}&code=${queryCode}&redirect_uri=${process.env.AUTH0_LOCAL}`,
  })
    .then((data) => data.json())
    .then((token) => token);
  const tokenAccess = auth0.access_token;
  const auth0searchUser = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    {
      method: "Post",
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
      },
    }
  ).then((data) => data.json());

  console.log("token",auth0searchUser)
  const mailUserAuth0 = auth0searchUser.email;
  console.log("mailUserAuth0",mailUserAuth0)
  if (mailUserAuth0) {
    const cookies = res.setHeader("Set-Cookie", [
      cookie.serialize("AccessToken", tokenAccess, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "lax",
        path: "/",
      }),
    ]);
    if (mailUserAuth0 === "cecile.fabie@gmail.com") {
      res.redirect(303, "/Admin");
    } else {
      res.redirect(`/?email=${JSON.stringify(tokenAccess)}`);
    }
  } else {
    res.redirect(`/?error=${JSON.stringify(tokenAccess)}`);
  }
}
