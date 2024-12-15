import { createHash } from "node:crypto";
import type { StructuredQuery } from "./nominatim/request.ts";

export class KeyHasher {
  hashQuery(query: string | Partial<StructuredQuery>): string {
    const normalizedQuery = JSON.stringify(query);
    return createHash("sha1").update(normalizedQuery).digest("base64");
  }
}
