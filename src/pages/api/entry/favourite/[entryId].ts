import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/drizzle";
import { entries } from "@/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { entryId } = req.query;
  const { favourite } = req.body;

  if (req.method === "PATCH") {
    try {
      const data = await db
        .update(entries)
        .set({ favourite })
        .where(eq(entries.id, entryId as string));
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
