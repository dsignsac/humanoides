import { initDb } from "../../lib/db";
import { checkPassword } from "../../lib/auth";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();
  const password = formData.get("password") as string;

  if (await checkPassword(password)) {
    try {
      await initDb();
      return new Response(JSON.stringify({ message: "db initialized successfully" }), { status: 200 });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
}
