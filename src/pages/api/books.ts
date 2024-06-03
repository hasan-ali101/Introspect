import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/drizzle";
import { books } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await db.select().from(books);
  res.status(200).json(data);
}
