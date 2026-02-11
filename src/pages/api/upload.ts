import { processAndSaveImage } from "../../lib/images";
import type { AstroCookies } from "astro";

export const prerender = false;

export async function POST({ request, cookies }: { request: Request, cookies: AstroCookies }) {
  // Check auth
  if (cookies.get("kiosko_session")?.value !== "active") {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return new Response(JSON.stringify({ error: "no image provided" }), { status: 400 });
    }

    const imageUrl = await processAndSaveImage(image);
    return new Response(JSON.stringify({ url: imageUrl }), { status: 200 });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
