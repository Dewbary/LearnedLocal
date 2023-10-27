import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@learnedlocal/config/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.warn(`Revalidating Homepage, ${req}`);

  if (req.query.secret !== env.EDGE_FUNCTION_VERIFICATION_TOKEN) {
    return res.status(408).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
