export const GET = async () => {
  return new Response(JSON.stringify({ name: "John Doe" }), {
    status: 200,
  });
}
