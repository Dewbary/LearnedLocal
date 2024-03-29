import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@learnedlocal/config/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== env.EDGE_FUNCTION_VERIFICATION_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/home");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(503).send("Error revalidating");
  }
}
