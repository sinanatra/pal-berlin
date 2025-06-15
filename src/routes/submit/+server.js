export async function POST({ request }) {
  try {
    const payload = await request.json();
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyWwIqYRk6kB_pV-YoEMFMvTqtcenSI2dPG2bLPps2c2iLVs56qyr0yNCtNW1O8CrpBkA/exec";

    const upstreamRes = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await upstreamRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(
        JSON.stringify({
          result: "error",
          message: "Invalid JSON from webhook",
          raw: text.slice(0, 200),
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: upstreamRes.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ result: "error", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
