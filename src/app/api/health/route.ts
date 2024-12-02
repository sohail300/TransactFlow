export function GET() {
  console.log("Health Check!");
  return new Response("Health Check!");
}
