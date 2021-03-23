import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => unknown;

const AuthMiddleware = (handler: HandlerFunction) => async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const token = await jwt.getToken({ req, secret });
  if (token) {
    // Signed in
    await handler(req, res);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};

export default AuthMiddleware;
