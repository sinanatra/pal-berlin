import { CSV_URL } from '$env/static/private';

export async function GET() {
  try {
    if (!CSV_URL) {
      return new Response('CSV URL not set', { status: 500 });
    }
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      return new Response('Failed to fetch CSV', { status: 500 });
    }
    const csvData = await response.text();
    return new Response(csvData, {
      headers: {
        "Content-Type": "text/csv"
      }
    });
  } catch (err) {
    return new Response('Server error: ' + err.message, { status: 500 });
  }
}
