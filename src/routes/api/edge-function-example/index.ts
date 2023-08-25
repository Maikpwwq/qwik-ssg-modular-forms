export const config = {
  runtime: "edge",
};

//Navigate to http://localhost:5173/api/edge-function-example?query=123 to see the response from your route.
//Navigate to https://qwik-app-psi-sable.vercel.app/api/edge-function-example?query=123 to see the response from your route.

export default async function handler(request: Request) {
  const urlParams = new URL(request.url).searchParams;
  const query = Object.fromEntries(urlParams);
  const cookies = request.headers.get("cookie");
  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = null;
  }

  return new Response(
    JSON.stringify({
      body,
      query,
      cookies,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
