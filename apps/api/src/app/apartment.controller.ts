import type { ApartmentService } from "./apartment.service.ts";

export default function registerApartmentController(
  apartmentService: ApartmentService,
) {
  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url);

    // GET /apartments
    if (req.method === "GET" && url.pathname === "/apartments") {
      try {
        const queryParams = Object.fromEntries(url.searchParams);
        const result = await apartmentService.getApartments(queryParams);
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: String(error) }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    // 404 Not Found
    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  };
}
