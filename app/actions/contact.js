"use server";

import * as z from "zod";
import { getDb } from "@/lib/db";

const ContactSchema = z.object({
  name: z.string().trim().min(2, { error: "Tell us your name." }).max(80),
  email: z.email({ error: "Enter a valid email address." }).trim().toLowerCase(),
  topic: z.enum(["Free session", "Membership", "Personal coaching", "Something else"], { error: "Pick a topic." }),
  message: z.string().trim().min(10, { error: "A little more detail helps (10+ characters)." }).max(2000),
});

export async function sendMessage(prevState, formData) {
  const values = Object.fromEntries(["name", "email", "topic", "message"].map((k) => [k, formData.get(k) ?? ""]));
  const parsed = ContactSchema.safeParse(values);
  if (!parsed.success) return { errors: z.flattenError(parsed.error).fieldErrors, values };

  const db = await getDb();
  await db.collection("messages").insertOne({ ...parsed.data, createdAt: new Date() });
  return { ok: true, values: { name: "", email: "", topic: "", message: "" } };
}
