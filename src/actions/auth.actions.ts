"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "@/services/auth.service";
import { loginSchema } from "@/schemas/login.schema";

export async function loginAction(formData: FormData) {
  const raw = {
    usuario: formData.get("usuario"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw)

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  };

  const resultado = await login(parsed.data);

  if (!resultado.success) {
    return { success: false, errors: { general: [resultado.error] } };
  }

  const cookieStore = await cookies();

  cookieStore.set("session", resultado.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
};

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
};