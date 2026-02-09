import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    // 1. Si estamos en LOCALHOST (desarrollo), acceso total a todo
    if (import.meta.env.DEV) {
        return next();
    }

    const { pathname, searchParams } = context.url;

    // 2. Rutas que SIEMPRE deben ser accesibles en producción
    if (
        pathname === "/maintenance" ||
        pathname.startsWith("/_astro") || // Assets generados por Astro
        pathname.startsWith("/team/david/cv.pdf") ||
        pathname === "/favicon.svg"
    ) {
        return next();
    }

    // 3. Sistema de Acceso por "Llave Maestra" (Cookie o URL)
    // Para ver la web real en Vercel, entra una vez a: tusitio.com/?preview=humanoides
    const hasCookie = context.cookies.get("preview_access")?.value === "true";
    const hasParam = searchParams.get("preview") === "humanoides";

    if (hasCookie || hasParam) {
        if (hasParam) {
            context.cookies.set("preview_access", "true", {
                path: "/",
                maxAge: 60 * 60 * 24 * 7 // Acceso por 7 días
            });
        }
        return next();
    }

    // 4. Por defecto, mostrar página de mantenimiento (sin cambiar la URL)
    return context.rewrite("/maintenance");
});
