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
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "PATCH") {
    const { content, updatedDate } = req.body;

    const { id } = req.query;

    // Simple validation for required fields
    if (!id || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const data = await db
        .update(entries)
        .set({ content, updatedAt: updatedDate })
        .where(eq(entries.id, id as string));

      return res.status(201).json(data); // 201 for created resource
    } catch (error) {
      console.error("Database insert error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
