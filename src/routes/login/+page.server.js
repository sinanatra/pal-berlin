import { redirect, fail } from "@sveltejs/kit";
import { ADMIN_PASS } from "$env/static/private";

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get("password");
    console.log("ENV:", ADMIN_PASS, "Form:", password);
    if (password === ADMIN_PASS) {
      cookies.set("session", "yes", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      throw redirect(303, "/");
    }
    return fail(401, { incorrect: true });
  },
};
