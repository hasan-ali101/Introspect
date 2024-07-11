import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/drizzle";
import { entries } from "@/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Entry } from "@/types/entry";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { bookId } = req.query;

  if (req.method === "GET") {
    try {
      const data =
        (await db
          .select()
          .from(entries)
          .where(eq(entries.bookId, bookId as string))) || [];
      return res.status(200).json(data);
    } catch (error) {
      console.error("Database fetch error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PATCH") {
    const { newOrder } = req.body;
    try {
      for (const entry of newOrder) {
        console.log("entry:", entry);
        await db
          .update(entries)
          .set({ index: entry.index })
          .where(eq(entries.id, entry.id));
      }
      return res.status(200).json({ message: "Entries updated successfully" });
    } catch (error) {
      console.error("Database update error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
