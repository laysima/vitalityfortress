"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import * as z from "zod";
import { getDb } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";

const SignupSchema = z.object({
  name: z.string().trim().min(2, { error: "Enter at least 2 characters." }).max(60, { error: "Keep it under 60 characters." }),
  email: z.email({ error: "Enter a valid email address." }).trim().toLowerCase(),
  password: z
    .string()
    .min(8, { error: "Use at least 8 characters." })
    .max(128, { error: "Use 128 characters or fewer." })
    .regex(/[a-zA-Z]/, { error: "Include at least one letter." })
    .regex(/[0-9]/, { error: "Include at least one number." }),
});

const LoginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Enter your password." }),
});

function fieldErrors(result) {
  return z.flattenError(result.error).fieldErrors;
}

function safeNext(value) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

export async function signup(prevState, formData) {
  const values = { name: formData.get("name"), email: formData.get("email") };
  const parsed = SignupSchema.safeParse({ ...values, password: formData.get("password") });
  if (!parsed.success) return { errors: fieldErrors(parsed), values };

  const { name, email, password } = parsed.data;
  const db = await getDb();
  const passwordHash = await bcrypt.hash(password, 12);

  let userId;
  try {
    const result = await db.collection("users").insertOne({
      name,
      email,
      passwordHash,
      weeklyGoal: 3,
      activeProgram: null,
      createdAt: new Date(),
    });
    userId = result.insertedId.toString();
  } catch (error) {
    if (error?.code === 11000) {
      return { errors: { email: ["An account with this email already exists. Sign in instead."] }, values };
    }
    throw error;
  }

  await createSession(userId);
  redirect("/dashboard?welcome=1");
}

export async function login(prevState, formData) {
  const values = { email: formData.get("email") };
  const parsed = LoginSchema.safeParse({ ...values, password: formData.get("password") });
  if (!parsed.success) return { errors: fieldErrors(parsed), values };

  const db = await getDb();
  const user = await db.collection("users").findOne({ email: parsed.data.email });
  const ok = user ? await bcrypt.compare(parsed.data.password, user.passwordHash) : false;
  if (!ok) return { message: "That email and password don't match an account.", values };

  await createSession(user._id.toString());
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
