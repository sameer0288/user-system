import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** Auth middleware */
export default async function Auth(req, res, next) {
  try {
    // Check if authorization header exists
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      throw new Error("Authorization header missing or invalid");
    }

    // Extract token from authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify token
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

    // Attach decoded token to request object
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ error: "Authentication failed" });
  }
}

/** Middleware to set local variables */
export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
