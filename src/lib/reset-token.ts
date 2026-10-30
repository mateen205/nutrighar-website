import { createHash } from "crypto";
import { SignJWT, jwtVerify } from "jose";

// Signed, short-lived "set your password" link token. Nothing is stored in the
// database: the token is only valid while the user's password is unchanged, so
// it stops working as soon as it has been used once.

function getSecret() {
  const secret = process.env.AUTH_SECRET || "nutrigar-dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export function passwordFingerprint(passwordHash: string) {
  return createHash("sha256").update(passwordHash).digest("hex").slice(0, 24);
}

export async function createResetToken(user: { id: string; passwordHash: string }) {
  return new SignJWT({ purpose: "reset", fp: passwordFingerprint(user.passwordHash) })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(getSecret());
}

export async function readResetToken(token: string): Promise<{ userId: string; fp: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.purpose !== "reset" || !payload.sub || typeof payload.fp !== "string") return null;
    return { userId: payload.sub, fp: payload.fp };
  } catch {
    return null;
  }
}
