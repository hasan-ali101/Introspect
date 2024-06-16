//import functionality from @neondatabase/serverless and drizzle-orm,
// establish a connection to the Neon database, and initialize Drizzle.

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.NEXT_PUBLIC_NEON_DATABASE_URL!);

const db = drizzle(sql);

export default db;
