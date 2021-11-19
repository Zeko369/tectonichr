import { NextFunction, Response } from "express";
import { TokenExpiredError, JsonWebTokenError, verify } from "jsonwebtoken";
import { Request } from "../../types";
import { User } from "../../models/User";

export const userMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next();
  }

  const raw = authorization.split(" ");
  if (raw.length != 2 || raw[0] != "Bearer") {
    return next(new JsonWebTokenError("Invalid auth header"));
  }

  const data = verify(raw[1]!, process.env["JWT_SECRET"]!) as { id: string };
  if (!data.id) {
    return next(new JsonWebTokenError("Missing contents"));
  }

  const user = await User.findOne(data.id);
  if (!user) {
    return next("User not found");
  }

  req.user = user;
  next();
};

export function handleAuthenticationError(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: "Token expired",
    });
  } else if (err instanceof JsonWebTokenError) {
    return res.status(401).send({
      message: "Token invalid",
    });
  }
}
