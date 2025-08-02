/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const session = event.cookies.get("session");

  if (
    event.url.pathname.startsWith("/login") ||
    event.url.pathname.startsWith("/favicon") ||
    event.url.pathname.startsWith("/assets") ||
    event.url.pathname.startsWith("/__svelte__")
  ) {
    return resolve(event);
  }

  if (!session) {
    return new Response(null, {
      status: 303,
      headers: { location: "/login" },
    });
  }

  return resolve(event);
}
